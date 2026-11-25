// Static content for the brand discovery form, taken from the
// "Brand Sprint Template" FigJam board. Labels live in messages/*.json
// under BrandingForm; ids here are what gets sent to WordPress.

export const STORAGE_KEY = 'hippo-branding-v1';

export const SLIDERS = [
    'elite_mass',
    'serious_playful',
    'conventional_rebel',
    'friend_authority',
    'classic_innovative',
] as const;
export type SliderId = (typeof SLIDERS)[number];
export const SCALE_POINTS = 7;

export const VALUE_WORDS = [
    'active', 'safe', 'creative', 'loyal', 'diverse', 'expressive',
    'interactive', 'friendly', 'teamwork', 'ecological', 'funny', 'competitive',
    'premium', 'reserved', 'technological', 'expensive', 'serious', 'classic',
] as const;
export type ValueWord = (typeof VALUE_WORDS)[number];

export const BUCKETS = ['most_important', 'important', 'less_important', 'exclude'] as const;
export type Bucket = (typeof BUCKETS)[number];

export const REACTIONS = ['love', 'like', 'no'] as const;
export type Reaction = (typeof REACTIONS)[number];

const LOGO_DIR = '/assets/images/branding/logos';
export const LOGO_STYLES = [
    { id: 'emblem', image: `${LOGO_DIR}/emblem.png` },
    { id: 'abstract', image: `${LOGO_DIR}/abstract.png` },
    { id: 'monogram', image: `${LOGO_DIR}/monogram.png` },
    { id: 'old_school', image: `${LOGO_DIR}/old-school.png` },
    { id: 'imagotype', image: `${LOGO_DIR}/imagotype.png` },
    { id: 'stamp', image: `${LOGO_DIR}/stamp.png` },
    { id: 'minimal', image: `${LOGO_DIR}/minimal.png` },
    { id: 'letter_retro', image: `${LOGO_DIR}/letter-retro.png` },
    { id: 'lettering', image: `${LOGO_DIR}/lettering.png` },
    { id: 'mascot', image: `${LOGO_DIR}/mascot.png` },
    { id: 'word_logo', image: `${LOGO_DIR}/word-logo.png` },
    { id: 'letter_symbolic', image: `${LOGO_DIR}/letter-symbolic.png` },
    { id: 'letter_modern', image: `${LOGO_DIR}/letter-modern.png` },
] as const;
export type LogoId = (typeof LOGO_STYLES)[number]['id'];

// 25 font specimens from the board, numbered column by column.
export const FONT_SAMPLES = Array.from({ length: 25 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { id: `font_${n}`, number: i + 1, image: `/assets/images/branding/fonts/font-${n}.png` };
});
export const MAX_STARS = 5;

// ─── Form state ──────────────────────────────────────────────────────────────

export interface ValueBelief { title: string; description: string }
export interface Competitor { name: string; url: string }

export interface BrandingData {
    full_name: string;
    email: string;
    company_name: string;
    company_description: string;
    values_beliefs: ValueBelief[];
    ideal_clients: string[];
    personality: Partial<Record<SliderId, number>>;
    competition: Competitor[];
    values_priority: Partial<Record<ValueWord, Bucket>>;
    logo_styles: Partial<Record<LogoId, Reaction>>;
    logo_comment: string;
    font_styles: Record<string, number>;
    font_comment: string;
}

export const INITIAL_DATA: BrandingData = {
    full_name: '',
    email: '',
    company_name: '',
    company_description: '',
    values_beliefs: [
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
    ],
    ideal_clients: ['', '', ''],
    personality: {},
    competition: [{ name: '', url: '' }],
    values_priority: {},
    logo_styles: {},
    logo_comment: '',
    font_styles: {},
    font_comment: '',
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shape sent to /api/branding (and from there to WordPress). */
export function buildPayload(data: BrandingData, locale: string) {
    const values_priority = Object.fromEntries(BUCKETS.map((b) => [b, [] as string[]])) as Record<Bucket, string[]>;
    for (const word of VALUE_WORDS) {
        const bucket = data.values_priority[word];
        if (bucket) values_priority[bucket].push(word);
    }

    return {
        form: 'branding_discovery',
        version: 1,
        locale,
        contact: {
            full_name: data.full_name.trim(),
            company_name: data.company_name.trim(),
            email: data.email.trim(),
        },
        company_description: data.company_description.trim(),
        values_beliefs: data.values_beliefs
            .map((v) => ({ title: v.title.trim(), description: v.description.trim() }))
            .filter((v) => v.title || v.description),
        ideal_clients: data.ideal_clients.map((c) => c.trim()).filter(Boolean),
        personality: data.personality,
        competition: data.competition
            .map((c) => ({ name: c.name.trim(), url: c.url.trim() }))
            .filter((c) => c.name || c.url),
        values_priority,
        logo_styles: LOGO_STYLES
            .filter((l) => data.logo_styles[l.id])
            .map((l) => ({ id: l.id, reaction: data.logo_styles[l.id] })),
        logo_comment: data.logo_comment.trim(),
        font_styles: FONT_SAMPLES
            .filter((f) => data.font_styles[f.id])
            .map((f) => ({ id: f.id, stars: data.font_styles[f.id] })),
        font_comment: data.font_comment.trim(),
        submitted_at: new Date().toISOString(),
    };
}
