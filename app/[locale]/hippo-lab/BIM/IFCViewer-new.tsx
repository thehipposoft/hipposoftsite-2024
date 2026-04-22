'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as OBC from "@thatopen/components";
import * as FRAGS from "@thatopen/fragments";
import * as THREE from 'three';

type IFCViewerProps = {
    ifcUrl: string;
    onProgress?: (progress: number) => void;
    onLoadStateChange?: (isLoading: boolean) => void;
    onError?: (message: string | null) => void;
};

type SelectedElement = {
    modelId: string;
    localId: number;
    itemId: number;
    name: string;
    globalId: string;
    category: string;
    data: FRAGS.ItemData | null;
};

type Measurement = {
    id: string;
    start: THREE.Vector3;
    end: THREE.Vector3;
    distance: number;
};

const defaultHighlightMaterial: FRAGS.MaterialDefinition = {
    color: new THREE.Color('#ffd166'),
    renderedFaces: FRAGS.RenderedFaces.TWO,
    opacity: 1,
    transparent: false,
    preserveOriginalMaterial: false,
};

const getItemAttribute = (data: FRAGS.ItemData | null, key: string) => {
    if (!data) return undefined;

    const value = data[key];
    if (!value || Array.isArray(value) || typeof value !== 'object') return undefined;
    if (!('value' in value)) return undefined;

    return value.value;
};

const toDisplayValue = (value: unknown) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    try {
        return JSON.stringify(value);
    } catch {
        return '[complex value]';
    }
};

const normalizeAttributeKey = (key: string) => key.toLowerCase().replace(/[^a-z0-9]/g, '');

const getAttributeValueByCandidates = (data: FRAGS.ItemData | null, candidates: string[]) => {
    if (!data) return undefined;

    const safeEntries = Object.entries(data).filter(([, value]) => {
        return value && !Array.isArray(value) && typeof value === 'object' && 'value' in value;
    }) as [string, FRAGS.ItemAttribute][];

    const normalizedCandidates = candidates.map(normalizeAttributeKey);

    for (const [key, value] of safeEntries) {
        const normalizedKey = normalizeAttributeKey(key);
        if (normalizedCandidates.includes(normalizedKey)) {
            return value.value;
        }
    }

    for (const [key, value] of safeEntries) {
        const normalizedKey = normalizeAttributeKey(key);
        if (normalizedCandidates.some((candidate) => normalizedKey.includes(candidate))) {
            return value.value;
        }
    }

    return undefined;
};

const formatAreaValue = (value: unknown) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return `${value.toFixed(2)} m2`;
    }

    const numeric = Number(value);
    if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
        return `${numeric.toFixed(2)} m2`;
    }

    return toDisplayValue(value);
};

const createModelIdMap = (modelId: string, localId: number): OBC.ModelIdMap => ({
    [modelId]: new Set([localId]),
});

const getSelectionKey = (modelId: string, localId: number) => `${modelId}:${localId}`;

const buildSelectionMap = (items: Pick<SelectedElement, 'modelId' | 'localId'>[]): OBC.ModelIdMap => {
    const map: OBC.ModelIdMap = {};

    for (const item of items) {
        if (!map[item.modelId]) {
            map[item.modelId] = new Set<number>();
        }

        (map[item.modelId] as Set<number>).add(item.localId);
    }

    return map;
};

const actionButtonClass = 'rounded-xl border border-[#5f507f] bg-[#221b35] px-3 py-1.5 text-sm text-[#f5efe6] transition hover:border-[#c8a46a] hover:text-[#dcc395] disabled:cursor-not-allowed disabled:opacity-50';

