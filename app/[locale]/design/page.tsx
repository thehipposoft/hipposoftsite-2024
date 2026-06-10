import BrandingDesignMobile from '@/components/BrandingDesignMobile';
import BrandingDesing from '@/components/BrandingDesing';
import type { Metadata } from 'next';
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/design',
        imageAlt: 'HippoSoft design services',
        content: {
            en: {
                title: 'HippoSoft | Design',
                description: 'Discover all our design and branding services. From logos to social media posts that convey your identity.',
            },
            es: {
                title: 'HippoSoft | Diseno',
                description: 'Descubre todos nuestros servicios de diseno y branding, desde logotipos hasta contenido para redes sociales.',
            },
        },
    });
}

export default function DesignPage() {
    return (
        <div>
            <BrandingDesing />
            <BrandingDesignMobile />
        </div>
    );
}
