import WebDesignComp from '@/components/WebDesign';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HippoSoft | Web Design',
    description: 'Professional web design services that blend aesthetics, user experience, and brand identity to create stunning digital experiences.',
    alternates: {
        canonical: '/web-design',
    },
    openGraph: {
        title: 'HippoSoft | Web Design',
        description: 'Professional web design services that blend aesthetics, user experience, and brand identity to create stunning digital experiences.',
        type: 'website',
        url: '/web-design',
        images: [
        {
            url: '/assets/hippo-icon.png',
            width: 1200,
            height: 630,
            alt: 'HippoSoft Web Design Services',
        },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Web Design',
        description: 'Professional web design services that blend aesthetics, user experience, and brand identity to create stunning digital experiences.',
        images: ['/assets/hippo-icon.png'],
    },
}

export default function WebDesign() {
    return (
        <WebDesignComp />
    );
}
