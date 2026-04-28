import ContactComponent from '@/components/Contact';
import type { Metadata } from 'next'
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/contact',
        imageAlt: 'Contact HippoSoft',
        content: {
            en: {
                title: 'HippoSoft | Contact',
                description: "Get in touch with the HippoSoft team and let's build your brand, design or website together right away.",
            },
            es: {
                title: 'HippoSoft | Contacto',
                description: 'Contacta al equipo de HippoSoft y construyamos juntos tu marca, diseno o sitio web.',
            },
        },
    });
}

export default function Contact() {
    return (
        <ContactComponent />
    );
}
