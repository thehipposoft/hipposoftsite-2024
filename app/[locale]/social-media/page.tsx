import SocialMediaComp from '@/components/SocialMediaComp';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HippoSoft | Social Media',
    description: 'At HippoSoft we are also dedicated to the development of Social Networks to enhance brands. Tailor-made strategies: We design unique strategies adapted to your business. Quality Content: We create visual and written content that captures the essence of your brand.',
    alternates: {
        canonical: '/social-media',
    },
    openGraph: {
        title: 'HippoSoft | Social Media',
        description: 'Social media strategy and content creation services designed to enhance your brand and engage your audience.',
        type: 'website',
        url: '/social-media',
        images: [
        {
            url: '/assets/hippo-icon.png',
            width: 1200,
            height: 630,
            alt: 'HippoSoft Social Media Services',
        },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Social Media',
        description: 'Social media strategy and content creation services designed to enhance your brand and engage your audience.',
        images: ['/assets/hippo-icon.png'],
    },
}

export default function SocialMedia() {
    return (
        <SocialMediaComp />
    );
}
