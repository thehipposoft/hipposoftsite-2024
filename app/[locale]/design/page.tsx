import BrandingDesignMobile from '@/components/BrandingDesignMobile';
import BrandingDesing from '@/components/BrandingDesing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'HippoSoft | Design',
    description: 'Discover all our design and branding services. From logos to social media posts that convey your identity.',
    alternates: {
        canonical: '/design',
    },
    openGraph: {
        title: 'HippoSoft | Design',
        description: 'Discover all our design and branding services. From logos to social media posts that convey your identity.',
        type: 'website',
        url: '/design',
        images: [
            {
                url: '/assets/hippo-icon.png',
                width: 1200,
                height: 630,
                alt: 'HippoSoft Design Services',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Design',
        description: 'Discover all our design and branding services. From logos to social media posts that convey your identity.',
        images: ['/assets/hippo-icon.png'],
    },
}

export default function DesignPage() {
    return (
        <div>
            <BrandingDesing />
            <BrandingDesignMobile />
        </div>
    );
}
