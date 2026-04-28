import WebDevComponent from "@/components/WebDevelopment/WebDevComponent";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HippoSoft | Web Development',
    description: 'Full-stack web development services covering strategy, implementation, hosting, and maintenance for scalable digital solutions.',
    alternates: {
        canonical: '/web-development',
    },
    openGraph: {
        title: 'HippoSoft | Web Development',
        description: 'Full-stack web development services covering strategy, implementation, hosting, and maintenance for scalable digital solutions.',
        type: 'website',
        url: '/web-development',
        images: [
        {
            url: '/assets/hippo-icon.png',
            width: 1200,
            height: 630,
            alt: 'HippoSoft Web Development Services',
        },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Web Development',
        description: 'Full-stack web development services covering strategy, implementation, hosting, and maintenance for scalable digital solutions.',
        images: ['/assets/hippo-icon.png'],
    },
}

export default function WebDevelopmentPage() {
    return (
        <WebDevComponent />
    )
}
