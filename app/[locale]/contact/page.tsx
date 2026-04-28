import ContactComponent from '@/components/Contact';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HippoSoft | Contact',
    description: "Get in touch with the HippoSoft team and let's build your brand, design or website together right away.",
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'HippoSoft | Contact',
        description: "Get in touch with the HippoSoft team and let's build your brand, design or website together right away.",
        type: 'website',
        url: '/contact',
        images: [
        {
            url: '/assets/hippo-icon.png',
            width: 1200,
            height: 630,
            alt: 'Contact HippoSoft',
        },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Contact',
        description: "Get in touch with the HippoSoft team and let's build your brand, design or website together right away.",
        images: ['/assets/hippo-icon.png'],
    },
}

export default function Contact() {
    return (
        <ContactComponent />
    );
}
