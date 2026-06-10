import WebDesignComp from '@/components/WebDesign';
import type { Metadata } from 'next'
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/web-design',
        imageAlt: 'HippoSoft web design services',
        content: {
            en: {
                title: 'HippoSoft | Web Design',
                description: 'Professional web design services that blend aesthetics, user experience, and brand identity to create stunning digital experiences.',
            },
            es: {
                title: 'HippoSoft | Diseno Web',
                description: 'Servicios profesionales de diseno web que combinan estetica, experiencia de usuario e identidad de marca.',
            },
        },
    });
}

export default function WebDesign() {
    return (
        <WebDesignComp />
    );
}
