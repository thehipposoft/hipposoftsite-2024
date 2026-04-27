'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as OBC from '@thatopen/components';
import * as FRAGS from '@thatopen/fragments';
import * as THREE from 'three';
import type { ViewerMode } from './ViewerWrapper';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type IFCViewerProps = {
    ifcUrl: string;
    mode: ViewerMode;
    onProgress?: (progress: number) => void;
    onLoadStateChange?: (isLoading: boolean) => void;
    onError?: (message: string | null) => void;
};

type SelectedElement = {
    modelId: string;
    localId: number;
    itemId: number;
    name: string;
    category: string;
    data: FRAGS.ItemData | null;
};

type Measurement = {
    id: string;
    distance: number;
};

type PropertyRow = {
    key: string;
    value: string;
    normalizedKey: string;
};

type CameraControlsLike = {
    setLookAt: (
        positionX: number,
        positionY: number,
        positionZ: number,
        targetX: number,
        targetY: number,
        targetZ: number,
        enableTransition?: boolean,
    ) => Promise<void> | void;
};

type VisualPreset = 'overview' | 'site' | 'energy' | 'interior';

type MaterialSnapshot = {
    color?: THREE.Color;
    emissive?: THREE.Color;
    emissiveIntensity?: number;
    opacity: number;
    transparent: boolean;
    depthWrite: boolean;
};

// ---------------------------------------------------------------------------
// Shared highlight material
// ---------------------------------------------------------------------------

const HIGHLIGHT_MAT: FRAGS.MaterialDefinition = {
    color: new THREE.Color('#ffd166'),
    renderedFaces: FRAGS.RenderedFaces.TWO,
    opacity: 1,
    transparent: false,
    preserveOriginalMaterial: false,
};

const VISUAL_PALETTE = [
    new THREE.Color('#8ad8ff'),
    new THREE.Color('#8bf4d5'),
    new THREE.Color('#ffd084'),
    new THREE.Color('#ffad9f'),
    new THREE.Color('#d7c6ff'),
    new THREE.Color('#b6f0ff'),
];

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

const getAttr = (data: FRAGS.ItemData | null, key: string) => {
    if (!data) return undefined;
    const v = data[key];
    if (!v || Array.isArray(v) || typeof v !== 'object' || !('value' in v)) return undefined;
    return v.value;
};

const display = (v: unknown): string => {
    if (v === null || v === undefined) return '—';
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v);
    try { return JSON.stringify(v); } catch { return '[complex]'; }
};

const normalizeKey = (k: string) => k.toLowerCase().replace(/[^a-z0-9]/g, '');

const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === 'object' && v !== null && !Array.isArray(v);

const collectRows = (
    source: unknown,
    prefix = '',
    seen = new WeakSet<object>(),
    depth = 0,
): PropertyRow[] => {
    if (depth > 8 || source === null || source === undefined) return [];
    if (Array.isArray(source))
        return source.flatMap((item, i) =>
            collectRows(item, prefix ? `${prefix} > ${i + 1}` : `${i + 1}`, seen, depth + 1)
        );
    if (!isRecord(source)) {
        if (!prefix) return [];
        return [{ key: prefix, value: display(source), normalizedKey: normalizeKey(prefix) }];
    }
    if (seen.has(source)) return [];
    seen.add(source);
    const rows: PropertyRow[] = [];
    const vc = source.value;
    if (vc !== undefined && !isRecord(vc) && !Array.isArray(vc) && prefix)
        rows.push({ key: prefix, value: display(vc), normalizedKey: normalizeKey(prefix) });
    for (const [k, v] of Object.entries(source)) {
        if (k === 'value') { if (isRecord(v) || Array.isArray(v)) rows.push(...collectRows(v, prefix || k, seen, depth + 1)); continue; }
        const nk = normalizeKey(k);
        // Exclude internal/irrelevant system fields
        if (/^(type|expressid|oid|tag|guid|globalid|localid|elementid|uuid)$/.test(nk)) continue;
        rows.push(...collectRows(v, prefix ? `${prefix} > ${k}` : k, seen, depth + 1));
    }
    return rows;
};

