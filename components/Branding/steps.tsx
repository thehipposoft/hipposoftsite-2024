'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ScaleRow, SafeImage, StepHeader, TextField } from '@/components/Wizard/fields';
import {
    BUCKETS, FONT_SAMPLES, LOGO_STYLES, MAX_STARS, REACTIONS, SCALE_POINTS, SLIDERS, VALUE_WORDS,
    type Bucket, type BrandingData, type Reaction, type ValueWord,
} from './data';

export type Update = <K extends keyof BrandingData>(key: K, value: BrandingData[K]) => void;
export interface StepProps { data: BrandingData; update: Update; eyebrow: string }

// ─── 1. Intro ────────────────────────────────────────────────────────────────

export function StepIntro({ data, update, eyebrow, errors }: StepProps & { errors: Partial<Record<'full_name' | 'email', string>> }) {
    const t = useTranslations('BrandingForm');
    return (
        <div className="flex flex-col gap-10">
            <StepHeader eyebrow={eyebrow} title={t('intro_title')} subtitle={t('intro_subtitle')} />
            <div className="flex flex-col gap-7">
                <TextField id="full_name" label={t('intro_full_name')} value={data.full_name}
                    onChange={(v) => update('full_name', v)} required error={errors.full_name} autoComplete="name" />
                <TextField id="email" type="email" label={t('intro_email')} value={data.email}
                    onChange={(v) => update('email', v)} required error={errors.email} autoComplete="email" />
                <TextField id="company_name" label={t('intro_company')} hint={t('intro_company_hint')} value={data.company_name}
                    onChange={(v) => update('company_name', v)} autoComplete="organization" />
            </div>
        </div>
    );
}

// ─── 2. What does your company do? ───────────────────────────────────────────

export function StepCompany({ data, update, eyebrow }: StepProps) {
    const t = useTranslations('BrandingForm');
    return (
        <div className="flex flex-col gap-10">
            <StepHeader eyebrow={eyebrow} title={t('company_title')} subtitle={t('company_subtitle')} />
            <TextField id="company_description" label={t('company_label')} multiline rows={5}
                value={data.company_description} onChange={(v) => update('company_description', v)} />
        </div>
    );
}

// ─── 3. Top 3 values & beliefs ───────────────────────────────────────────────

