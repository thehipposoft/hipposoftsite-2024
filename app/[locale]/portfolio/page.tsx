import PortfolioGrid from "@/components/Portfolio/PortfolioGrid";
import type { Metadata } from 'next'
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/portfolio',
        imageAlt: 'HippoSoft portfolio',
        content: {
            en: {
                title: 'HippoSoft | Portfolio',
                description: 'Explore our diverse portfolio of successful web, design, and branding projects that showcase our creative expertise.',
            },
            es: {
                title: 'HippoSoft | Portafolio',
                description: 'Explora nuestro portafolio de proyectos exitosos de web, diseno y branding.',
            },
        },
    });
}

export default function PortfolioPage () {
    return(
        <PortfolioGrid />
    )
}