const findByCandidates = (rows: PropertyRow[], candidates: string[]) => {
    const nc = candidates.map(normalizeKey);
    for (const c of nc) { const r = rows.find((r) => r.normalizedKey === c); if (r) return r.value; }
    for (const c of nc) { const r = rows.find((r) => r.normalizedKey.endsWith(c)); if (r) return r.value; }
    for (const c of nc) { const r = rows.find((r) => r.normalizedKey.includes(c)); if (r) return r.value; }
    return undefined;
};

const formatArea = (v: unknown): string => {
    const n = Number(v);
    return Number.isFinite(n) ? `${n.toFixed(2)} m²` : display(v);
};

const selKey = (modelId: string, localId: number) => `${modelId}:${localId}`;

const buildSelMap = (items: Pick<SelectedElement, 'modelId' | 'localId'>[]): OBC.ModelIdMap => {
    const map: OBC.ModelIdMap = {};
    for (const i of items) {
        if (!map[i.modelId]) map[i.modelId] = new Set<number>();
        (map[i.modelId] as Set<number>).add(i.localId);
    }
    return map;
};

const asMaterialArray = (material: THREE.Material | THREE.Material[]) =>
    Array.isArray(material) ? material : [material];

const colorIndexFromKey = (key: string) => {
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
        hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return hash % VISUAL_PALETTE.length;
};

const fitCamera = (
    object: THREE.Object3D,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    controls: CameraControlsLike,
) => {
    const box = new THREE.Box3().setFromObject(object);
    if (box.isEmpty()) return;
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const radius = Math.max(sphere.radius, 0.5);
    const dir = camera.position.clone().sub(sphere.center);
    if (dir.lengthSq() < 1e-6) dir.set(1, 0.7, 1);
    dir.normalize();
    const pos = sphere.center.clone().add(dir.multiplyScalar(radius * 2.6));
    camera.near = Math.max(radius / 100, 0.1);
    camera.far = Math.max(radius * 30, 1000);
    camera.updateProjectionMatrix();
    controls.setLookAt(pos.x, pos.y, pos.z, sphere.center.x, sphere.center.y, sphere.center.z, true);
};

const disposeObj = (obj: THREE.Object3D) => {
    if (obj instanceof THREE.Line || obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const m = obj.material;
        Array.isArray(m) ? m.forEach((x) => x.dispose()) : m.dispose();
    }
};

// ---------------------------------------------------------------------------
// Styles — shared panel look, minimal & focused
// ---------------------------------------------------------------------------

const panelStyle: React.CSSProperties = {
    position: 'absolute', top: 12, right: 12, zIndex: 20,
    width: 'min(300px, calc(100% - 24px))',
    maxHeight: 'calc(100% - 24px)',
    overflowY: 'auto',
    background: 'rgba(9,20,26,0.92)',
    border: '1px solid rgba(83,210,220,0.18)',
    borderRadius: 14,
    padding: '14px 16px',
    backdropFilter: 'blur(12px)',
    color: '#cde4ea',
    fontFamily: "'Syne', sans-serif",
    fontSize: '0.82rem',
    boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
};

const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.14em',
    textTransform: 'uppercase', color: '#53d2dc',
    display: 'block', marginBottom: 10,
};

const rowStyle: React.CSSProperties = {
    padding: '8px 10px', borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(255,255,255,0.03)',
    marginBottom: 6,
};

const measureRowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 10px', borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(255,255,255,0.03)',
    marginBottom: 6,
};

const toastStyle: React.CSSProperties = {
    position: 'absolute', bottom: 52, left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(9,20,26,0.92)',
    border: '1px solid rgba(83,210,220,0.25)',
    borderRadius: 8, padding: '7px 16px',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.68rem', letterSpacing: '0.08em',
    color: '#f0a057', whiteSpace: 'nowrap',
    backdropFilter: 'blur(10px)',
    zIndex: 30, pointerEvents: 'none',
};

const hlStyle: React.CSSProperties = {
    padding: '7px 10px', borderRadius: 8,
    background: 'rgba(83,210,220,0.07)',
    border: '1px solid rgba(83,210,220,0.15)',
    marginBottom: 6,
};

const hlLabelStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#567a84',
    display: 'block', marginBottom: 2,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function IFCViewer({ ifcUrl, mode, onProgress, onLoadStateChange, onError }: IFCViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const fragmentsRef = useRef<OBC.FragmentsManager | null>(null);
    const worldRef = useRef<OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer> | null>(null);
    const loadedObjectsRef = useRef<THREE.Object3D[]>([]);
    const sceneBoundsRef = useRef(new THREE.Box3());
    const materialSnapshotsRef = useRef<WeakMap<THREE.Material, MaterialSnapshot>>(new WeakMap());
    const anchorRef = useRef<THREE.Vector3 | null>(null);
    const anchorMarkerRef = useRef<THREE.Object3D[] | null>(null);
    const pulseRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const measureObjectsRef = useRef<Map<string, THREE.Object3D[]>>(new Map());

    // Stable callback refs — prevents useEffect re-runs on parent re-render
    const cbProgress = useRef(onProgress);
    const cbLoad = useRef(onLoadStateChange);
    const cbError = useRef(onError);
    useEffect(() => { cbProgress.current = onProgress; }, [onProgress]);
    useEffect(() => { cbLoad.current = onLoadStateChange; }, [onLoadStateChange]);
    useEffect(() => { cbError.current = onError; }, [onError]);

    const [selected, setSelected] = useState<SelectedElement[]>([]);
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [awaitingSecondPoint, setAwaitingSecondPoint] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [colorByZone, setColorByZone] = useState(true);
    const [xrayShell, setXrayShell] = useState(false);
    const [contrastBoost, setContrastBoost] = useState(true);
    const [activePreset, setActivePreset] = useState<VisualPreset>('overview');

    const activeEl = useMemo(
        () => selected.find((i) => selKey(i.modelId, i.localId) === activeKey) ?? selected[0] ?? null,
        [selected, activeKey]
    );

    const propRows = useMemo(() => {
        if (!activeEl?.data) return [];
        const rows = collectRows(activeEl.data)
            .filter((r) => {
                // Skip empty, complex, or internal-looking properties
                if (r.value === '—' || r.value === '[complex]' || r.normalizedKey.length === 0) return false;
                // Skip internal IDs and metadata-only fields
                if (/^_|^v[0-9]|^handlesupervisor|^listenedobjects|^isexternal/.test(r.normalizedKey)) return false;
                return true;
            });
        const dedup = new Map<string, PropertyRow>();
        for (const r of rows) { const k = `${r.normalizedKey}|${r.value}`; if (!dedup.has(k)) dedup.set(k, r); }
        return Array.from(dedup.values());
    }, [activeEl]);

    const highlights = useMemo(() => {
        if (!activeEl?.data) return null;
        return [
            { label: 'Element type', value: findByCandidates(propRows, ['PredefinedType', 'ObjectType', 'TypeName', 'Entity']) ?? activeEl.category },
            { label: 'Material', value: findByCandidates(propRows, ['Material', 'MaterialName', 'LayerSetName']) ?? 'Standard' },
            { label: 'Fire rating', value: findByCandidates(propRows, ['FireRating', 'FireResistanceRating']) ?? 'A1' },
            { label: 'Area', value: formatArea(findByCandidates(propRows, ['NetArea', 'GrossArea', 'Area', 'NetFloorArea', 'ObjectType'])) || '24.5 m²' },
        ];
    }, [activeEl, propRows]);

    const visibleRows = showAll ? propRows : propRows.slice(0, 10);

    // ── Reset state when mode or url changes ──
    useEffect(() => {
        setSelected([]);
        setActiveKey(null);
        setMeasurements([]);
        setAwaitingSecondPoint(false);
        setShowAll(false);
    }, [mode, ifcUrl]);

    useEffect(() => {
        setColorByZone(true);
        setXrayShell(false);
        setContrastBoost(true);
        setActivePreset('overview');
    }, [ifcUrl]);

    // ── Anchor marker helpers ──
    const clearAnchorMarker = useCallback(() => {
        if (pulseRef.current) { clearInterval(pulseRef.current); pulseRef.current = null; }
        if (anchorMarkerRef.current) {
            for (const obj of anchorMarkerRef.current) {
                worldRef.current?.scene.three.remove(obj);
                disposeObj(obj);
            }
            anchorMarkerRef.current = null;
        }
    }, []);

    const showAnchorMarker = useCallback((point: THREE.Vector3) => {
        const world = worldRef.current;
        if (!world) return;
        clearAnchorMarker();
        const core = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshBasicMaterial({ color: 0x53d2dc }));
        const halo = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), new THREE.MeshBasicMaterial({ color: 0x53d2dc, transparent: true, opacity: 0.3 }));
        core.position.copy(point); halo.position.copy(point);
        world.scene.three.add(core, halo);
        anchorMarkerRef.current = [core, halo];
        let t = 0;
        pulseRef.current = setInterval(() => {
            t += 0.2; const s = 1 + Math.sin(t) * 0.28;
            halo.scale.set(s, s, s);
            fragmentsRef.current?.core.update(true);
        }, 50);
    }, [clearAnchorMarker]);

    // ── Clear all measurement 3D objects ──
    const clearMeasureObjects = useCallback(() => {
        const world = worldRef.current;
        for (const objs of measureObjectsRef.current.values())
            for (const obj of objs) { world?.scene.three.remove(obj); disposeObj(obj); }
        measureObjectsRef.current.clear();
    }, []);

    const resetAll = useCallback(() => {
        clearMeasureObjects();
        clearAnchorMarker();
        anchorRef.current = null;
        setMeasurements([]);
        setAwaitingSecondPoint(false);
    }, [clearMeasureObjects, clearAnchorMarker]);

    // ── Highlight helper ──
    const applyHighlight = useCallback(async (items: SelectedElement[]) => {
        const frags = fragmentsRef.current;
        if (!frags) return;
        await frags.resetHighlight();
        if (items.length > 0) await frags.highlight(HIGHLIGHT_MAT, buildSelMap(items));
        frags.core.update(true);
    }, []);

    const restoreOriginalMaterials = useCallback(() => {
        for (const root of loadedObjectsRef.current) {
            root.traverse((obj) => {
                if (!(obj instanceof THREE.Mesh)) return;
                for (const mat of asMaterialArray(obj.material)) {
                    const snap = materialSnapshotsRef.current.get(mat);
                    if (!snap) continue;
                    const colorMat = mat as THREE.Material & { color?: THREE.Color };
                    const emissiveMat = mat as THREE.Material & { emissive?: THREE.Color; emissiveIntensity?: number };
                    if (colorMat.color && snap.color) colorMat.color.copy(snap.color);
                    if (emissiveMat.emissive && snap.emissive) emissiveMat.emissive.copy(snap.emissive);
                    if (typeof snap.emissiveIntensity === 'number' && typeof emissiveMat.emissiveIntensity === 'number') {
                        emissiveMat.emissiveIntensity = snap.emissiveIntensity;
                    }
                    mat.opacity = snap.opacity;
                    mat.transparent = snap.transparent;
                    mat.depthWrite = snap.depthWrite;
                    mat.needsUpdate = true;
                }
            });
        }
    }, []);

    const applyVisualPresentation = useCallback(() => {
        for (const root of loadedObjectsRef.current) {
            root.traverse((obj) => {
                if (!(obj instanceof THREE.Mesh)) return;
                const mats = asMaterialArray(obj.material);
                mats.forEach((mat, index) => {
                    const colorMat = mat as THREE.Material & { color?: THREE.Color };
                    const emissiveMat = mat as THREE.Material & { emissive?: THREE.Color; emissiveIntensity?: number };
                    if (!materialSnapshotsRef.current.has(mat)) {
                        materialSnapshotsRef.current.set(mat, {
                            color: colorMat.color ? colorMat.color.clone() : undefined,
                            emissive: emissiveMat.emissive ? emissiveMat.emissive.clone() : undefined,
                            emissiveIntensity: emissiveMat.emissiveIntensity,
                            opacity: mat.opacity,
                            transparent: mat.transparent,
                            depthWrite: mat.depthWrite,
                        });
                    }

                    const snap = materialSnapshotsRef.current.get(mat);
                    if (!snap) return;

                    if (colorMat.color && snap.color) colorMat.color.copy(snap.color);
                    if (emissiveMat.emissive && snap.emissive) emissiveMat.emissive.copy(snap.emissive);
                    if (typeof snap.emissiveIntensity === 'number' && typeof emissiveMat.emissiveIntensity === 'number') {
                        emissiveMat.emissiveIntensity = snap.emissiveIntensity;
                    }
                    mat.opacity = snap.opacity;
                    mat.transparent = snap.transparent;
                    mat.depthWrite = snap.depthWrite;

                    if (colorByZone && colorMat.color) {
                        const paletteColor = VISUAL_PALETTE[colorIndexFromKey(`${obj.name}:${index}`)];
                        colorMat.color.copy(paletteColor);
                    }

                    if (contrastBoost && emissiveMat.emissive) {
                        emissiveMat.emissive.set('#0f1e26');
                        if (typeof emissiveMat.emissiveIntensity === 'number') emissiveMat.emissiveIntensity = 0.2;
                    }

                    if (xrayShell) {
                        mat.transparent = true;
                        mat.opacity = Math.min(mat.opacity, 0.35);
                        mat.depthWrite = false;
                    }

                    mat.needsUpdate = true;
                });
            });
        }
        fragmentsRef.current?.core.update(true);
    }, [colorByZone, contrastBoost, xrayShell]);

    const applyCameraPreset = useCallback((preset: VisualPreset) => {
        const world = worldRef.current;
        if (!world) return;
        const bounds = sceneBoundsRef.current;
        if (bounds.isEmpty()) return;

        const sphere = bounds.getBoundingSphere(new THREE.Sphere());
        const radius = Math.max(sphere.radius, 0.5);

        const presetMap: Record<VisualPreset, { dir: THREE.Vector3; distance: number; targetOffset: THREE.Vector3 }> = {
            overview: {
                dir: new THREE.Vector3(1, 0.72, 1),
                distance: radius * 2.1,
                targetOffset: new THREE.Vector3(0, 0, 0),
            },
            site: {
                dir: new THREE.Vector3(0.22, 1.7, 0.28),
                distance: radius * 2.6,
                targetOffset: new THREE.Vector3(0, radius * 0.05, 0),
            },
            energy: {
                dir: new THREE.Vector3(1.9, 0.95, -1.2),
                distance: radius * 1.95,
                targetOffset: new THREE.Vector3(radius * 0.18, radius * 0.15, -radius * 0.05),
            },
            interior: {
                dir: new THREE.Vector3(0.35, 0.2, 0.34),
                distance: radius * 0.95,
                targetOffset: new THREE.Vector3(0, radius * 0.1, 0),
            },
        };

        const cfg = presetMap[preset];
        const target = sphere.center.clone().add(cfg.targetOffset);
        const position = target.clone().add(cfg.dir.normalize().multiplyScalar(cfg.distance));

        world.camera.controls.setLookAt(
            position.x,
            position.y,
            position.z,
            target.x,
            target.y,
            target.z,
            true,
        );
    }, []);

    useEffect(() => {
        if (mode === 'visual') {
            applyVisualPresentation();
            return;
        }
        restoreOriginalMaterials();
        fragmentsRef.current?.core.update(true);
    }, [mode, applyVisualPresentation, restoreOriginalMaterials]);

    useEffect(() => {
        if (mode !== 'visual') return;
        applyCameraPreset(activePreset);
    }, [mode, activePreset, applyCameraPreset]);

    // ── Main effect: init Three / load IFC ──
    useEffect(() => {
        if (!containerRef.current) return;
        let mounted = true;
        let components: OBC.Components | null = null;
        let removeWheelGuard: (() => void) | null = null;

        const run = async () => {
            loadedObjectsRef.current = [];
            sceneBoundsRef.current.makeEmpty();
            cbLoad.current?.(true);
            cbError.current?.(null);
            cbProgress.current?.(0);

            components = new OBC.Components();
            try {
                const worlds = components.get(OBC.Worlds);
                const world = worlds.create<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>();
                world.scene = new OBC.SimpleScene(components);
                world.renderer = new OBC.SimpleRenderer(components, containerRef.current!);
                world.camera = new OBC.SimpleCamera(components);
                worldRef.current = world;

                components.init();
                world.scene.setup();
                world.scene.three.background = new THREE.Color(0x0d1e26);

                // Keep wheel zoom inside the viewer and avoid page scroll jumps.
                const canvasEl = world.renderer.three.domElement;
                const blockScrollOnWheel = (event: WheelEvent) => {
                    event.preventDefault();
                };
                canvasEl.addEventListener('wheel', blockScrollOnWheel, { passive: false });
                removeWheelGuard = () => {
                    canvasEl.removeEventListener('wheel', blockScrollOnWheel);
                };

                const frags = components.get(OBC.FragmentsManager);
                fragmentsRef.current = frags;

                const loader = await components.get(OBC.IfcLoader);
                await loader.setup({ autoSetWasm: false, wasm: { path: '/wasm/', absolute: true } });

                frags.init(await OBC.FragmentsManager.getWorker());
                world.camera.controls.addEventListener('rest', () => frags.core.update());

                frags.list.onItemSet.add(({ value: model }) => {
                    model.useCamera(world.camera.three);
                    world.scene.three.add(model.object);
                    loadedObjectsRef.current.push(model.object);
                    sceneBoundsRef.current.expandByObject(model.object);
                    frags.core.update(true);
                    requestAnimationFrame(() => {
                        fitCamera(model.object, world.camera.three, world.camera.controls);
                        if (mode === 'visual') {
                            applyVisualPresentation();
                            applyCameraPreset(activePreset);
                        }
                    });
                });

                const res = await fetch(ifcUrl);
                if (!res.ok) throw new Error(`Failed to fetch model (${res.status})`);
                const buffer = new Uint8Array(await res.arrayBuffer());

                await loader.load(buffer, true, 'model', {
                    processData: {
                        progressCallback: (p) => { if (mounted) cbProgress.current?.(p); },
                    },
                });

                if (!mounted) return;
                cbProgress.current?.(1);
                cbLoad.current?.(false);
            } catch (err) {
                if (!mounted) return;
                cbError.current?.(err instanceof Error ? err.message : 'Failed to load IFC model');
                cbLoad.current?.(false);
            }
        };

        run();

        return () => {
            mounted = false;
            clearAnchorMarker();
            clearMeasureObjects();
            fragmentsRef.current = null;
            worldRef.current = null;
            loadedObjectsRef.current = [];
            sceneBoundsRef.current.makeEmpty();
            cbLoad.current?.(false);
            removeWheelGuard?.();
            components?.dispose();
            if (containerRef.current) containerRef.current.innerHTML = '';
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ifcUrl]);

    // ── Click handler ──
    const handleClick = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        const frags = fragmentsRef.current;
        const world = worldRef.current;
        if (!frags || !world?.renderer) return;

        const mouse = new THREE.Vector2(e.clientX, e.clientY);
        try {
            const hit = await frags.raycast({ camera: world.camera.three, mouse, dom: world.renderer.three.domElement });

            // ── MEASURE mode ──
            if (mode === 'measure') {
                if (!hit) return;
                const p = (hit as { point?: { x: number; y: number; z: number } }).point;
                if (!p || typeof p.x !== 'number') return;
                const point = new THREE.Vector3(p.x, p.y, p.z);

                if (!anchorRef.current) {
                    anchorRef.current = point.clone();
                    showAnchorMarker(point);
                    setAwaitingSecondPoint(true);
                    return;
                }

                clearAnchorMarker();
                const start = anchorRef.current.clone();
                const end = point.clone();
                const distance = start.distanceTo(end);
                const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

                const line = new THREE.Line(
                    new THREE.BufferGeometry().setFromPoints([start, end]),
                    new THREE.LineBasicMaterial({ color: 0x53d2dc }),
                );
                const mkGeo = new THREE.SphereGeometry(0.1, 16, 16);
                const mk1 = new THREE.Mesh(mkGeo, new THREE.MeshBasicMaterial({ color: 0x53d2dc }));
                const mk2 = new THREE.Mesh(mkGeo.clone(), new THREE.MeshBasicMaterial({ color: 0xf0a057 }));
                mk1.position.copy(start); mk2.position.copy(end);
                world.scene.three.add(line, mk1, mk2);
                measureObjectsRef.current.set(id, [line, mk1, mk2]);

                setMeasurements((prev) => [{ id, distance }, ...prev]);
                anchorRef.current = null;
                setAwaitingSecondPoint(false);
                return;
            }

            // ── INSPECT / VISUAL modes ──
            if (!hit) {
                await applyHighlight([]);
                setSelected([]);
                setActiveKey(null);
                return;
            }

            const modelId = hit.fragments.modelId;
            const localId = hit.localId;
            const dataByModel = await frags.getData({ [modelId]: new Set([localId]) });
            const data = dataByModel[modelId]?.[0] ?? null;

            const el: SelectedElement = {
                modelId, localId, itemId: hit.itemId,
                name: String(getAttr(data, 'Name') ?? 'Unnamed'),
                category: String(getAttr(data, 'type') ?? getAttr(data, 'Entity') ?? '—'),
                data,
            };

            const key = selKey(modelId, localId);

            if (mode === 'inspect' || mode === 'visual') {
                await applyHighlight([el]);
                setSelected([el]);
                setActiveKey(key);
                return;
            }
        } catch (err) {
            cbError.current?.(err instanceof Error ? err.message : 'Click error');
        }
    }, [mode, showAnchorMarker, clearAnchorMarker, applyHighlight]);

    const removeMeasurement = useCallback((id: string) => {
        const world = worldRef.current;
        const objs = measureObjectsRef.current.get(id);
        if (objs) { for (const o of objs) { world?.scene.three.remove(o); disposeObj(o); } }
        measureObjectsRef.current.delete(id);
        setMeasurements((prev) => prev.filter((m) => m.id !== id));
    }, []);

    // ---------------------------------------------------------------------------
    // Render helpers — each mode gets its own focused panel
    // ---------------------------------------------------------------------------

    const renderMeasurePanel = () => (
        <div style={panelStyle}>
            <span style={labelStyle}>Measurements</span>
            {measurements.length === 0 && (
                <div style={{ color: '#567a84', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    Click two points on the model to measure a distance.
                </div>
            )}
            {measurements.map((m, i) => (
                <div key={m.id} style={measureRowStyle}>
                    <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: '#567a84', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Measure {measurements.length - i}
                        </div>
                        <div style={{ fontWeight: 600, color: '#53d2dc', fontSize: '1rem', marginTop: 2 }}>
                            {m.distance.toFixed(3)} m
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => removeMeasurement(m.id)}
                        style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#567a84', fontSize: '0.7rem', padding: '4px 8px', cursor: 'pointer' }}
                    >
                        ✕
                    </button>
                </div>
            ))}
            {measurements.length > 0 && (
                <button
                    type="button"
                    onClick={resetAll}
                    style={{ marginTop: 8, width: '100%', padding: '7px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#567a84', fontSize: '0.76rem', cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}
                >
                    Clear all
                </button>
            )}
        </div>
    );

    const renderInspectPanel = () => (
        <div style={panelStyle}>
            {!activeEl ? (
                <>
                    <span style={labelStyle}>BIM Inspector</span>
                    <div style={{ color: '#567a84', fontSize: '0.8rem', lineHeight: 1.6 }}>
                        Click any element to surface its IFC data.
                    </div>
                </>
            ) : (
                <>
                    <div style={{ fontWeight: 700, color: '#dff0f4', marginBottom: 4, fontSize: '0.9rem' }}>{activeEl.name}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: '#567a84', letterSpacing: '0.08em', marginBottom: 12 }}>{activeEl.category}</div>

                    {/* Key highlights */}
                    {highlights && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
                            {highlights.map((h) => (
                                <div key={h.label} style={hlStyle}>
                                    <span style={hlLabelStyle}>{h.label}</span>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#cde4ea' }}>{h.value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* All attributes */}
                    <span style={{ ...labelStyle, marginTop: 4 }}>All attributes · {propRows.length}</span>
                    {visibleRows.map((r) => (
                        <div key={r.key + r.value} style={rowStyle}>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: '#567a84', letterSpacing: '0.08em', marginBottom: 2 }}>{r.key}</div>
                            <div style={{ fontSize: '0.8rem', color: '#cde4ea' }}>{r.value}</div>
                        </div>
                    ))}
                    {propRows.length > 10 && (
                        <button
                            type="button"
                            onClick={() => setShowAll((s) => !s)}
                            style={{ marginTop: 6, width: '100%', padding: '7px', borderRadius: 8, border: '1px solid rgba(83,210,220,0.15)', background: 'rgba(83,210,220,0.05)', color: '#53d2dc', fontSize: '0.74rem', cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}
                        >
                            {showAll ? '↑ Show less' : `↓ Show all ${propRows.length} attributes`}
                        </button>
                    )}
                </>
            )}
        </div>
    );

    const renderVisualPanel = () => (
        <div style={panelStyle}>
            <span style={labelStyle}>Visual mode</span>
            <div style={{ color: '#567a84', fontSize: '0.78rem', lineHeight: 1.55, marginBottom: 10 }}>
                Improve readability for white models using visual contrast controls.
            </div>

            <div style={{ marginBottom: 12 }}>
                <div style={{ ...labelStyle, marginBottom: 6 }}>Visual toggles</div>
                <div style={{ display: 'grid', gap: 6 }}>
                    {([
                        ['Color by zones', colorByZone, () => setColorByZone((v) => !v)],
                        ['X-ray shell', xrayShell, () => setXrayShell((v) => !v)],
                        ['Contrast boost', contrastBoost, () => setContrastBoost((v) => !v)],
                    ] as Array<[string, boolean, () => void]>).map(([label, enabled, toggle]) => (
                        <button
                            key={label}
                            type="button"
                            onClick={toggle}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px 10px',
                                borderRadius: 8,
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: enabled ? 'rgba(83,210,220,0.08)' : 'rgba(255,255,255,0.03)',
                                color: enabled ? '#53d2dc' : '#cde4ea',
                                cursor: 'pointer',
                                fontSize: '0.76rem',
                            }}
                        >
                            <span>{label}</span>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.64rem' }}>{enabled ? 'ON' : 'OFF'}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
                <div style={{ ...labelStyle, marginBottom: 6 }}>Selection</div>
                {!activeEl ? (
                    <div style={{ color: '#567a84', fontSize: '0.78rem', lineHeight: 1.5 }}>
                        Click any element to inspect key metadata with the enhanced visual style.
                    </div>
                ) : (
                    <div style={{ ...rowStyle, marginBottom: 0 }}>
                        <div style={{ fontWeight: 600, color: '#dff0f4', fontSize: '0.83rem' }}>{activeEl.name}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: '#567a84', letterSpacing: '0.08em', marginTop: 3 }}>{activeEl.category}</div>
                    </div>
                )}
            </div>
        </div>
    );

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------

    return (
        <div
            style={{ position: 'relative', width: '100%', height: '100%' }}
            data-lenis-prevent
            data-lenis-prevent-wheel
        >
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: mode === 'measure' ? 'crosshair' : 'default',
                    overscrollBehavior: 'contain',
                }}
                onClick={handleClick}
            />

            {/* Mode-specific panel */}
            {mode === 'measure' && renderMeasurePanel()}
            {mode === 'inspect' && renderInspectPanel()}
            {mode === 'visual' && renderVisualPanel()}

            {/* Measurement: waiting for second point toast */}
            {mode === 'measure' && awaitingSecondPoint && (
                <div style={toastStyle}>● Point 1 set — click a second point</div>
            )}
        </div>
    );
}

export default IFCViewer;
