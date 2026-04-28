import LogofolioComp from '@/components/Logofolio';
import type { Metadata } from 'next'
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/logofolio',
        imageAlt: 'HippoSoft logofolio',
        content: {
            en: {
                title: 'HippoSoft | Logofolio',
                description: 'Explore our logofolio of successful logo and brand identity design projects that bring brands to life.',
            },
            es: {
                title: 'HippoSoft | Logofolio',
                description: 'Explora nuestro logofolio con proyectos de diseno de logos e identidad de marca.',
            },
        },
    });
}

export default function Logofolio() {
    return (
        <LogofolioComp />
    );
}
