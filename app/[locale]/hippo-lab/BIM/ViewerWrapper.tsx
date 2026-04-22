'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import IFCViewer from './IFCViewer-new';

type DemoModel = {
    id: string;
    title: string;
    subtitle: string;
    tag: string;
    description: string;
    url: string;
    isCustom?: boolean;
};

const baseModels: DemoModel[] = [
    {
        id: 'granny-flat',
        title: 'Residential Unit',
        subtitle: 'Granny Flat',
        tag: 'Residential',
        description: 'Single-dwelling unit with full structural & MEP data',
        url: '/models/granny-flat.ifc',
    },
    {
        id: 'hotel',
        title: 'Hotel Payogastilla',
        subtitle: 'Hospitality Complex',
        tag: 'Commercial',
        description: 'Multi-floor hospitality build with coordinated systems',
        url: '/models/hotel-payogastilla.ifc',
    },
];

const features = [
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M9 1V17M2 5L16 13M16 5L2 13" stroke="currentColor" strokeWidth="1.4" />
            </svg>
        ),
        label: 'Full IFC geometry',
        detail: 'Every wall, slab, and fitting rendered accurately from your model file.',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9 5V9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
        label: 'Loads in seconds',
        detail: 'WASM-powered parsing — no server uploads, no waiting rooms.',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
            </svg>
        ),
        label: 'Inspect any element',
        detail: 'Click any component to surface IFC properties instantly.',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9H15M9 3L15 9L9 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        label: 'One embed, any site',
        detail: 'Drop into React, Next.js, or plain HTML — no BIM software required.',
    },
];

