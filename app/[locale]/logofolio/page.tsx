import LogofolioComp from '@/components/Logofolio';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HippoSoft | Logofolio',
    description: 'Explore our logofolio of successful logo and brand identity design projects that bring brands to life.',
    alternates: {
        canonical: '/logofolio',
    },
    openGraph: {
        title: 'HippoSoft | Logofolio',
        description: 'Explore our logofolio of successful logo and brand identity design projects that bring brands to life.',
        type: 'website',
        url: '/logofolio',
        images: [
        {
            url: '/assets/hippo-icon.png',
            width: 1200,
            height: 630,
            alt: 'HippoSoft Logofolio',
        },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Logofolio',
        description: 'Explore our logofolio of successful logo and brand identity design projects that bring brands to life.',
        images: ['/assets/hippo-icon.png'],
    },
}

export default function Logofolio() {
    return (
        <LogofolioComp />
    );
}
