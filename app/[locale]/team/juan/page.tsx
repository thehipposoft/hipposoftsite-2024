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
        path: '/team/juan',
        imageAlt: 'Juan Borigen - HippoSoft',
        content: {
            en: {
                title: 'Juan Borigen | HippoSoft',
                description: 'Creative Web Developer at HippoSoft. Get in touch by email or WhatsApp.',
            },
            es: {
                title: 'Juan Borigen | HippoSoft',
                description: 'Creative Web Developer en HippoSoft. Contactame por email o WhatsApp.',
            },
        },
    });
}

export default function JuanTeamCard() {
    return (
        <TeamCard
            name="Juan Borigen"
            role="Creative Web Developer"
            photoSrc="/assets/images/team/juan-borigen-profile.jpg"
            email="juan@thehipposoft.com"
            whatsapp="+5493875180018"
        />
    );
}
