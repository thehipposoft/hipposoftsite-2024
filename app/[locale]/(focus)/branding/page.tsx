import type { Metadata } from 'next';
import { buildLocalizedMetadata } from '@/app/[locale]/metadata-utils';
import BrandingWizard from '@/components/Branding/BrandingWizard';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return {
        ...buildLocalizedMetadata({
            locale,
            path: '/branding',
            imageAlt: 'HippoSoft Brand Discovery',
            content: {
                en: {
                    title: 'HippoSoft | Brand Discovery',
                    description: 'Tell us about your brand so we can start designing your logo and visual identity.',
                },
                es: {
                    title: 'HippoSoft | Descubrimiento de marca',
                    description: 'Contanos sobre tu marca para que podamos empezar a diseñar tu logo e identidad visual.',
                },
            },
        }),
        // Client-facing form shared by link: keep it out of search results.
        robots: { index: false, follow: false },
    };
}

export default function BrandingPage() {
    return <BrandingWizard />;
}
