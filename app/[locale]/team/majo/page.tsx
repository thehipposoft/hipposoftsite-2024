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
        path: '/team/majo',
        imageAlt: 'María José Solis - HippoSoft',
        content: {
            en: {
                title: 'María José Solis | HippoSoft',
                description: 'UI/UX & Brand Lead at HippoSoft. Get in touch by email or WhatsApp.',
            },
            es: {
                title: 'María José Solis | HippoSoft',
                description: 'UI/UX & Brand Lead en HippoSoft. Contactame por email o WhatsApp.',
            },
        },
    });
}

export default function MajoTeamCard() {
    return (
        <TeamCard
            name="María José Solis"
            role="UI/UX & Brand Lead"
            photoSrc="/assets/images/team/majo-solis-profile.jpg"
            email="majo@thehipposoft.com"
            whatsapp="+5493875811812"
        />
    );
}
