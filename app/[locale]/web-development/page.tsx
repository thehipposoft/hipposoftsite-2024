import WebDevComponent from "@/components/WebDevelopment/WebDevComponent";
import type { Metadata } from 'next'
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/web-development',
        imageAlt: 'HippoSoft web development services',
        content: {
            en: {
                title: 'HippoSoft | Web Development',
                description: 'Full-stack web development services covering strategy, implementation, hosting, and maintenance for scalable digital solutions.',
            },
            es: {
                title: 'HippoSoft | Desarrollo Web',
                description: 'Servicios de desarrollo web full-stack que incluyen estrategia, implementacion, hosting y mantenimiento.',
            },
        },
    });
}

export default function WebDevelopmentPage() {
    return (
        <WebDevComponent />
    )
}
