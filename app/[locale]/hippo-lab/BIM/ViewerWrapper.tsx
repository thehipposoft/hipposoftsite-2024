'use client';

import { useMemo, useState } from 'react';
import IFCViewer from './IFCViewer-new';

const models = [
    {
        id: 'granny-flat',
        title: 'Residential Unit',
        subtitle: 'Granny Flat IFC',
        url: '/models/granny-flat.ifc',
    },
    {
        id: 'hotel',
        title: 'Hospitality Project',
        subtitle: 'Hotel Payogastilla IFC',
        url: '/models/hotel-payogastilla.ifc',
    },
];

const ViewerWrapper = () => {
    const [selectedModelId, setSelectedModelId] = useState(models[0].id);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectedModel = useMemo(
        () => models.find((item) => item.id === selectedModelId) ?? models[0],
        [selectedModelId]
    );

    const progressPercent = Math.round(progress * 100);

    return (
        <section className='min-h-[calc(100vh-100px)] bg-[radial-gradient(1200px_400px_at_20%_-10%,rgba(18,105,125,0.18),transparent_60%),radial-gradient(1000px_300px_at_90%_-20%,rgba(255,162,0,0.14),transparent_65%),linear-gradient(180deg,#f9fbfc_0%,#eef4f6_100%)] px-5 pb-12 pt-8 text-[#11272d]'>
            <div className='mx-auto grid max-w-[1240px] grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]'>
                <aside className='rounded-[18px] border border-[#d7e3e7] bg-white p-5 shadow-[0_16px_50px_rgba(16,44,52,0.08)]'>
                    <p className='m-0 text-xs uppercase tracking-[0.08em] text-[#1c7c8b]'>BIM on the web</p>
                    <h1 className='mb-4 mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.05] text-[#0f2329]'>Interactive IFC embedding for client websites</h1>
                    <p className='m-0 leading-[1.55] text-[#3c5960]'>
                        Show stakeholders real geometry, spatial context, and design intent directly on your website.
                        No desktop BIM software needed.
                    </p>

                    <p className='mb-2 mt-5 text-[0.8rem] uppercase tracking-[0.08em] text-[#2a636f]'>Choose a demo model</p>
                    <div className='flex flex-col gap-2'>
                        {models.map((model) => (
                            <button
                                key={model.id}
                                type='button'
                                className={`w-full rounded-xl border px-3 py-3 text-left text-[#15323a] transition-all duration-200 ${
                                    selectedModelId === model.id
                                        ? 'border-[#1e8fa0] bg-[#e6f8fb] shadow-[inset_0_0_0_1px_rgba(30,143,160,0.32)]'
                                        : 'border-[#d4e2e6] bg-[#f4f8fa] hover:border-[#7fc2cd] hover:bg-[#effbfd]'
                                }`.trim()}
                                onClick={() => {
                                    setSelectedModelId(model.id);
                                    setError(null);
                                    setProgress(0);
                                }}
                            >
                                <strong>{model.title}</strong>
                                <div>{model.subtitle}</div>
                            </button>
                        ))}
                    </div>

                    {error && <div className='mt-3 rounded-[10px] border border-[#ffc4c4] bg-[#ffe6e6] p-2.5 text-[0.88rem] text-[#9f1e1e]'>{error}</div>}

                    <ul className='mt-4 grid list-none gap-2 p-0'>
                        <li className='rounded-xl border border-[#dde8eb] bg-[#fbfdfe] p-3 text-[0.94rem] text-[#33545c]'>Fast model loading with WASM processing</li>
                        <li className='rounded-xl border border-[#dde8eb] bg-[#fbfdfe] p-3 text-[0.94rem] text-[#33545c]'>Smooth orbit navigation for desktop and mobile</li>
                        <li className='rounded-xl border border-[#dde8eb] bg-[#fbfdfe] p-3 text-[0.94rem] text-[#33545c]'>Easy integration with existing client pages</li>
                    </ul>
                </aside>

                <div className='overflow-hidden rounded-[18px] border border-[#d4e1e6] bg-white shadow-[0_16px_50px_rgba(16,44,52,0.08)]'>
                    <div className='flex items-center justify-between gap-3 bg-[linear-gradient(90deg,#0f3944_0%,#125c6a_100%)] px-4 py-3 text-[#f1f9fc]'>
                        <div>
                            <strong>{selectedModel.title}</strong>
                            <div>{loading ? 'Loading model...' : 'Model ready'}</div>
                        </div>

                        <div className='h-1.5 w-[120px] overflow-hidden rounded-full bg-white/25 sm:w-[180px]' aria-label='Model loading progress'>
                            <div
                                className='h-full bg-[#8ef7ff] transition-[width] duration-200 ease-linear'
                                style={{ width: `${Math.max(4, progressPercent)}%` }}
                            />
                        </div>
                    </div>

                    <div className='h-[56vh] lg:h-[min(72vh,700px)]'>
                        <IFCViewer
                            ifcUrl={selectedModel.url}
                            onProgress={setProgress}
                            onLoadStateChange={setLoading}
                            onError={setError}
                        />
                    </div>

                    <div className='border-t border-[#d8e4e8] bg-[#f6fbfc] px-4 py-2.5 text-[0.9rem] text-[#3d5f66]'>
                        Interaction demo: Shift + click multi-select, inspect IFC properties, batch color elements, and save/load visual states.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewerWrapper;
