import type { Metadata } from 'next';
import ViewerWrapper from './ViewerWrapper';
import { buildLocalizedMetadata } from '../../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/hippo-lab/BIM',
        imageAlt: 'HippoSoft BIM viewer showcase',
        content: {
            en: {
                title: 'HippoSoft | Hippo Lab | BIM',
                description: 'Interactive BIM showcase with embeddable IFC viewers for client websites.',
            },
            es: {
                title: 'HippoSoft | Hippo Lab | BIM',
                description: 'Demostracion interactiva BIM con visores IFC integrables para sitios web de clientes.',
            },
        },
    });
}

const HippoLab = () => {
    return (
        <ViewerWrapper />
    );
}

export default HippoLab;
