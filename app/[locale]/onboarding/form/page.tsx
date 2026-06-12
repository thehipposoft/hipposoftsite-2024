'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 – About You
  company_name: string;
  full_name: string;
  role: string;
  email: string;
  phone: string;

  // Step 2 – About the Business (A)
  negocio_descripcion: string;
  negocio_objetivo: string;
  negocio_problema_cliente: string;
  negocio_solucion: string;
  publico_ideal: string;

  // Step 3 – About the Business (B)
  publico_actual: string;
  competencia_principales: string;
  competencia_diferencial: string;

  // Step 4 – Project Goals
  project_type: string[];
  project_type_other: string;

  // Step 5 – Brand Identity
  identidad_esencia: string;
  identidad_fortaleza: string;
  identidad_atributos: string;
  identidad_percepciones: string;

  // Step 6 – Project Scope
  proposito_objetivo: string;
  proposito_secciones: string;
  servicios_principales: string;

  // Step 7 – Business Goals & Expectations
  metas_3anios: string;
  expectativas_agencia: string;
  expectativas_participacion: string;
  expectativas_restricciones: string;
  expectativas_resultado: string;
  info_extra: string;
}

const INITIAL_DATA: FormData = {
  company_name: '',
  full_name: '',
  role: '',
  email: '',
  phone: '',
  negocio_descripcion: '',
  negocio_objetivo: '',
  negocio_problema_cliente: '',
  negocio_solucion: '',
  publico_ideal: '',
  publico_actual: '',
  competencia_principales: '',
  competencia_diferencial: '',
  project_type: [],
  project_type_other: '',
  identidad_esencia: '',
  identidad_fortaleza: '',
  identidad_atributos: '',
  identidad_percepciones: '',
  proposito_objetivo: '',
  proposito_secciones: '',
  servicios_principales: '',
  metas_3anios: '',
  expectativas_agencia: '',
  expectativas_participacion: '',
  expectativas_restricciones: '',
  expectativas_resultado: '',
  info_extra: '',
};

const PROJECT_TYPES = ['Branding', 'Rebranding', 'Website', 'Improve automation in my business'];

const TOTAL_STEPS = 5;

// ─── WP config ───────────────────────────────────────────────────────────────

const WP_ENDPOINT = 'https://wp.thehipposoft.com/wp-json/hippo/v1/survey';
const WP_APP_USER = 'Gomi';
const WP_APP_PASS = '5lmz kemU JAKL Yw0L UnK7 Lb37';

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  type?: string;
  required?: boolean;
}

