'use client';

// Reusable building blocks for multi-step forms (brand discovery, onboarding…).
// Visual language follows the onboarding form: underline inputs, brand-purple
// actions, cyan accents.

import { useState } from 'react';
import Image from 'next/image';

export const INK = '#1a2340';

// ─── Step header ─────────────────────────────────────────────────────────────

export function StepHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
    return (
        <header className="flex flex-col gap-2">
            {eyebrow && (
                <span className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase text-[#6b7280]">
                    {eyebrow}
                </span>
            )}
            <h1 className="text-[30px] md:text-[42px] font-bold text-[#1a2340] leading-[1.1]">{title}</h1>
            {subtitle && <p className="text-[15px] text-[#6b7280] leading-relaxed">{subtitle}</p>}
        </header>
    );
}

// ─── Text input / textarea ───────────────────────────────────────────────────

interface TextFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: 'text' | 'email' | 'url' | 'tel';
    multiline?: boolean;
    rows?: number;
    required?: boolean;
    error?: string;
    placeholder?: string;
    autoComplete?: string;
    hint?: string;
    /** Keep the label for screen readers only. */
    hideLabel?: boolean;
}

export function TextField({
    id, label, value, onChange, type = 'text', multiline, rows = 3,
    required, error, placeholder, autoComplete, hint, hideLabel,
}: TextFieldProps) {
    const border = error ? 'border-red-400 focus:border-red-400' : 'border-[#c8e6e4] focus:border-cyan';
    const base = `w-full bg-transparent border-0 border-b-2 text-[#1a2340] text-[16px] py-2 px-0 outline-none transition-colors duration-200 placeholder:text-[#9ca3af] ${border}`;
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className={hideLabel ? 'sr-only' : 'text-[15px] text-[#1a2340]'}>
                {label}
                {required && <span className="text-red-500 ml-0.5" aria-hidden>*</span>}
            </label>
            {hint && <p className="text-[13px] text-[#6b7280]">{hint}</p>}
            {multiline ? (
                <textarea
                    id={id}
                    value={value}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    aria-invalid={!!error}
                    className={`${base} resize-none`}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    onChange={(e) => onChange(e.target.value)}
                    aria-invalid={!!error}
                    required={required}
                    className={base}
                />
            )}
            {error && <p className="text-[12px] text-red-500">{error}</p>}
        </div>
    );
}

// ─── Progress ────────────────────────────────────────────────────────────────

export function ProgressBar({ step, total, label }: { step: number; total: number; label: string }) {
    const pct = Math.round((step / total) * 100);
    return (
        <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-none">
            <div
                className="relative h-1.5 flex-1 md:w-48 md:flex-none rounded-full bg-[#eef0f3] overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
            >
                <div className="absolute inset-y-0 left-0 rounded-full bg-cyan transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6b7280] whitespace-nowrap">{label}</span>
        </div>
    );
}

// ─── Bipolar scale (personality sliders) ─────────────────────────────────────

interface ScaleRowProps {
    left: string;
    right: string;
    points: number;
    value?: number;
    onChange: (value: number | undefined) => void;
    pointLabel: (n: number) => string;
}

export function ScaleRow({ left, right, points, value, onChange, pointLabel }: ScaleRowProps) {
    return (
        <div
            role="radiogroup"
            aria-label={`${left} – ${right}`}
            className="flex flex-col gap-3 md:grid md:grid-cols-[160px_1fr_160px] md:items-center md:gap-5"
        >
            <div className="flex justify-between md:contents">
                <span className="text-[14px] md:text-[15px] font-medium text-[#1a2340] md:text-right">{left}</span>
                <span className="text-[14px] md:text-[15px] font-medium text-[#1a2340] md:order-last">{right}</span>
            </div>
            <div className="relative flex items-center justify-between h-11">
                <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-[2px] bg-[#d1d5db]" aria-hidden />
                {Array.from({ length: points }, (_, i) => i + 1).map((n) => {
                    const selected = value === n;
                    return (
                        <button
                            key={n}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            aria-label={pointLabel(n)}
                            onClick={() => onChange(selected ? undefined : n)}
                            className="relative z-10 flex items-center justify-center w-9 h-11"
                        >
                            <span
                                className={`block rounded-full transition-all duration-150 ${
                                    selected
                                        ? 'w-6 h-6 bg-[#b6f23a] ring-4 ring-[#b6f23a]/30'
                                        : 'w-3.5 h-3.5 bg-white border-2 border-[#9ca3af] hover:border-[#221b35]'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Image with graceful fallback ────────────────────────────────────────────

export function SafeImage({ src, alt, fallback, sizes }: { src: string; alt: string; fallback: React.ReactNode; sizes: string }) {
    const [failed, setFailed] = useState(false);
    if (failed) return <>{fallback}</>;
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain"
            onError={() => setFailed(true)}
        />
    );
}
