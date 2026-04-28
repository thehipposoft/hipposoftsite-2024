import SocialMediaComp from '@/components/SocialMediaComp';
import type { Metadata } from 'next'
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/social-media',
        imageAlt: 'HippoSoft social media services',
        content: {
            en: {
                title: 'HippoSoft | Social Media',
                description: 'Social media strategy and content creation services designed to enhance your brand and engage your audience.',
            },
            es: {
                title: 'HippoSoft | Redes Sociales',
                description: 'Estrategias de redes sociales y creacion de contenido para potenciar tu marca y conectar con tu audiencia.',
            },
        },
    });
}

export default function SocialMedia() {
    return (
        <SocialMediaComp />
    );
}
