import type { Metadata } from 'next';
import { buildLocalizedMetadata } from '../../metadata-utils';
import TeamCard from '@/components/TeamCard';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/team/diego',
        imageAlt: 'Diego Borigen - HippoSoft',
        content: {
            en: {
                title: 'Diego Borigen | HippoSoft',
                description: 'Director at HippoSoft. Get in touch by email or WhatsApp.',
            },
            es: {
                title: 'Diego Borigen | HippoSoft',
                description: 'Director en HippoSoft. Contactame por email o WhatsApp.',
            },
        },
    });
}

export default function DiegoTeamCard() {
    return (
        <TeamCard
            name="Diego Borigen"
            role="Consultor Digital"
            photoSrc="/assets/images/team/Diego-profile.png"
            email="diego@thehipposoft.com"
            whatsapp="+61414286242"
        />
    );
}
