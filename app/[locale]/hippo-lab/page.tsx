import type { Metadata } from 'next';
import HippoLabComp from './HippoLab';
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/hippo-lab',
        imageAlt: 'HippoSoft Hippo Lab',
        content: {
            en: {
                title: 'HippoSoft | Hippo Lab',
                description: 'Explore our innovative lab projects and experimental design solutions that push creative boundaries.',
            },
            es: {
                title: 'HippoSoft | Hippo Lab',
                description: 'Explora nuestros proyectos de laboratorio e ideas experimentales que impulsan la innovacion.',
            },
        },
    });
}

const HippoLab = () => {
    return (
        <HippoLabComp />
    );
}

export default HippoLab;
