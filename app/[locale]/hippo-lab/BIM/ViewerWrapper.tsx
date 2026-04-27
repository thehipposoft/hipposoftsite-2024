'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import IFCViewer from './IFCViewer-new';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ViewerMode = 'measure' | 'inspect' | 'multiselect';

type Demo = {
    id: ViewerMode;
    number: string;
    label: string;
    headline: string;
    description: string;
    steps: string[];
    modelUrl: string;
    modelName: string;
};

type CustomIfcModel = {
    url: string;
    name: string;
    sizeLabel: string;
};

// ---------------------------------------------------------------------------
// Demo definitions — one model + one focused BIM capability per tab
// ---------------------------------------------------------------------------

const demos: Demo[] = [
    {
        id: 'measure',
        number: '01',
        label: 'Measure',
        headline: 'Measure anything, instantly.',
        description:
            'Click any two points on the model to get an accurate distance. No BIM software, no plugins — just your browser.',
        steps: ['Click any surface to set the first point', 'Click a second point to complete the segment', 'Read the distance in the panel'],
        modelUrl: '/models/granny-flat.ifc',
        modelName: 'Residential Unit',
    },
    {
        id: 'inspect',
        number: '02',
        label: 'Inspect',
        headline: 'Every element tells a story.',
        description:
            'Click any wall, slab, or fitting to surface the IFC data inside — materials, fire ratings, areas, and more.',
        steps: ['Click any element in the model', 'Review its BIM data in the panel', 'See material, fire rating, area and more'],
        modelUrl: '/models/Ifc_SampleHouse.ifc',
        modelName: 'Hotel Payogastilla',
    },
    {
        id: 'multiselect',
        number: '03',
        label: 'Multi-select',
        headline: 'Group, compare, present.',
        description:
            'Shift-click to select multiple elements at once. Walk clients through a structural system, a floor plate, or a set of rooms.',
        steps: ['Click any element to select it', 'Shift+click to add more to the group', 'See all selected elements listed in the panel'],
        modelUrl: '/models/Ifc_SampleCastle.ifc',
        modelName: 'Residential Unit',
    },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ViewerWrapper = () => {
    const [activeDemoId, setActiveDemoId] = useState<ViewerMode>('measure');
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customModel, setCustomModel] = useState<CustomIfcModel | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const activeDemo = useMemo(
        () => demos.find((d) => d.id === activeDemoId) ?? demos[0],
        [activeDemoId]
    );

    const activeDemoIdx = demos.findIndex((d) => d.id === activeDemoId);
    const progressPercent = Math.round(progress * 100);
    const activeModelUrl = customModel?.url ?? activeDemo.modelUrl;
    const activeModelName = customModel ? `${customModel.name} · Custom IFC` : activeDemo.modelName;

    const handleTabChange = (id: ViewerMode) => {
        if (id === activeDemoId) return;
        setActiveDemoId(id);
        setError(null);
        setProgress(0);
    };

    useEffect(() => {
        return () => {
            if (customModel?.url) {
                URL.revokeObjectURL(customModel.url);
            }
        };
    }, [customModel]);

    const handleCustomIfcUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;

        const isIfc =
            file.name.toLowerCase().endsWith('.ifc') ||
            file.type.toLowerCase().includes('ifc') ||
            file.type === '';

        if (!isIfc) {
            setError('Please select a valid IFC file (.ifc).');
            return;
        }

        const url = URL.createObjectURL(file);
        setCustomModel((previous) => {
            if (previous?.url) {
                URL.revokeObjectURL(previous.url);
            }

            return {
                url,
                name: file.name.replace(/\.ifc$/i, '') || 'Custom model',
                sizeLabel: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            };
        });

        setError(null);
        setProgress(0);
    };

    return (
        <>
            {/* ── Root ── */}
            <div
                className="[font-family:'Sora',sans-serif] bg-[#09141a] text-[#cde4ea] min-h-[calc(100vh-100px)] px-5 pt-[52px] pb-[72px] relative overflow-hidden"
            >
                {/* Background decorations */}
                <div className="absolute top-[-25%] left-[-12%] w-[70%] h-[70%] bg-[radial-gradient(ellipse,rgba(83,210,220,0.055)_0%,transparent_65%)] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-8%] w-[55%] h-[60%] bg-[radial-gradient(ellipse,rgba(240,160,87,0.045)_0%,transparent_65%)] pointer-events-none" />
                <div className="absolute inset-0 [background-image:linear-gradient(rgba(83,210,220,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(83,210,220,0.025)_1px,transparent_1px)] [background-size:52px_52px] pointer-events-none" />

                <div className="relative z-[1] max-w-[1320px] mx-auto">

                    {/* ── Header ── */}
                    <header className="mb-[52px]">
                        <div className="inline-flex items-center gap-2 font-mono text-[0.67rem] tracking-[0.16em] uppercase text-[#53d2dc] mb-[18px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#53d2dc] shadow-[0_0_10px_#53d2dc] animate-pulse" />
                            BIM on the web · Live demos
                        </div>
                        <h1 className="[font-family:'Sora',sans-serif] text-[clamp(2.4rem,4.8vw,4rem)] font-normal leading-[1.06] text-[#dff0f4] m-0 mb-4 max-w-[680px]">
                            Your models,<br /><em className="text-[#53d2dc]">alive on the web.</em>
                        </h1>
                        <p className="text-base leading-[1.65] text-[#567a84] max-w-[520px] m-0">
                            Show clients what their building actually contains — not a PDF, not a render.
                            Interactive BIM, embedded directly on your website.
                        </p>
                    </header>

                    {/* ── Tabs ── */}
                    <nav className="flex flex-wrap items-center border border-white/[0.07] rounded-[14px] bg-[#112230] p-[5px] w-fit gap-1.5 mb-9">
                        {demos.map((demo) => {
                            const isActive = activeDemoId === demo.id;
                            return (
                                <button
                                    key={demo.id}
                                    type="button"
                                    className={[
                                        'flex items-center gap-[9px] px-[22px] py-[10px] rounded-[10px] border',
                                        "[font-family:'Sora',sans-serif] text-[0.88rem] font-medium whitespace-nowrap",
                                        'cursor-pointer transition-all duration-[180ms] ease-[ease]',
                                        isActive
                                            ? 'bg-[#09141a] border-[rgba(83,210,220,0.28)] text-[#53d2dc] shadow-[0_0_20px_rgba(83,210,220,0.08)]'
                                            : 'border-transparent bg-transparent text-[#567a84] hover:text-[#cde4ea] hover:bg-white/[0.04]',
                                    ].join(' ')}
                                    onClick={() => handleTabChange(demo.id)}
                                >
                                    <span className="font-mono text-[0.62rem] tracking-[0.06em] opacity-50">
                                        {demo.number}
                                    </span>
                                    {demo.label}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="ml-1 rounded-[10px] border border-[rgba(83,210,220,0.28)] px-3 py-[10px] text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#53d2dc] transition hover:border-[#7ce8f0] hover:text-[#7ce8f0]"
                        >
                            <span className='border rounded-full px-1'>+</span> Add custom .ifc
                        </button>

                    </nav>

                    {/* ── Two-column layout ── */}
                    <div className="grid grid-cols-1 gap-6 items-start lg:grid-cols-[1fr_360px]">

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".ifc"
                            className="hidden"
                            onChange={handleCustomIfcUpload}
                        />

                        {/* ── Viewer card ── */}
                        <div className="border border-white/[0.07] rounded-2xl overflow-hidden bg-[#112230] flex flex-col h-full">

                            {/* Top bar */}
                            <div className="flex items-center justify-between gap-3 px-[18px] py-3 bg-[#0d1e26] border-b border-white/[0.07] shrink-0">
                                <div>
                                    <span className="text-[0.88rem] font-semibold text-[#d8eef3] block">{activeModelName}</span>
                                    <span className="flex items-center gap-[5px] font-mono text-[0.62rem] tracking-[0.08em] text-[#567a84]">
                                        <span className={[
                                            'w-[5px] h-[5px] rounded-full shrink-0',
                                            loading
                                                ? 'bg-[#f0a057] shadow-[0_0_6px_#f0a057] animate-pulse'
                                                : 'bg-[#53d2dc] shadow-[0_0_6px_#53d2dc]',
                                        ].join(' ')} />
                                        {loading ? 'Loading geometry…' : 'Ready'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-[120px] h-[2px] bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#53d2dc] to-[#a8f0f8] rounded-full transition-[width] duration-200 shadow-[0_0_8px_rgba(83,210,220,0.6)]"
                                            style={{ width: `${Math.max(4, progressPercent)}%` }}
                                        />
                                    </div>
                                    <span className="font-mono text-[0.62rem] text-[#567a84] min-w-[28px] text-right">
                                        {progressPercent}%
                                    </span>
                                </div>
                            </div>

                            {/* Canvas */}
                            <div className="h-[56vh] flex-1 lg:h-[min(68vh,660px)]">
                                <IFCViewer
                                    key={`${activeDemoId}-${activeModelUrl}`}
                                    ifcUrl={activeModelUrl}
                                    mode={activeDemoId}
                                    onProgress={setProgress}
                                    onLoadStateChange={setLoading}
                                    onError={setError}
                                />
                            </div>

                            {/* Bottom bar */}
                            <div className="flex items-center gap-[10px] px-[18px] py-[9px] border-t border-white/[0.07] bg-[#0d1e26] shrink-0">
                                <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#53d2dc] bg-[rgba(83,210,220,0.08)] border border-[rgba(83,210,220,0.18)] px-2 py-[3px] rounded-[4px] whitespace-nowrap">
                                    Try it
                                </span>
                                <span className="text-[0.78rem] text-[#567a84]">
                                    {customModel ? `Custom IFC loaded (${customModel.sizeLabel})` : activeDemo.steps[0]}
                                </span>
                            </div>
                        </div>

                        {/* ── Info sidebar ── */}
                        <aside className="border border-white/[0.07] rounded-2xl bg-[#112230] overflow-hidden sticky top-6">
                            <div className="px-6 pt-7 pb-5 border-b border-white/[0.07]">
                                <span className="font-mono text-[0.63rem] tracking-[0.14em] text-[#53d2dc] block mb-3">
                                    DEMO {activeDemo.number} / 0{demos.length}
                                </span>
                                <h2 className="[font-family:'Sora',sans-serif] text-[1.6rem] font-normal leading-[1.15] text-[#dff0f4] m-0 mb-3">
                                    {activeDemo.headline}
                                </h2>
                                <p className="text-[0.88rem] leading-[1.65] text-[#567a84] m-0">
                                    {activeDemo.description}
                                </p>
                            </div>

                            <div className="px-6 pt-5 pb-6">
                                <p className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-[#567a84] m-0 mb-[10px]">
                                    How it works
                                </p>
                                <div className="flex flex-col gap-2">
                                    {activeDemo.steps.map((step) => (
                                        <div
                                            key={step}
                                            className="flex items-start gap-[10px] px-3 py-[10px] rounded-[10px] bg-white/[0.03] border border-white/[0.07] text-[0.82rem] text-[#cde4ea]"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#53d2dc] shrink-0 mt-[5px]" />
                                            {step}
                                        </div>
                                    ))}
                                </div>

                                {error && (
                                    <div className="mt-[14px] px-3 py-[10px] rounded-lg bg-[rgba(255,80,80,0.08)] border border-[rgba(255,80,80,0.2)] text-[#ff9a9a] text-[0.82rem]">
                                        {error}
                                    </div>
                                )}

                                {/* Nav buttons */}
                                <div className="flex gap-2 mt-5">
                                    <button
                                        type="button"
                                        disabled={activeDemoIdx === 0}
                                        onClick={() => handleTabChange(demos[activeDemoIdx - 1].id)}
                                        className="flex-1 px-[14px] py-[10px] rounded-[10px] border border-white/[0.07] bg-transparent text-[#567a84] [font-family:'Sora',sans-serif] text-[0.82rem] font-medium cursor-pointer transition-all duration-150 text-center disabled:opacity-[0.28] disabled:cursor-default enabled:hover:border-[rgba(83,210,220,0.28)] enabled:hover:text-[#53d2dc] enabled:hover:bg-[rgba(83,210,220,0.05)]"
                                    >
                                        ← Prev
                                    </button>
                                    <button
                                        type="button"
                                        disabled={activeDemoIdx === demos.length - 1}
                                        onClick={() => handleTabChange(demos[activeDemoIdx + 1].id)}
                                        className={[
                                            "flex-1 px-[14px] py-[10px] rounded-[10px] border [font-family:'Sora',sans-serif]",
                                            'text-[0.82rem] cursor-pointer transition-all duration-150 text-center',
                                            'disabled:opacity-[0.28] disabled:cursor-default',
                                            activeDemoIdx < demos.length - 1
                                                ? 'bg-[#53d2dc] border-[#53d2dc] text-[#09141a] font-bold enabled:hover:bg-[#7ce8f0] enabled:hover:border-[#7ce8f0] enabled:hover:shadow-[0_0_24px_rgba(83,210,220,0.3)]'
                                                : 'bg-transparent border-white/[0.07] text-[#567a84] font-medium enabled:hover:border-[rgba(83,210,220,0.28)] enabled:hover:text-[#53d2dc] enabled:hover:bg-[rgba(83,210,220,0.05)]',
                                        ].join(' ')}
                                    >
                                        Next demo →
                                    </button>
                                </div>
                            </div>
                        </aside>

                    </div>

                    {/* ── CTA strip ── */}
                    <div className="mt-14 px-10 py-9 border border-[rgba(83,210,220,0.28)] rounded-[18px] bg-[linear-gradient(135deg,rgba(83,210,220,0.06)_0%,rgba(240,160,87,0.04)_100%)] flex flex-col gap-5 items-start md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="[font-family:'Sora',sans-serif] text-[1.5rem] font-normal text-[#dff0f4] m-0">
                                Ready to embed your own model?
                            </h2>
                            <p className="text-[0.88rem] text-[#567a84] mt-1 mb-0">
                                Send us your .ifc file — we&apos;ll have it live on your site within a day.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="shrink-0 px-7 py-[13px] bg-[#53d2dc] text-[#09141a] [font-family:'Sora',sans-serif] font-bold text-[0.9rem] border-0 rounded-[10px] cursor-pointer transition-all duration-150 tracking-[0.02em] whitespace-nowrap hover:-translate-y-px hover:bg-[#7ce8f0] hover:shadow-[0_0_28px_rgba(83,210,220,0.35)]"
                        >
                            Get started →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewerWrapper;
