'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ProgressBar } from '@/components/Wizard/fields';
import { EMAIL_RE, INITIAL_DATA, STORAGE_KEY, buildPayload, type BrandingData } from './data';
import {
    StepCompany, StepCompetition, StepFontStyle, StepIdealClients, StepIntro,
    StepLogoStyle, StepPersonality, StepValuesBeliefs, StepValuesPriority, type Update,
} from './steps';

const TOTAL_STEPS = 9;
// Steps with image grids / buckets get a wider column.
const WIDE_STEPS = new Set([7, 8, 9]);

type IntroErrors = Partial<Record<'full_name' | 'email', string>>;

interface Saved { v: 1; step: number; data: BrandingData }

function loadSaved(): Saved | null {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Saved;
        if (parsed?.v !== 1 || typeof parsed.step !== 'number' || !parsed.data) return null;
        return parsed;
    } catch {
        return null;
    }
}

export default function BrandingWizard() {
    const t = useTranslations('BrandingForm');
    const locale = useLocale();
    const pathname = usePathname();

    const [hydrated, setHydrated] = useState(false);
    const [step, setStep] = useState(1);
    const [data, setData] = useState<BrandingData>(INITIAL_DATA);
    const [errors, setErrors] = useState<IntroErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sendError, setSendError] = useState('');

    // Restore silently after a reload (no "resume" prompt: the form is meant to be done in one go).
    useEffect(() => {
        const saved = loadSaved();
        if (saved) {
            setData({ ...INITIAL_DATA, ...saved.data });
            setStep(Math.min(Math.max(1, saved.step), TOTAL_STEPS));
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated || submitted) return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, step, data } satisfies Saved));
        } catch { /* storage unavailable: ignore */ }
    }, [hydrated, submitted, step, data]);

    useEffect(() => {
        if (hydrated) window.scrollTo({ top: 0 });
    }, [step, hydrated]);

    const update: Update = useCallback((key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
        if (key === 'full_name' || key === 'email') setErrors((e) => ({ ...e, [key]: undefined }));
    }, []);

    const validateIntro = (): boolean => {
        const next: IntroErrors = {};
        if (!data.full_name.trim()) next.full_name = t('field_required');
        if (!data.email.trim()) next.email = t('field_required');
        else if (!EMAIL_RE.test(data.email.trim())) next.email = t('field_email_invalid');
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const next = () => {
        if (step === 1 && !validateIntro()) return;
        setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    };
    const prev = () => setStep((s) => Math.max(s - 1, 1));

    const submit = async () => {
        if (!validateIntro()) { setStep(1); return; }
        setSubmitting(true);
        setSendError('');
        try {
            const res = await fetch('/api/branding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildPayload(data, locale)),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.success) throw new Error(json.message || 'send failed');
            try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
            setSubmitted(true);
            window.scrollTo({ top: 0 });
        } catch {
            setSendError(t('error_send'));
        } finally {
            setSubmitting(false);
        }
    };

    const eyebrow = t('step_of', { step, total: TOTAL_STEPS });
    const stepProps = { data, update, eyebrow };

    const renderStep = () => {
        switch (step) {
            case 1: return <StepIntro {...stepProps} errors={errors} />;
            case 2: return <StepCompany {...stepProps} />;
            case 3: return <StepValuesBeliefs {...stepProps} />;
            case 4: return <StepIdealClients {...stepProps} />;
            case 5: return <StepPersonality {...stepProps} />;
            case 6: return <StepCompetition {...stepProps} />;
            case 7: return <StepValuesPriority {...stepProps} />;
            case 8: return <StepLogoStyle {...stepProps} />;
            case 9: return <StepFontStyle {...stepProps} />;
        }
    };

    const isLast = step === TOTAL_STEPS;
    const width = WIDE_STEPS.has(step) ? 'max-w-[1040px]' : 'max-w-[680px]';

    return (
        <div className="min-h-[100dvh] bg-white text-[#1a2340]">
            {/* Top bar: logo + language */}
            <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-[#f3f4f6]">
                <div className="max-w-[1040px] mx-auto flex items-center justify-between px-4 md:px-8 h-14 md:h-16">
                    <Image src="/assets/logo.png" alt="HippoSoft" width={1144} height={451} priority className="h-7 md:h-8 w-auto" />
                    <nav className="flex items-center rounded-full bg-[#f3f4f6] p-1 text-[12px] font-semibold" aria-label={t('language')}>
                        {(['es', 'en'] as const).map((l) => (
                            <Link key={l} href={pathname} locale={l} aria-current={locale === l ? 'true' : undefined}
                                className={`px-3 h-7 flex items-center rounded-full uppercase tracking-wider transition-colors ${locale === l ? 'bg-white text-[#1a2340] shadow-sm' : 'text-[#6b7280] hover:text-[#1a2340]'}`}>
                                {l}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            {submitted ? (
                <main className="max-w-md mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                            <path d="M5 14L11 20L23 8" stroke="#1a2340" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className="text-[30px] md:text-[36px] font-bold leading-tight">{t('success_title')}</h1>
                    <p className="text-[15px] text-[#6b7280] leading-relaxed">{t('success_body')}</p>
                    <Link href="/" className="mt-2 h-11 px-6 rounded-full bg-brand-purple flex items-center justify-center text-white text-[13px] font-semibold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">
                        {t('back_to_home')}
                    </Link>
                </main>
            ) : (
                <>
                    <main className={`${width} mx-auto px-4 md:px-8 pt-8 md:pt-14 pb-44 md:pb-36 transition-opacity duration-200 ${hydrated ? 'opacity-100' : 'opacity-0'}`}>
                        {renderStep()}
                    </main>

                    {/* Bottom bar: progress + navigation */}
                    <div className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-[#f3f4f6] px-4 md:px-8 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                        <div className="max-w-[1040px] mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <ProgressBar step={step} total={TOTAL_STEPS} label={t('progress', { step, total: TOTAL_STEPS })} />
                            <div className="flex items-center gap-2">
                                {step > 1 && (
                                    <button type="button" onClick={prev}
                                        className="h-11 px-5 md:px-6 rounded-full border border-[#e5e7eb] text-[#6b7280] text-[12px] md:text-[13px] font-semibold tracking-widest uppercase hover:border-[#221b35] hover:text-[#221b35] transition-colors">
                                        {t('nav_back')}
                                    </button>
                                )}
                                {!isLast ? (
                                    <button type="button" onClick={next}
                                        className="h-11 flex-1 md:flex-none px-6 rounded-full bg-brand-purple text-white text-[12px] md:text-[13px] font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity">
                                        {t('nav_next')}
                                    </button>
                                ) : (
                                    <button type="button" onClick={submit} disabled={submitting}
                                        className="h-11 flex-1 md:flex-none px-6 rounded-full bg-cyan text-black text-[13px] md:text-[14px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity">
                                        {submitting && (
                                            <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                                                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
                                                <path d="M12 7a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        )}
                                        {submitting ? t('nav_sending') : t('nav_send')}
                                    </button>
                                )}
                            </div>
                        </div>
                        {sendError && <p className="max-w-[1040px] mx-auto mt-2 text-[13px] text-red-500" role="alert">{sendError}</p>}
                    </div>
                </>
            )}
        </div>
    );
}