function IFCViewer({ ifcUrl, onProgress, onLoadStateChange, onError }: IFCViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const fragmentsRef = useRef<OBC.FragmentsManager | null>(null);
    const worldRef = useRef<
        OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer> | null
    >(null);
    const measurementAnchorRef = useRef<THREE.Vector3 | null>(null);
    const measurementObjectsRef = useRef<Map<string, THREE.Object3D[]>>(new Map());

    const [selectedItems, setSelectedItems] = useState<SelectedElement[]>([]);
    const [activeSelectionKey, setActiveSelectionKey] = useState<string | null>(null);
    const [detailsTab, setDetailsTab] = useState<'quick' | 'json'>('quick');
    const [measurementMode, setMeasurementMode] = useState(false);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);

    const activeElement = useMemo(() => {
        if (!selectedItems.length) return null;
        if (!activeSelectionKey) return selectedItems[0];

        return selectedItems.find((item) => getSelectionKey(item.modelId, item.localId) === activeSelectionKey) ?? selectedItems[0];
    }, [activeSelectionKey, selectedItems]);

    const selectedDataRows = useMemo(() => {
        if (!activeElement?.data) return [];

        return Object.entries(activeElement.data)
            .filter(([, value]) => value && !Array.isArray(value) && typeof value === 'object' && 'value' in value)
            .slice(0, 12)
            .map(([key, value]) => ({
                key,
                value: toDisplayValue((value as FRAGS.ItemAttribute).value),
            }));
    }, [activeElement]);

    const propertyHighlights = useMemo(() => {
        if (!activeElement?.data) {
            return [
                { label: 'Element type', value: activeElement?.category ?? '-' },
                { label: 'Material', value: '-' },
                { label: 'Fire rating', value: '-' },
                { label: 'Area', value: '-' },
            ];
        }

        const data = activeElement.data;
        const elementType =
            getAttributeValueByCandidates(data, ['PredefinedType', 'ObjectType', 'TypeName', 'Entity', 'Type']) ??
            activeElement.category;
        const material = getAttributeValueByCandidates(data, ['Material', 'MaterialName', 'LayerSetName', 'LayerName']);
        const fireRating = getAttributeValueByCandidates(data, ['FireRating', 'FireResistanceRating', 'Rating']);
        const area = getAttributeValueByCandidates(data, ['NetArea', 'GrossArea', 'Area', 'NetFloorArea']);

        return [
            { label: 'Element type', value: toDisplayValue(elementType) },
            { label: 'Material', value: toDisplayValue(material) },
            { label: 'Fire rating', value: toDisplayValue(fireRating) },
            { label: 'Area', value: formatAreaValue(area) },
        ];
    }, [activeElement]);

    const propertyCount = useMemo(() => {
        if (!activeElement?.data) return 0;

        return Object.entries(activeElement.data).filter(([, value]) => {
            return value && !Array.isArray(value) && typeof value === 'object' && 'value' in value;
        }).length;
    }, [activeElement]);

    const selectedCount = selectedItems.length;

    const clearMeasurementObjects = () => {
        const world = worldRef.current;

        for (const objects of measurementObjectsRef.current.values()) {
            for (const object of objects) {
                world?.scene.three.remove(object);

                if (object instanceof THREE.Line) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }

                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            }
        }

        measurementObjectsRef.current.clear();
    };

    const clearMeasurements = () => {
        clearMeasurementObjects();
        measurementAnchorRef.current = null;
        setMeasurements([]);
    };

    const removeMeasurement = (measurementId: string) => {
        const world = worldRef.current;
        const objects = measurementObjectsRef.current.get(measurementId);

        if (objects) {
            for (const object of objects) {
                world?.scene.three.remove(object);

                if (object instanceof THREE.Line) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }

                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            }
        }

        measurementObjectsRef.current.delete(measurementId);
        setMeasurements((previous) => previous.filter((item) => item.id !== measurementId));
    };

    const extractHitPoint = (result: unknown): THREE.Vector3 | null => {
        if (!result || typeof result !== 'object') return null;

        const point = (result as { point?: unknown }).point;
        if (!point || typeof point !== 'object') return null;

        const maybePoint = point as { x?: unknown; y?: unknown; z?: unknown };
        if (
            typeof maybePoint.x !== 'number' ||
            typeof maybePoint.y !== 'number' ||
            typeof maybePoint.z !== 'number'
        ) {
            return null;
        }

        return new THREE.Vector3(maybePoint.x, maybePoint.y, maybePoint.z);
    };

    const addMeasurementPoint = (point: THREE.Vector3) => {
        const world = worldRef.current;
        if (!world) return;

        if (!measurementAnchorRef.current) {
            measurementAnchorRef.current = point.clone();
            onError?.(null);
            return;
        }

        const start = measurementAnchorRef.current.clone();
        const end = point.clone();
        const distance = start.distanceTo(end);
        const measurementId = `${Date.now()}-${Math.round(Math.random() * 10_000)}`;

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xc8a46a });
        const line = new THREE.Line(lineGeometry, lineMaterial);

        const markerGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        const startMarker = new THREE.Mesh(
            markerGeometry,
            new THREE.MeshBasicMaterial({ color: 0x8c7ab8 }),
        );
        const endMarker = new THREE.Mesh(
            markerGeometry.clone(),
            new THREE.MeshBasicMaterial({ color: 0xdcc395 }),
        );
        startMarker.position.copy(start);
        endMarker.position.copy(end);

        world.scene.three.add(line);
        world.scene.three.add(startMarker);
        world.scene.three.add(endMarker);

        measurementObjectsRef.current.set(measurementId, [line, startMarker, endMarker]);
        setMeasurements((previous) => [
            {
                id: measurementId,
                start,
                end,
                distance,
            },
            ...previous,
        ]);

        measurementAnchorRef.current = null;
        onError?.(null);
    };

    const applySelectionHighlight = async (items: SelectedElement[]) => {
        const fragments = fragmentsRef.current;
        if (!fragments) return;

        await fragments.resetHighlight();

        if (items.length > 0) {
            await fragments.highlight(defaultHighlightMaterial, buildSelectionMap(items));
        }

        fragments.core.update(true);
    };

    useEffect(() => {
        let isMounted = true;

        const initModelLoading = async () => {
            if (!containerRef.current) return;

            onLoadStateChange?.(true);
            onError?.(null);
            onProgress?.(0);
            setSelectedItems([]);
            setActiveSelectionKey(null);
            clearMeasurements();

            const components = new OBC.Components();

            try {
                const worlds = components.get(OBC.Worlds);
                const world = worlds.create<
                    OBC.SimpleScene,
                    OBC.SimpleCamera,
                    OBC.SimpleRenderer
                >();

                world.scene = new OBC.SimpleScene(components);
                world.renderer = new OBC.SimpleRenderer(components, containerRef.current);
                world.camera = new OBC.SimpleCamera(components);
                worldRef.current = world;

                components.init();
                world.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);

                world.camera.controls.minPolarAngle = 0;
                world.camera.controls.maxPolarAngle = Math.PI / 2;
                world.scene.setup();
                world.scene.three.background = new THREE.Color(0xf6f7f9);

                const fragments = components.get(OBC.FragmentsManager);
                fragmentsRef.current = fragments;
                const fragmentIfcLoader = await components.get(OBC.IfcLoader);
                await fragmentIfcLoader.setup({
                    autoSetWasm: false,
                    wasm: {
                        path: "/wasm/",
                        absolute: true,
                    },
                });

                const workerUrl = await OBC.FragmentsManager.getWorker();
                fragments.init(workerUrl);

                world.camera.controls.addEventListener("rest", () => {
                    fragments.core.update();
                });

                fragments.list.onItemSet.add(({ value: model }) => {
                    model.useCamera(world.camera.three);
                    world.scene.three.add(model.object);
                    fragments.core.update(true);

                    setTimeout(() => {
                        world.camera.three.position.set(0, 10, 40);
                        world.camera.three.lookAt(new THREE.Vector3(0, 0, 50));

                        world.camera.controls.setLookAt(
                            -14.932953878543646, 3.9172822989963167, 39.98790554193692,
                            -5.6126231611163115, 3.7992060582434033, 1.5608709226067827,
                            true
                        );
                    }, 100);
                });

                const file = await fetch(ifcUrl);
                if (!file.ok) {
                    throw new Error(`Failed to fetch IFC model (${file.status})`);
                }
                const data = await file.arrayBuffer();
                const buffer = new Uint8Array(data);

                await fragmentIfcLoader.load(buffer, true, 'example', {
                    processData: {
                        progressCallback: (progress) => {
                            if (!isMounted) return;
                            onProgress?.(progress);
                        },
                    },
                });

                onProgress?.(1);
                onLoadStateChange?.(false);
            } catch (error) {
                if (!isMounted) return;

                const message = error instanceof Error ? error.message : 'Failed to load IFC model';
                onError?.(message);
                onLoadStateChange?.(false);
                console.error('IFC viewer error:', error);
            }

            return () => {
                components.dispose();
            };
        };

        let disposeComponents: (() => void) | undefined;

        initModelLoading().then((dispose) => {
            disposeComponents = dispose;
        });

        return () => {
            isMounted = false;
            onLoadStateChange?.(false);
            clearMeasurements();
            fragmentsRef.current = null;
            worldRef.current = null;
            setSelectedItems([]);
            setActiveSelectionKey(null);

            if (disposeComponents) {
                disposeComponents();
            }

            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [ifcUrl, onError, onLoadStateChange, onProgress]);

    const selectElement = async (event: React.MouseEvent<HTMLDivElement>) => {
        const fragments = fragmentsRef.current;
        const world = worldRef.current;

        if (!fragments || !world) return;
        if (!world.renderer) return;

        const canvas = world.renderer.three.domElement;
        const mouse = new THREE.Vector2(event.clientX, event.clientY);

        try {
            const result = await fragments.raycast({
                camera: world.camera.three,
                mouse,
                dom: canvas,
            });

            if (!result) {
                if (measurementMode) return;

                if (!event.shiftKey) {
                    await applySelectionHighlight([]);
                    setSelectedItems([]);
                    setActiveSelectionKey(null);
                }
                return;
            }

            if (measurementMode) {
                const hitPoint = extractHitPoint(result);
                if (!hitPoint) {
                    onError?.('Unable to get a valid point for measurement on this click.');
                    return;
                }

                addMeasurementPoint(hitPoint);
                return;
            }

            const modelId = result.fragments.modelId;
            const localId = result.localId;
            const selectionMap = createModelIdMap(modelId, localId);

            const dataByModel = await fragments.getData(selectionMap);
            const itemData = dataByModel[modelId]?.[0] ?? null;

            console.log(">> Clicked element data:", itemData);
            console.log(">> dataByModel:", dataByModel);

            const clickedElement: SelectedElement = {
                modelId,
                localId,
                itemId: result.itemId,
                name: String(getItemAttribute(itemData, 'Name') ?? 'Unnamed element'),
                globalId: String(getItemAttribute(itemData, 'GlobalId') ?? '-'),
                category: String(getItemAttribute(itemData, 'type') ?? getItemAttribute(itemData, 'Entity') ?? '-'),
                data: itemData,
            };

            const clickedKey = getSelectionKey(modelId, localId);

            setSelectedItems((previous) => {
                const exists = previous.some((item) => getSelectionKey(item.modelId, item.localId) === clickedKey);

                if (event.shiftKey) {
                    if (exists) {
                        const next = previous.filter((item) => getSelectionKey(item.modelId, item.localId) !== clickedKey);
                        applySelectionHighlight(next);
                        setActiveSelectionKey(next[0] ? getSelectionKey(next[0].modelId, next[0].localId) : null);
                        return next;
                    }

                    const next = [...previous, clickedElement];
                    applySelectionHighlight(next);
                    setActiveSelectionKey(clickedKey);
                    return next;
                }

                const next = [clickedElement];
                applySelectionHighlight(next);
                setActiveSelectionKey(clickedKey);
                return next;
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to select IFC element';
            onError?.(message);
            console.error('Selection error:', error);
        }
    };

    const clearVisualState = async () => {
        if (!fragmentsRef.current) return;

        await fragmentsRef.current.resetHighlight();
        fragmentsRef.current.core.update(true);

        setSelectedItems([]);
        setActiveSelectionKey(null);
        clearMeasurements();
    };

    return (
        <div className="relative h-full w-full">
            <div
                ref={containerRef}
                className="h-full w-full cursor-crosshair"
                onClick={selectElement}
            />

            <aside
                className="absolute right-3 top-3 max-h-[calc(100%-24px)] w-[min(360px,calc(100%-24px))] overflow-auto rounded-2xl border border-[#5f507f]/50 bg-[#f7f1e8]/95 p-3 text-[#221b35] shadow-[0_16px_40px_rgba(18,15,29,0.3)] backdrop-blur-sm"
            >
                {!activeElement && (
                    <div className="text-sm leading-6 text-[#5d5572]">
                        Click an IFC element to inspect metadata. Use Shift + Click to multi-select elements.
                    </div>
                )}

                <div className="mb-3 flex flex-wrap gap-2">
                    <button
                        type='button'
                        onClick={() => {
                            setMeasurementMode((previous) => !previous);
                            measurementAnchorRef.current = null;
                            onError?.(null);
                        }}
                        className={`${actionButtonClass} ${measurementMode ? '!border-[#c8a46a] !text-[#dcc395]' : ''}`}
                    >
                        {measurementMode ? 'Measurement: ON' : 'Measurement: OFF'}
                    </button>
                    <button
                        type='button'
                        onClick={clearMeasurements}
                        className={actionButtonClass}
                        disabled={measurements.length === 0}
                    >
                        Clear measures
                    </button>
                    <button
                        type='button'
                        onClick={clearVisualState}
                        className={actionButtonClass}
                    >
                        Reset all
                    </button>
                </div>

                <div className="mb-2 text-sm text-[#5d5572]">
                    Selected elements: {selectedCount}
                </div>

                <div className="mb-2 text-sm text-[#5d5572]">
                    Measurements: {measurements.length}
                </div>

                {measurementMode && (
                    <div className="mb-3 rounded-xl border border-[#d8ccbb] bg-white/80 px-3 py-2 text-xs text-[#5d5572]">
                        Click one point to start, click a second point to create a distance segment.
                    </div>
                )}

                {measurements.length > 0 && (
                    <div className="mb-3 grid max-h-[120px] gap-1.5 overflow-y-auto">
                        {measurements.map((measurement, index) => (
                            <div key={measurement.id} className="rounded-xl border border-[#d8ccbb] bg-white p-2">
                                <div className="flex items-center justify-between gap-2">
                                    <strong className="text-xs text-[#221b35]">Measure {measurements.length - index}</strong>
                                    <button
                                        type='button'
                                        onClick={() => removeMeasurement(measurement.id)}
                                        className="rounded-md border border-[#d8ccbb] px-2 py-0.5 text-[0.68rem] text-[#5d5572] hover:border-[#8c7ab8]"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="mt-1 text-[0.72rem] text-[#6f6583]">
                                    Distance: {measurement.distance.toFixed(3)} m
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedItems.length > 0 && (
                    <div className="mb-3 grid max-h-[120px] gap-1.5 overflow-y-auto">
                        {selectedItems.map((item) => {
                            const key = getSelectionKey(item.modelId, item.localId);
                            const isActive = key === activeSelectionKey;

                            return (
                                <button
                                    key={key}
                                    type='button'
                                    onClick={() => setActiveSelectionKey(key)}
                                    className={`grid gap-0.5 rounded-xl border p-2 text-left transition ${
                                        isActive
                                            ? 'border-[#c8a46a] bg-[#efe4d1] text-[#221b35]'
                                            : 'border-[#d8ccbb] bg-white text-[#221b35] hover:border-[#8c7ab8]'
                                    }`}
                                >
                                    <strong className="text-xs font-semibold">{item.name}</strong>
                                    <span className="text-[0.72rem] text-[#6f6583]">#{item.itemId} ({item.category})</span>
                                </button>
                            );
                        })}
                    </div>
                )}


                {activeElement && (
                    <div>
                        <h4 className="m-0 text-base font-semibold text-[#221b35]">
                            {activeElement.name}
                        </h4>

                        <div className="mt-2 max-h-[40vh] overflow-y-auto pr-1">
                            <div className="mb-3 rounded-xl border border-[#d8ccbb] bg-white p-3">
                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <h5 className="m-0 text-xs uppercase tracking-[0.14em] text-[#7b718d]">BIM data panel</h5>
                                    <span className="rounded-full border border-[#d8ccbb] bg-[#f7f1e8] px-2 py-0.5 text-[0.68rem] text-[#6f6583]">
                                        {propertyCount} properties
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {propertyHighlights.map((item) => (
                                        <div key={item.label} className="rounded-lg border border-[#e6dccf] bg-[#fcfaf7] px-2.5 py-2">
                                            <div className="text-[0.68rem] uppercase tracking-[0.1em] text-[#8a7f9c]">{item.label}</div>
                                            <div className="mt-1 text-xs font-medium text-[#2f2746]">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {detailsTab === 'quick' && selectedDataRows.length > 0 && (
                                <div className="grid gap-2">
                                    {selectedDataRows.map((row) => (
                                        <div key={row.key} className="rounded-xl border border-[#d8ccbb] bg-white px-3 py-2">
                                            <div className="text-[0.72rem] text-[#7b718d]">{row.key}</div>
                                            <div className="text-sm text-[#221b35]">{row.value}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {detailsTab === 'quick' && selectedDataRows.length === 0 && (
                                <div className="rounded-xl border border-[#d8ccbb] bg-white px-3 py-2 text-sm text-[#5d5572]">
                                    No structured IFC attributes available for this element.
                                </div>
                            )}

                            {detailsTab === 'json' && (
                                <pre
                                    className="m-0 overflow-x-auto whitespace-pre-wrap rounded-xl border border-[#d8ccbb] bg-white p-3 text-[0.72rem] text-[#3d3453]"
                                >
                                    {JSON.stringify(activeElement.data, null, 2)}
                                </pre>
                            )}
                        </div>
                    </div>
                )}
            </aside>
        </div>
     );
}

export default IFCViewer;
