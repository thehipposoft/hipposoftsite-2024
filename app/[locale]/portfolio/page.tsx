import PortfolioGrid from "@/components/Portfolio/PortfolioGrid";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HippoSoft | Portfolio',
    description: 'Explore our diverse portfolio of successful web, design, and branding projects that showcase our creative expertise.',
    alternates: {
        canonical: '/portfolio',
    },
    openGraph: {
        title: 'HippoSoft | Portfolio',
        description: 'Explore our diverse portfolio of successful web, design, and branding projects that showcase our creative expertise.',
        type: 'website',
        url: '/portfolio',
        images: [
        {
            url: '/assets/hippo-icon.png',
            width: 1200,
            height: 630,
            alt: 'HippoSoft Portfolio',
        },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Portfolio',
        description: 'Explore our diverse portfolio of successful web, design, and branding projects that showcase our creative expertise.',
        images: ['/assets/hippo-icon.png'],
    },
}

export default function PortfolioPage () {
    return(
        <PortfolioGrid />
    )
}
