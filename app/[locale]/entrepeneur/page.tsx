import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next'
import { buildLocalizedMetadata } from '../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/entrepeneur',
        imageAlt: 'HippoSoft Entrepreneur support',
        content: {
            en: {
                title: 'HippoSoft | Entrepreneur',
                description: 'We support the development of your project from the beginning. Contact us to boost your brand and build together.',
            },
            es: {
                title: 'HippoSoft | Emprendedor',
                description: 'Acompanamos el desarrollo de tu proyecto desde el inicio para potenciar tu marca y crecer juntos.',
            },
        },
    });
}

export default function EntrepreneurPage () {
    return(
        <div className="h-screen relative flex flex-col gap-8 justify-center items-center">
            <Image src={'/assets/images/entrepeneur/entrepeneurBg.webp'} alt="Background with pen and paper" fill className="object-cover" />
            <div className="absolute h-full w-full bg-white/80" />
            <h1 className="relative z-10 text-black md:text-6xl text-5xl thin uppercase text-center">
                Coming soon...
            </h1>
            <Link href={'/'} className="relative z-10 text-black text-2xl hover:underline">
                Go back home &#8617;
            </Link>
        </div>
    )
}
