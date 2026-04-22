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
const tabButtonClass = 'rounded-xl border border-[#5f507f] px-3 py-1 text-sm transition';

function IFCViewer({ ifcUrl, onProgress, onLoadStateChange, onError }: IFCViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const fragmentsRef = useRef<OBC.FragmentsManager | null>(null);
    const worldRef = useRef<
        OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer> | null
    >(null);

    const [selectedItems, setSelectedItems] = useState<SelectedElement[]>([]);
    const [activeSelectionKey, setActiveSelectionKey] = useState<string | null>(null);
    const [overrideColor, setOverrideColor] = useState('#ff6b6b');
    const [isApplyingColor, setIsApplyingColor] = useState(false);
    const [colorOverrides, setColorOverrides] = useState<Record<string, string>>({});
    const [detailsTab, setDetailsTab] = useState<'quick' | 'json'>('quick');

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

    const selectedCount = selectedItems.length;

    const applyColorOverridesToModels = async (
        overrides: Record<string, string>,
        shouldUpdate = true,
    ) => {
        const fragments = fragmentsRef.current;
        if (!fragments) return;

        const byModelAndColor = new Map<string, number[]>();
        for (const [key, color] of Object.entries(overrides)) {
            const splitIndex = key.lastIndexOf(':');
            if (splitIndex < 0) continue;

            const modelId = key.slice(0, splitIndex);
            const localId = Number(key.slice(splitIndex + 1));
            if (Number.isNaN(localId)) continue;

            const groupKey = `${modelId}|${color}`;
            const current = byModelAndColor.get(groupKey) ?? [];
            current.push(localId);
            byModelAndColor.set(groupKey, current);
        }

        for (const [groupKey, localIds] of byModelAndColor) {
            const separator = groupKey.lastIndexOf('|');
            const modelId = groupKey.slice(0, separator);
            const color = groupKey.slice(separator + 1);
            const model = fragments.list.get(modelId);

            if (!model) continue;
            await model.highlight(localIds, {
                color: new THREE.Color(color),
                renderedFaces: FRAGS.RenderedFaces.TWO,
                opacity: 1,
                transparent: false,
                preserveOriginalMaterial: false,
            });
        }

        if (shouldUpdate) {
            fragments.core.update(true);
        }
    };

    const applySelectionHighlight = async (
        items: SelectedElement[],
        overrides: Record<string, string> = colorOverrides,
    ) => {
        const fragments = fragmentsRef.current;
        if (!fragments) return;

        await fragments.resetHighlight();
        await applyColorOverridesToModels(overrides, false);

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
            setColorOverrides({});

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
                if (!event.shiftKey) {
                    await applySelectionHighlight([]);
                    setSelectedItems([]);
                    setActiveSelectionKey(null);
                }
                return;
            }

            const modelId = result.fragments.modelId;
            const localId = result.localId;
            const selectionMap = createModelIdMap(modelId, localId);

            const dataByModel = await fragments.getData(selectionMap);
            const itemData = dataByModel[modelId]?.[0] ?? null;

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

    const applyColorOverride = async () => {
        if (!selectedItems.length || !fragmentsRef.current) return;

        setIsApplyingColor(true);
        try {
            const byModel = new Map<string, number[]>();
            for (const item of selectedItems) {
                const current = byModel.get(item.modelId) ?? [];
                current.push(item.localId);
                byModel.set(item.modelId, current);
            }

            for (const [modelId, localIds] of byModel) {
                const model = fragmentsRef.current.list.get(modelId);
                if (!model) continue;
                await model.highlight(localIds, {
                    color: new THREE.Color(overrideColor),
                    renderedFaces: FRAGS.RenderedFaces.TWO,
                    opacity: 1,
                    transparent: false,
                    preserveOriginalMaterial: false,
                });
            }

            const nextOverrides = { ...colorOverrides };
            for (const item of selectedItems) {
                nextOverrides[getSelectionKey(item.modelId, item.localId)] = overrideColor;
            }
            setColorOverrides(nextOverrides);

            await fragmentsRef.current.resetHighlight();
            await fragmentsRef.current.highlight(
                {
                    ...defaultHighlightMaterial,
                    color: new THREE.Color(overrideColor),
                },
                buildSelectionMap(selectedItems),
            );
            fragmentsRef.current.core.update(true);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to apply element color';
            onError?.(message);
            console.error('Color override error:', error);
        } finally {
            setIsApplyingColor(false);
        }
    };

    const resetElementColor = async () => {
        if (!selectedItems.length || !fragmentsRef.current) return;

        setIsApplyingColor(true);
        try {
            const byModel = new Map<string, number[]>();
            for (const item of selectedItems) {
                const current = byModel.get(item.modelId) ?? [];
                current.push(item.localId);
                byModel.set(item.modelId, current);
            }

            for (const [modelId, localIds] of byModel) {
                const model = fragmentsRef.current.list.get(modelId);
                if (!model) continue;
                await model.resetHighlight(localIds);
            }

            const nextOverrides = { ...colorOverrides };
            for (const item of selectedItems) {
                delete nextOverrides[getSelectionKey(item.modelId, item.localId)];
            }
            setColorOverrides(nextOverrides);

            await applySelectionHighlight(selectedItems, nextOverrides);
            fragmentsRef.current.core.update(true);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to reset element color';
            onError?.(message);
            console.error('Reset color error:', error);
        } finally {
            setIsApplyingColor(false);
        }
    };

    const clearVisualState = async () => {
        if (!fragmentsRef.current) return;

        await fragmentsRef.current.resetHighlight();
        fragmentsRef.current.core.update(true);

        setSelectedItems([]);
        setActiveSelectionKey(null);
        setColorOverrides({});
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
                        Click an IFC element to inspect metadata. Use Shift + Click to multi-select and apply batch colors.
                    </div>
                )}

                <div className="mb-3 flex flex-wrap gap-2">
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

                {selectedItems.length > 0 && (
                    <div className="mb-3 grid max-h-[120px] gap-1.5 overflow-y-auto">
                        {selectedItems.map((item) => {
                            const key = getSelectionKey(item.modelId, item.localId);
                            const isActive = key === activeSelectionKey;
                            const swatch = colorOverrides[key] ?? 'transparent';

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
                                    <div className="flex justify-between gap-2">
                                        <strong className="text-xs font-semibold">{item.name}</strong>
                                        <span
                                            className="h-3 w-3 rounded-full border border-[#bcae99]"
                                            style={{ background: swatch }}
                                        />
                                    </div>
                                    <span className="text-[0.72rem] text-[#6f6583]">#{item.itemId} ({item.category})</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {activeElement && (
                    <div>
                        <h4 className="m-0 text-base font-semibold text-[#221b35]">{activeElement.name}</h4>
                        <p className="my-1.5 text-sm text-[#5d5572]">
                            IFC id: {activeElement.itemId} | Local id: {activeElement.localId}
                        </p>
                        <p className="my-1 text-sm text-[#4d4562]">
                            GlobalId: {activeElement.globalId}
                        </p>
                        <p className="mb-2 mt-1 text-sm text-[#4d4562]">
                            Category: {activeElement.category}
                        </p>

                        <div className="mb-3 flex items-center gap-2">
                            <input
                                type='color'
                                value={overrideColor}
                                onChange={(e) => setOverrideColor(e.target.value)}
                                aria-label='Choose color override'
                                className="h-10 w-12 cursor-pointer rounded-lg border border-[#bcae99] bg-transparent p-1"
                            />
                            <button
                                type='button'
                                onClick={applyColorOverride}
                                disabled={isApplyingColor || selectedItems.length === 0}
                                className={actionButtonClass}
                            >
                                Apply to ({selectedCount})
                            </button>
                            <button
                                type='button'
                                onClick={resetElementColor}
                                disabled={isApplyingColor || selectedItems.length === 0}
                                className={actionButtonClass}
                            >
                                Reset
                            </button>
                        </div>

                        <div className="mb-2 flex gap-2">
                            <button
                                type='button'
                                onClick={() => setDetailsTab('quick')}
                                className={`${tabButtonClass} ${detailsTab === 'quick' ? 'border-[#c8a46a] bg-[#efe4d1] text-[#221b35]' : 'bg-white text-[#5d5572]'}`}
                            >
                                Properties
                            </button>
                            <button
                                type='button'
                                onClick={() => setDetailsTab('json')}
                                className={`${tabButtonClass} ${detailsTab === 'json' ? 'border-[#c8a46a] bg-[#efe4d1] text-[#221b35]' : 'bg-white text-[#5d5572]'}`}
                            >
                                Raw JSON
                            </button>
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

                        {detailsTab === 'json' && (
                            <pre
                                className="m-0 overflow-x-auto whitespace-pre-wrap rounded-xl border border-[#d8ccbb] bg-white p-3 text-[0.72rem] text-[#3d3453]"
                            >
                                {JSON.stringify(activeElement.data, null, 2)}
                            </pre>
                        )}
                    </div>
                )}
            </aside>
        </div>
     );
}

export default IFCViewer;