const ViewerWrapper = () => {
    const [selectedModelId, setSelectedModelId] = useState(baseModels[0].id);
    const [customModels, setCustomModels] = useState<DemoModel[]>([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const models = useMemo(() => [...baseModels, ...customModels], [customModels]);

    const selectedModel = useMemo(
        () => models.find((item) => item.id === selectedModelId) ?? models[0],
        [models, selectedModelId]
    );

    useEffect(() => {
        return () => {
            for (const model of customModels) {
                URL.revokeObjectURL(model.url);
            }
        };
    }, [customModels]);

    const handleAddIfc = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';

        if (!file) return;

        const isIfcFile =
            file.name.toLowerCase().endsWith('.ifc') ||
            file.type.toLowerCase().includes('ifc') ||
            file.type === '';

        if (!isIfcFile) {
            setError('Please select a valid IFC file (.ifc).');
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        const fileBaseName = file.name.replace(/\.ifc$/i, '') || 'Custom IFC';
        const newModel: DemoModel = {
            id: `custom-${Date.now()}`,
            title: fileBaseName,
            subtitle: 'Local Upload',
            tag: 'Custom',
            description: `Uploaded IFC (${(file.size / (1024 * 1024)).toFixed(1)} MB)`,
            url: objectUrl,
            isCustom: true,
        };

        setCustomModels((previous) => [...previous, newModel]);
        setSelectedModelId(newModel.id);
        setError(null);
        setProgress(0);
    };

    const progressPercent = Math.round(progress * 100);
    const modelButtonBase = 'w-full rounded-2xl border p-4 text-left transition duration-200';
    const panelClass = 'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm';

    return (
        <section className="relative min-h-[calc(100vh-100px)] overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(69,48,102,0.35),_transparent_32%),linear-gradient(180deg,_#120f1d_0%,_#1a1530_45%,_#221b35_100%)] px-5 pb-16 pt-14 text-white md:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
            <div className="pointer-events-none absolute -left-20 top-0 h-[28rem] w-[28rem] rounded-full bg-[#c8a46a]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-[#8c7ab8]/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <header className="mb-10 max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8a46a]/25 bg-white/5 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#dcc395]">
                        <span className="h-2 w-2 rounded-full bg-[#dcc395] shadow-[0_0_10px_rgba(220,195,149,0.8)]" />
                        BIM on the web
                    </div>
                    <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl md:leading-[1.02]">
                        Interactive IFC embedding for client websites
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-[#d3cadf] md:text-lg">
                        Show stakeholders real geometry, spatial context, and design intent directly on your website.
                        No desktop BIM software needed.
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <aside>
                        <div className={`${panelClass} p-5`}>
                            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#c8b6df]">Choose a demo model</p>
                            <div className="mb-3 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-xl border border-[#c8a46a]/50 bg-[#c8a46a]/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#dcc395] transition hover:border-[#c8a46a] hover:bg-[#c8a46a]/20"
                                >
                                    Add IFC demo
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".ifc"
                                    className="hidden"
                                    onChange={handleAddIfc}
                                />
                            </div>
                            <div className="space-y-3">
                                {models.map((model) => {
                                    const isActive = selectedModelId === model.id;

                                    return (
                                        <button
                                            key={model.id}
                                            type="button"
                                            className={`${modelButtonBase} ${
                                                isActive
                                                    ? 'border-[#c8a46a]/60 bg-[#c8a46a]/10 shadow-[0_0_0_1px_rgba(200,164,106,0.2)]'
                                                    : 'border-white/10 bg-black/10 hover:border-[#8c7ab8]/60 hover:bg-white/[0.06]'
                                            }`}
                                            onClick={() => {
                                                setSelectedModelId(model.id);
                                                setError(null);
                                                setProgress(0);
                                            }}
                                        >
                                            <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.18em] text-[#dcc395]">{model.tag}</span>
                                            <span className="block text-base font-semibold text-white">{model.title}</span>
                                            <span className="mt-1 block text-sm text-[#d3cadf]">{model.description}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {error && (
                                <div className="mt-4 rounded-2xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                                    {error}
                                </div>
                            )}
                        </div>
                    </aside>

                    <div className={`${panelClass} overflow-hidden`}>
                        <div className="flex flex-col gap-4 border-b border-white/10 bg-black/15 px-5 py-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="text-base font-semibold text-white">{selectedModel.title}</div>
                                <div className="mt-1 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-[#cabfd7]">
                                    <span className={`h-2 w-2 rounded-full ${loading ? 'bg-[#dcc395] shadow-[0_0_10px_rgba(220,195,149,0.8)]' : 'bg-[#8c7ab8] shadow-[0_0_10px_rgba(140,122,184,0.8)]'}`} />
                                    {loading ? 'Loading model' : 'Model ready'}
                                </div>
                            </div>

                            <div className="flex items-center gap-3" aria-label="Model loading progress">
                                <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-[linear-gradient(90deg,#c8a46a_0%,#f0dec0_100%)] transition-[width] duration-200"
                                        style={{ width: `${Math.max(4, progressPercent)}%` }}
                                    />
                                </div>
                                <span className="min-w-8 text-right text-xs uppercase tracking-[0.14em] text-[#cabfd7]">
                                    {progressPercent}%
                                </span>
                            </div>
                        </div>

                        <div className="h-[58vh] lg:h-[70vh] lg:max-h-[680px]">
                            <IFCViewer
                                ifcUrl={selectedModel.url}
                                onProgress={setProgress}
                                onLoadStateChange={setLoading}
                                onError={setError}
                            />
                        </div>

                        <div className="flex flex-col gap-2 border-t border-white/10 bg-black/15 px-5 py-3 text-sm text-[#d3cadf] md:flex-row md:items-center">
                            <span className="inline-flex w-fit items-center rounded-full border border-[#c8a46a]/25 bg-[#c8a46a]/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[#dcc395]">
                                Live demo
                            </span>
                            <span>
                                Shift + click multi-select, inspect IFC properties, batch color elements, and reset all changes in one step.
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`${panelClass} mt-6 p-5 md:p-6`}>
                    <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[#c8b6df]">What this demonstrates</p>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {features.map((feature) => (
                            <div key={feature.label} className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
                                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c8a46a]/20 bg-[#c8a46a]/10 text-[#dcc395]">
                                    {feature.icon}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">{feature.label}</div>
                                    <div className="mt-1 text-sm leading-5 text-[#cbbfd8]">{feature.detail}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 rounded-[2rem] border border-[#c8a46a]/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(200,164,106,0.08))] px-6 py-7 backdrop-blur-sm md:px-8">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#c8b6df]">For clients</p>
                    <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight text-white md:text-4xl">
                        BIM data can live inside the sales site, not outside it.
                    </h2>
                    <p className="mt-4 max-w-4xl text-base leading-7 text-[#d3cadf]">
                        Hipposoft can embed navigable BIM directly into a website, turning an IFC file into something clients,
                        investors, and contractors can actually explore without leaving the browser.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ViewerWrapper;
