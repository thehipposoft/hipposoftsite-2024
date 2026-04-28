import type { Metadata } from 'next';
import HippoLabComp from './HippoLab';

export const metadata: Metadata = {
    title: 'HippoSoft | Hippo Lab',
    description: 'Explore our innovative lab projects and experimental design solutions that push creative boundaries.',
    alternates: {
        canonical: '/hippo-lab',
    },
    openGraph: {
        title: 'HippoSoft | Hippo Lab',
        description: 'Explore our innovative lab projects and experimental design solutions that push creative boundaries.',
        type: 'website',
        url: '/hippo-lab',
        images: [
        {
            url: '/assets/hippo-icon.png',
            width: 1200,
            height: 630,
            alt: 'HippoSoft Hippo Lab',
        },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Hippo Lab',
        description: 'Explore our innovative lab projects and experimental design solutions that push creative boundaries.',
        images: ['/assets/hippo-icon.png'],
    },
}

const HippoLab = () => {
    return (
        <HippoLabComp />
    );
}

export default HippoLab;
