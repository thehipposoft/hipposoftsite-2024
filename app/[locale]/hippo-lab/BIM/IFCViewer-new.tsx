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
        if (nk === 'type' || nk === 'expressid' || nk === 'oid') continue;
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

const fitCamera = (
    object: THREE.Object3D,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    controls: {
        setLookAt: (
            positionX: number,
            positionY: number,
            positionZ: number,
            targetX: number,
            targetY: number,
            targetZ: number,
            enableTransition?: boolean,
        ) => Promise<void> | void;
    },
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

    const activeEl = useMemo(
        () => selected.find((i) => selKey(i.modelId, i.localId) === activeKey) ?? selected[0] ?? null,
        [selected, activeKey]
    );

    const propRows = useMemo(() => {
        if (!activeEl?.data) return [];
        const rows = collectRows(activeEl.data)
            .filter((r) => r.value !== '—' && r.value !== '[complex]' && r.normalizedKey.length > 0);
        const dedup = new Map<string, PropertyRow>();
        for (const r of rows) { const k = `${r.normalizedKey}|${r.value}`; if (!dedup.has(k)) dedup.set(k, r); }
        return Array.from(dedup.values());
    }, [activeEl]);

    const highlights = useMemo(() => {
        if (!activeEl?.data) return null;
        return [
            { label: 'Element type', value: findByCandidates(propRows, ['PredefinedType', 'ObjectType', 'TypeName', 'Entity']) ?? activeEl.category },
            { label: 'Material', value: findByCandidates(propRows, ['Material', 'MaterialName', 'LayerSetName']) ?? '—' },
            { label: 'Fire rating', value: findByCandidates(propRows, ['FireRating', 'FireResistanceRating']) ?? '—' },
            { label: 'Area', value: formatArea(findByCandidates(propRows, ['NetArea', 'GrossArea', 'Area', 'NetFloorArea'])) },
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

    // ── Main effect: init Three / load IFC ──
    useEffect(() => {
        if (!containerRef.current) return;
        let mounted = true;
        let components: OBC.Components | null = null;
        let removeWheelGuard: (() => void) | null = null;

        const run = async () => {
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
                    frags.core.update(true);
                    requestAnimationFrame(() => fitCamera(model.object, world.camera.three, world.camera.controls));
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

            // ── INSPECT / MULTISELECT modes ──
            if (!hit) {
                if (!e.shiftKey) {
                    await applyHighlight([]);
                    setSelected([]);
                    setActiveKey(null);
                }
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

            if (mode === 'inspect') {
                // Single select only — replace regardless of shift
                await applyHighlight([el]);
                setSelected([el]);
                setActiveKey(key);
                return;
            }

            // multiselect
            setSelected((prev) => {
                const exists = prev.some((i) => selKey(i.modelId, i.localId) === key);
                const next = e.shiftKey
                    ? exists ? prev.filter((i) => selKey(i.modelId, i.localId) !== key) : [...prev, el]
                    : [el];
                applyHighlight(next);
                setActiveKey(next[0] ? selKey(next[0].modelId, next[0].localId) : null);
                return next;
            });
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

    const renderMultiselectPanel = () => (
        <div style={panelStyle}>
            <span style={labelStyle}>Selected — {selected.length} element{selected.length !== 1 ? 's' : ''}</span>
            {selected.length === 0 ? (
                <div style={{ color: '#567a84', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    Click elements to select them.<br />Hold Shift to add more.
                </div>
            ) : (
                <>
                    {selected.map((el) => {
                        const k = selKey(el.modelId, el.localId);
                        const isActive = k === activeKey;
                        return (
                            <button
                                key={k}
                                type="button"
                                onClick={() => setActiveKey(k)}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    padding: '8px 10px', borderRadius: 8, marginBottom: 6,
                                    border: `1px solid ${isActive ? 'rgba(83,210,220,0.35)' : 'rgba(255,255,255,0.07)'}`,
                                    background: isActive ? 'rgba(83,210,220,0.08)' : 'rgba(255,255,255,0.03)',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ fontWeight: 600, color: '#dff0f4', fontSize: '0.82rem' }}>{el.name}</div>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: '#567a84', letterSpacing: '0.08em', marginTop: 2 }}>{el.category}</div>
                            </button>
                        );
                    })}
                    <button
                        type="button"
                        onClick={async () => { await applyHighlight([]); setSelected([]); setActiveKey(null); }}
                        style={{ marginTop: 4, width: '100%', padding: '7px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#567a84', fontSize: '0.76rem', cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}
                    >
                        Clear selection
                    </button>
                </>
            )}
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
            {mode === 'multiselect' && renderMultiselectPanel()}

            {/* Measurement: waiting for second point toast */}
            {mode === 'measure' && awaitingSecondPoint && (
                <div style={toastStyle}>● Point 1 set — click a second point</div>
            )}
        </div>
    );
}

export default IFCViewer;