export function StepValuesBeliefs({ data, update, eyebrow }: StepProps) {
    const t = useTranslations('BrandingForm');
    const set = (i: number, key: 'title' | 'description', v: string) =>
        update('values_beliefs', data.values_beliefs.map((item, j) => (j === i ? { ...item, [key]: v } : item)));
    return (
        <div className="flex flex-col gap-10">
            <StepHeader eyebrow={eyebrow} title={t('beliefs_title')} subtitle={t('beliefs_subtitle')} />
            <ol className="flex flex-col gap-8">
                {data.values_beliefs.map((item, i) => (
                    <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-purple text-white text-[14px] font-semibold flex items-center justify-center mt-1">
                            {i + 1}
                        </span>
                        <div className="flex-1 flex flex-col gap-5">
                            <TextField id={`belief_title_${i}`} label={`${t('beliefs_value_label')} ${i + 1}`} hideLabel
                                value={item.title} onChange={(v) => set(i, 'title', v)} />
                            <TextField id={`belief_desc_${i}`} label={t('beliefs_why_label')} multiline rows={2}
                                value={item.description} onChange={(v) => set(i, 'description', v)} />
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

// ─── 4. Ideal clients ────────────────────────────────────────────────────────

export function StepIdealClients({ data, update, eyebrow }: StepProps) {
    const t = useTranslations('BrandingForm');
    return (
        <div className="flex flex-col gap-10">
            <StepHeader eyebrow={eyebrow} title={t('clients_title')} subtitle={t('clients_subtitle')} />
            <div className="flex flex-col gap-7">
                {data.ideal_clients.map((value, i) => (
                    <TextField key={i} id={`client_${i}`} label={t('clients_label', { n: i + 1 })} multiline rows={2}
                        value={value}
                        onChange={(v) => update('ideal_clients', data.ideal_clients.map((c, j) => (j === i ? v : c)))} />
                ))}
            </div>
        </div>
    );
}

// ─── 5. Personality sliders ──────────────────────────────────────────────────

export function StepPersonality({ data, update, eyebrow }: StepProps) {
    const t = useTranslations('BrandingForm');
    return (
        <div className="flex flex-col gap-10">
            <StepHeader eyebrow={eyebrow} title={t('personality_title')} subtitle={t('personality_subtitle')} />
            <div className="flex flex-col gap-9 md:gap-7">
                {SLIDERS.map((id) => (
                    <ScaleRow
                        key={id}
                        left={t(`slider_${id}_left`)}
                        right={t(`slider_${id}_right`)}
                        points={SCALE_POINTS}
                        value={data.personality[id]}
                        pointLabel={(n) => t('slider_point', { n, total: SCALE_POINTS })}
                        onChange={(v) => {
                            const next = { ...data.personality };
                            if (v === undefined) delete next[id]; else next[id] = v;
                            update('personality', next);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── 6. Competition ──────────────────────────────────────────────────────────

const MAX_COMPETITORS = 8;

export function StepCompetition({ data, update, eyebrow }: StepProps) {
    const t = useTranslations('BrandingForm');
    const list = data.competition;
    const set = (i: number, key: 'name' | 'url', v: string) =>
        update('competition', list.map((c, j) => (j === i ? { ...c, [key]: v } : c)));
    return (
        <div className="flex flex-col gap-10">
            <StepHeader eyebrow={eyebrow} title={t('competition_title')} subtitle={t('competition_subtitle')} />
            <div className="flex flex-col gap-6">
                {list.map((c, i) => (
                    <div key={i} className="relative flex flex-col gap-4 rounded-xl border border-[#e5e7eb] p-4 md:p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-[#6b7280]">
                                {t('competition_item', { n: i + 1 })}
                            </span>
                            {list.length > 1 && (
                                <button type="button" onClick={() => update('competition', list.filter((_, j) => j !== i))}
                                    className="text-[13px] text-[#6b7280] underline underline-offset-2 hover:text-red-500 py-1">
                                    {t('competition_remove')}
                                </button>
                            )}
                        </div>
                        <TextField id={`comp_name_${i}`} label={t('competition_name')} value={c.name} onChange={(v) => set(i, 'name', v)} />
                        <TextField id={`comp_url_${i}`} type="url" label={t('competition_url')} placeholder="https://"
                            value={c.url} onChange={(v) => set(i, 'url', v)} />
                    </div>
                ))}
                {list.length < MAX_COMPETITORS && (
                    <button type="button" onClick={() => update('competition', [...list, { name: '', url: '' }])}
                        className="self-start h-11 px-5 rounded-full border border-dashed border-[#221b35]/40 text-[14px] text-[#221b35] hover:border-[#221b35] hover:bg-[#221b35]/5 transition-colors">
                        + {t('competition_add')}
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── 7. Values by priority ───────────────────────────────────────────────────

const BUCKET_STYLE: Record<Bucket, string> = {
    most_important: 'bg-[#F4511E] border-[#F4511E]',
    important: 'bg-[#FFC700] border-[#FFC700]',
    less_important: 'bg-[#EEEEEE] border-[#EEEEEE]',
    exclude: 'bg-white border-[#d1d5db] border-dashed',
};

function ValueChip({ word, label, selected, onToggle }: { word: ValueWord; label: string; selected: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', word)}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            aria-pressed={selected}
            className={`h-10 px-4 rounded-full text-[15px] font-semibold transition-all duration-150 cursor-grab active:cursor-grabbing
                ${selected ? 'bg-brand-purple text-white ring-4 ring-brand-purple/20 scale-105' : 'bg-white text-[#1a2340] shadow-sm border border-black/10 hover:border-brand-purple'}`}
        >
            {label}
        </button>
    );
}

export function StepValuesPriority({ data, update, eyebrow }: StepProps) {
    const t = useTranslations('BrandingForm');
    const [selected, setSelected] = useState<ValueWord | null>(null);
    const assignments = data.values_priority;

    const move = (word: ValueWord, bucket: Bucket | null) => {
        const next = { ...assignments };
        if (bucket) next[word] = bucket; else delete next[word];
        update('values_priority', next);
        setSelected(null);
    };

    const dropProps = (bucket: Bucket | null) => ({
        onDragOver: (e: React.DragEvent) => e.preventDefault(),
        onDrop: (e: React.DragEvent) => {
            e.preventDefault();
            const word = e.dataTransfer.getData('text/plain') as ValueWord;
            if ((VALUE_WORDS as readonly string[]).includes(word)) move(word, bucket);
        },
    });

    const chip = (word: ValueWord) => (
        <ValueChip key={word} label={t(`word_${word}`)} word={word} selected={selected === word}
            onToggle={() => setSelected(selected === word ? null : word)} />
    );

    const pool = VALUE_WORDS.filter((w) => !assignments[w]);

    return (
        <div className="flex flex-col gap-8">
            <StepHeader eyebrow={eyebrow} title={t('priority_title')} subtitle={t('priority_subtitle')} />

            <p className="text-[13px] text-[#6b7280] -mt-4" aria-live="polite">
                {selected ? t('priority_hint_selected', { word: t(`word_${selected}`) }) : t('priority_hint')}
            </p>

            {/* Unassigned words */}
            <div
                {...dropProps(null)}
                onClick={() => selected && assignments[selected] && move(selected, null)}
                className={`rounded-2xl border-2 border-dashed p-4 min-h-[88px] transition-colors
                    ${selected && assignments[selected] ? 'border-brand-purple bg-brand-purple/5 cursor-pointer' : 'border-[#e5e7eb]'}`}
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-[#6b7280]">
                        {t('priority_pool', { n: pool.length })}
                    </span>
                    {selected && assignments[selected] && (
                        <span className="text-[12px] text-brand-purple font-semibold">{t('priority_return_here')}</span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {pool.map(chip)}
                    {pool.length === 0 && <span className="text-[14px] text-[#9ca3af]">{t('priority_pool_empty')}</span>}
                </div>
            </div>

            {/* Buckets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {BUCKETS.map((bucket) => {
                    const words = VALUE_WORDS.filter((w) => assignments[w] === bucket);
                    const canDrop = selected !== null && assignments[selected] !== bucket;
                    return (
                        <div
                            key={bucket}
                            {...dropProps(bucket)}
                            onClick={() => canDrop && move(selected!, bucket)}
                            className={`rounded-2xl border-2 p-4 min-h-[120px] md:min-h-[160px] transition-all ${BUCKET_STYLE[bucket]}
                                ${canDrop ? 'cursor-pointer ring-2 ring-offset-2 ring-brand-purple/60' : ''}`}
                        >
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <span className={`text-[14px] ${bucket === 'most_important' ? 'font-bold' : 'font-medium'} text-[#1a2340]`}>
                                    {t(`bucket_${bucket}`)}
                                </span>
                                {canDrop && (
                                    <button type="button" onClick={(e) => { e.stopPropagation(); move(selected!, bucket); }}
                                        className="h-8 px-3 rounded-full bg-brand-purple text-white text-[12px] font-semibold">
                                        {t('priority_move_here')}
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {words.map(chip)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── 8. Logo style ───────────────────────────────────────────────────────────

const REACTION_STYLE: Record<Reaction, string> = {
    love: 'bg-[#F4511E] text-white border-[#F4511E]',
    like: 'bg-cyan text-[#1a2340] border-cyan',
    no: 'bg-[#1a2340] text-white border-[#1a2340]',
};

function ReactionIcon({ reaction }: { reaction: Reaction }) {
    if (reaction === 'love') {
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.6 4.5c2 0 3.6 1.1 4.4 2.6.8-1.5 2.4-2.6 4.4-2.6 3.6 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" />
            </svg>
        );
    }
    if (reaction === 'like') {
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 10v11M7 10l4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.3 8A2 2 0 0 1 18.2 21H7" /><path d="M3 10h4v11H3z" />
            </svg>
        );
    }
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

export function StepLogoStyle({ data, update, eyebrow }: StepProps) {
    const t = useTranslations('BrandingForm');
    const setReaction = (id: (typeof LOGO_STYLES)[number]['id'], r: Reaction) => {
        const next = { ...data.logo_styles };
        if (next[id] === r) delete next[id]; else next[id] = r;
        update('logo_styles', next);
    };
    return (
        <div className="flex flex-col gap-8">
            <StepHeader eyebrow={eyebrow} title={t('logo_title')} subtitle={t('logo_subtitle')} />
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-[#6b7280] -mt-2">
                {REACTIONS.map((r) => (
                    <li key={r} className="flex items-center gap-1.5"><ReactionIcon reaction={r} /> {t(`reaction_${r}`)}</li>
                ))}
            </ul>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {LOGO_STYLES.map((logo) => {
                    const label = t(`logo_${logo.id}`);
                    const current = data.logo_styles[logo.id];
                    return (
                        <figure key={logo.id}
                            className={`flex flex-col rounded-2xl border-2 overflow-hidden bg-white transition-colors ${current === 'love' ? 'border-[#F4511E]' : current === 'like' ? 'border-cyan' : current === 'no' ? 'border-[#1a2340]/30 opacity-60' : 'border-[#eef0f3]'}`}>
                            <div className="relative aspect-[4/3] bg-[#fafafa]">
                                <SafeImage
                                    src={logo.image}
                                    alt={label}
                                    sizes="(min-width: 1030px) 300px, 50vw"
                                    fallback={<div className="absolute inset-0 flex items-center justify-center text-[13px] text-[#9ca3af] p-3 text-center">{t('image_missing')}</div>}
                                />
                            </div>
                            <figcaption className="flex flex-col gap-2 p-2.5 md:p-3">
                                <span className="text-[14px] font-semibold text-[#1a2340] leading-tight">{label}</span>
                                <div className="grid grid-cols-3 gap-1.5" role="group" aria-label={label}>
                                    {REACTIONS.map((r) => (
                                        <button key={r} type="button" onClick={() => setReaction(logo.id, r)}
                                            aria-pressed={current === r} aria-label={t(`reaction_${r}`)} title={t(`reaction_${r}`)}
                                            className={`h-10 rounded-lg border flex items-center justify-center transition-colors ${current === r ? REACTION_STYLE[r] : 'border-[#e5e7eb] text-[#6b7280] hover:border-[#1a2340]'}`}>
                                            <ReactionIcon reaction={r} />
                                        </button>
                                    ))}
                                </div>
                            </figcaption>
                        </figure>
                    );
                })}
            </div>
            <TextField id="logo_comment" label={t('comment_label')} multiline rows={3}
                value={data.logo_comment} onChange={(v) => update('logo_comment', v)} />
        </div>
    );
}

// ─── 9. Font style ───────────────────────────────────────────────────────────

function Star({ filled }: { filled: boolean }) {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden
            fill={filled ? '#FFC700' : 'none'} stroke={filled ? '#FFC700' : '#c4c8cf'} strokeWidth="1.8" strokeLinejoin="round">
            <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" />
        </svg>
    );
}

export function StepFontStyle({ data, update, eyebrow }: StepProps) {
    const t = useTranslations('BrandingForm');
    const setStars = (id: string, n: number) => {
        const next = { ...data.font_styles };
        if (next[id] === n) delete next[id]; else next[id] = n;
        update('font_styles', next);
    };
    return (
        <div className="flex flex-col gap-8">
            <StepHeader eyebrow={eyebrow} title={t('font_title')} subtitle={t('font_subtitle')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {FONT_SAMPLES.map((font) => {
                    const stars = data.font_styles[font.id] ?? 0;
                    const label = t('font_sample', { n: font.number });
                    return (
                        <figure key={font.id}
                            className={`flex flex-col rounded-2xl border-2 overflow-hidden bg-white transition-colors ${stars ? 'border-[#FFC700]' : 'border-[#eef0f3]'}`}>
                            <div className="relative aspect-[4/1] bg-[#fafafa] m-2 rounded-lg overflow-hidden">
                                <SafeImage
                                    src={font.image}
                                    alt={label}
                                    sizes="(min-width: 1030px) 340px, (min-width: 768px) 50vw, 100vw"
                                    fallback={<div className="absolute inset-0 flex items-center justify-center text-[13px] text-[#9ca3af]">{t('image_missing')}</div>}
                                />
                            </div>
                            <figcaption className="flex items-center justify-between gap-2 px-3 pb-2">
                                <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#6b7280]">{label}</span>
                                <div className="flex" role="radiogroup" aria-label={label}>
                                    {Array.from({ length: MAX_STARS }, (_, i) => i + 1).map((n) => (
                                        <button key={n} type="button" role="radio" aria-checked={stars === n}
                                            aria-label={t('font_stars', { n })} onClick={() => setStars(font.id, n)}
                                            className="w-9 h-10 flex items-center justify-center">
                                            <Star filled={n <= stars} />
                                        </button>
                                    ))}
                                </div>
                            </figcaption>
                        </figure>
                    );
                })}
            </div>
            <TextField id="font_comment" label={t('comment_label')} multiline rows={3}
                value={data.font_comment} onChange={(v) => update('font_comment', v)} />
        </div>
    );
}