function InputField({ label, name, value, onChange, type = 'text', required }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[15px] text-[#1a2340] font-normal">
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(name, e.target.value)}
        className="
          w-full bg-transparent border-0 border-b border-[#c8e6e4]
          text-[#1a2340] text-[15px] py-2 px-0
          outline-none focus:border-cyan
          transition-colors duration-200 placeholder-transparent
        "
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
}

function TextAreaField({ label, name, value, onChange }: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[15px] text-[#1a2340] font-normal">
        {label}
      </label>
      <textarea
        id={name}
        value={value}
        rows={2}
        onChange={(e) => onChange(name, e.target.value)}
        className="
          w-full bg-transparent border-0 border-b border-[#c8e6e4]
          text-[#1a2340] text-[15px] py-2 px-0
          outline-none focus:border-cyan resize-none
          transition-colors duration-200
        "
      />
    </div>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────

function StepAboutYou({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  const t = useTranslations('OnboardingForm');
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[42px] font-bold text-[#1a2340] leading-tight">{t('step1_title')}</h1>
        <p className="text-[15px] text-[#6b7280] mt-1">{t('step1_subtitle')}</p>
      </div>
      <div className="flex flex-col gap-7">
        <InputField label={t('step1_full_name')} name="full_name" value={data.full_name} onChange={onChange} required />
        <InputField label={t('step1_company_name')} name="company_name" value={data.company_name} onChange={onChange} required />
        <InputField label={t('step1_role')} name="role" value={data.role} onChange={onChange} />
        <InputField label={t('step1_email')} name="email" value={data.email} onChange={onChange} type="email" required />
        <InputField label={t('step1_phone')} name="phone" value={data.phone} onChange={onChange} type="tel" />
      </div>
    </div>
  );
}

function StepAboutBusinessA({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  const t = useTranslations('OnboardingForm');
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[42px] font-bold text-[#1a2340] leading-tight">{t('step2_title')}</h1>
        <p className="text-[15px] text-[#6b7280] mt-1">{t('step2_subtitle')}</p>
      </div>
      <div className="flex flex-col gap-7">
        <InputField label={t('step2_description')} name="negocio_descripcion" value={data.negocio_descripcion} onChange={onChange} required />
        <InputField label={t('step2_goal')} name="negocio_objetivo" value={data.negocio_objetivo} onChange={onChange} />
        <InputField label={t('step2_problem')} name="negocio_problema_cliente" value={data.negocio_problema_cliente} onChange={onChange} />
        <InputField label={t('step2_solution')} name="negocio_solucion" value={data.negocio_solucion} onChange={onChange} />
        <InputField label={t('step2_ideal_client')} name="publico_ideal" value={data.publico_ideal} onChange={onChange} />
      </div>
    </div>
  );
}

function StepAboutBusinessB({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  const t = useTranslations('OnboardingForm');
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[42px] font-bold text-[#1a2340] leading-tight">{t('step2_title')}</h1>
        <p className="text-[15px] text-[#6b7280] mt-1">{t('step2_subtitle')}</p>
      </div>
      <div className="flex flex-col gap-7">
        <InputField label={t('step3_current_target')} name="publico_actual" value={data.publico_actual} onChange={onChange} />
        <InputField label={t('step3_competitors')} name="competencia_principales" value={data.competencia_principales} onChange={onChange} />
        <InputField label={t('step3_differentiator')} name="competencia_diferencial" value={data.competencia_diferencial} onChange={onChange} />
      </div>
    </div>
  );
}

function StepProjectGoals({ data, onChange, onToggleType }: {
  data: FormData;
  onChange: (k: keyof FormData, v: string) => void;
  onToggleType: (value: string) => void;
}) {
  const t = useTranslations('OnboardingForm');
  const typeLabels: Record<string, string> = {
    'Branding': t('step4_type_branding'),
    'Rebranding': t('step4_type_rebranding'),
    'Website': t('step4_type_website'),
    'Improve automation in my business': t('step4_type_automation'),
  };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[42px] font-bold text-[#1a2340] leading-tight">{t('step4_title')}</h1>
        <p className="text-[15px] text-[#6b7280] mt-1">{t('step4_subtitle')}</p>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-[15px] text-[#1a2340]">{t('step4_reason')}</p>
        <div className="flex flex-col gap-2">
          {PROJECT_TYPES.map((type) => {
            const selected = data.project_type.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => onToggleType(type)}
                className={`
                  flex items-center justify-between w-full px-5 py-4 rounded-lg border text-left
                  text-[15px] text-[#1a2340] transition-all duration-150
                  ${selected
                    ? 'border-[#221b35] bg-[#221b35]/5'
                    : 'border-[#e5e7eb] bg-white hover:border-[#221b35]/50'
                  }
                `}
              >
                {typeLabels[type]}
                <span className={`
                  w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all
                  ${selected ? 'border-[#221b35] bg-[#221b35]' : 'border-[#d1d5db]'}
                `}>
                  {selected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2">
          <InputField label={t('step4_other')} name="project_type_other" value={data.project_type_other} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function _StepBrandIdentity({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[42px] font-bold text-[#1a2340] leading-tight">Brand Identity</h1>
        <p className="text-[15px] text-[#6b7280] mt-1">How does your brand show up today?</p>
      </div>
      <div className="flex flex-col gap-7">
        <TextAreaField label="How would you describe your brand's current essence? What does it communicate today?" name="identidad_esencia" value={data.identidad_esencia} onChange={onChange} />
        <TextAreaField label="What do you see as the brand's main strength right now?" name="identidad_fortaleza" value={data.identidad_fortaleza} onChange={onChange} />
        <InputField label="Which brand attributes do you want to keep no matter what? (e.g. Trust, tradition, quality)" name="identidad_atributos" value={data.identidad_atributos} onChange={onChange} />
        <TextAreaField label="What image or perception do clients or professionals have of your brand today?" name="identidad_percepciones" value={data.identidad_percepciones} onChange={onChange} />
      </div>
    </div>
  );
}

function _StepProjectScope({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[42px] font-bold text-[#1a2340] leading-tight">Project Scope</h1>
        <p className="text-[15px] text-[#6b7280] mt-1">Let's define what we're building</p>
      </div>
      <div className="flex flex-col gap-7">
        <TextAreaField label="What is the main goal of the website?" name="proposito_objetivo" value={data.proposito_objetivo} onChange={onChange} />
        <InputField label="Which sections are you looking for? (e.g. Home, About, Services, Contact)" name="proposito_secciones" value={data.proposito_secciones} onChange={onChange} />
        <TextAreaField label="Which products or services are most important today?" name="servicios_principales" value={data.servicios_principales} onChange={onChange} />
      </div>
    </div>
  );
}

function StepExpectations({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  const t = useTranslations('OnboardingForm');
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[42px] font-bold text-[#1a2340] leading-tight">{t('step5_title')}</h1>
        <p className="text-[15px] text-[#6b7280] mt-1">{t('step5_subtitle')}</p>
      </div>
      <div className="flex flex-col gap-7">
        <TextAreaField label={t('step5_goals3y')} name="metas_3anios" value={data.metas_3anios} onChange={onChange} />
        <TextAreaField label={t('step5_agency_expectations')} name="expectativas_agencia" value={data.expectativas_agencia} onChange={onChange} />
        <InputField label={t('step5_involvement')} name="expectativas_participacion" value={data.expectativas_participacion} onChange={onChange} />
        <TextAreaField label={t('step5_constraints')} name="expectativas_restricciones" value={data.expectativas_restricciones} onChange={onChange} />
        <TextAreaField label={t('step5_result')} name="expectativas_resultado" value={data.expectativas_resultado} onChange={onChange} />
        <TextAreaField label={t('step5_extra')} name="info_extra" value={data.info_extra} onChange={onChange} />
      </div>
    </div>
  );
}

// ─── Progress indicator ───────────────────────────────────────────────────────

function ProgressIndicator({ step, total }: { step: number; total: number }) {
  const t = useTranslations('OnboardingForm');
  const pct = Math.round((step / total) * 100);

  return (
    <div className="relative h-10 w-48 rounded-full bg-[#f3f4f6] overflow-hidden select-none">
      <div
        className="absolute inset-0 rounded-full bg-cyan transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1a2340]">
        {t('progress', { pct })}
      </span>
    </div>
  );
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-[3px] select-none">
      {['S','C','R','O','L','L'].map((l, i) => (
        <span key={i} className="text-[10px] font-semibold tracking-wider text-cyan leading-none">{l}</span>
      ))}
      <svg className="mt-1 text-cyan" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1v10M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectSurveyForm() {
  const t = useTranslations('OnboardingForm');
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (name: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleType = (value: string) => {
    setData((prev) => ({
      ...prev,
      project_type: prev.project_type.includes(value)
        ? prev.project_type.filter((t) => t !== value)
        : [...prev.project_type, value],
    }));
  };

  const next = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };

  const prev = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        ...data,
        project_type: data.project_type.join(', '),
        client_name: data.company_name || data.full_name,
        client_email: data.email,
      };

      const res = await fetch(WP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${WP_APP_USER}:${WP_APP_PASS}`),
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitted(true);
      } else {
        throw new Error(json.message || 'Error desconocido');
      }
    } catch {
      setError(t('error_send'));
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="max-w-md text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14L11 20L23 8" stroke="#00d4c8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-[32px] font-bold text-[#1a2340]">{t('success_title')}</h2>
          <p className="text-[15px] text-[#6b7280] leading-relaxed">
            {t('success_body')}
          </p>
          <Link
            href="/"
            className="mt-2 h-10 px-6 rounded-full bg-[#221b35] flex items-center justify-center text-white text-[13px] font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 hover:text-black"
          >
            {t('back_to_home')}
          </Link>
        </div>
      </div>
    );
  }

  // ── Step renderer ──
  const renderStep = () => {
    switch (step) {
      case 1: return <StepAboutYou data={data} onChange={handleChange} />;
      case 2: return <StepAboutBusinessA data={data} onChange={handleChange} />;
      case 3: return <StepAboutBusinessB data={data} onChange={handleChange} />;
      case 4: return <StepProjectGoals data={data} onChange={handleChange} onToggleType={handleToggleType} />;
      case 5: return <StepExpectations data={data} onChange={handleChange} />;
      // Step 5 (Brand Identity) and Step 6 (Project Scope) temporarily disabled
    }
  };

  const isLastStep = step === TOTAL_STEPS;

  return (
    <div className="min-h-screen bg-white relative">

      {/* Main content */}
      <div className="max-w-[680px] mx-auto px-8 pt-20 pb-40">
        {renderStep()}
      </div>

      {/* Bottom bar — navigation + progress */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f3f4f6] px-8 py-5">
        <div className="max-w-[680px] mx-auto flex items-center justify-between">

          {/* Progress */}
          <ProgressIndicator step={step} total={TOTAL_STEPS} />

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={prev}
                className="
                  h-10 px-6 rounded-full border border-[#e5e7eb]
                  flex items-center justify-center
                  text-[#6b7280] text-[13px] font-semibold tracking-widest uppercase
                  hover:border-[#221b35] hover:text-[#221b35]
                  transition-all duration-150
                "
              >
                {t('nav_back')}
              </button>
            )}

            {!isLastStep ? (
              <button
                type="button"
                onClick={next}
                className="
                  h-10 px-6 rounded-full bg-[#333333]/40
                  flex items-center justify-center
                  text-white text-[13px] font-semibold tracking-widest uppercase
                  hover:bg-[#221b35]
                  transition-all duration-150
                "
              >
                {t('nav_next')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="
                  h-11 px-6 rounded-full bg-cyan
                  flex items-center gap-2 tracking-widest uppercase
                  text-black text-[14px] font-semibold
                  hover:opacity-90 disabled:opacity-50
                  transition-all duration-300 hover:tracking-[0.3em] hover:underline
                "
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                      <path d="M12 7a5 5 0 0 0-5-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {t('nav_sending')}
                  </>
                ) : t('nav_send')}
              </button>
            )}
          </div>

        </div>

        {/* Error message */}
        {error && (
          <p className="max-w-[680px] mx-auto mt-3 text-[13px] text-red-500">{error}</p>
        )}
      </div>

    </div>
  );
}
