import Image from "next/image";
import type { Metadata } from 'next'
import { buildLocalizedMetadata } from '../metadata-utils';
import AnimatedLink from "@/components/commons/AnimatedLink";
import { getTranslations } from 'next-intl/server';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/onboarding',
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

export default async function OnBoardingPage () {
    const t = await getTranslations('OnboardingPage');
    return(
        <div className="h-screen relative flex flex-col gap-8">
            <Image src={'/assets/images/onboarding/onboarding.webp'} alt="Background with pen and paper" fill className="object-cover" />
            <div className="absolute h-full w-full bg-white/15" />
            <div className="relative z-10 flex flex-col gap-4 mx-auto lg:w-[1100px] pt-24">
                <h1 className=" text-black md:text-6xl text-5xl">
                    {t('title')}
                </h1>
                <div className="flex flex-col gap-1 text-black">
                    <p>{t('p1')}</p>
                    <p>{t('p2')}</p>
                    <p>{t('p3')}</p>
                    <p>{t('p4')}</p>
                </div>
                <AnimatedLink
                    className='px-8 tracking-[0.2em] mt-4 md:mt-0 hover:scale-x-105 hover:bg-black hover:text-white duration-500 text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                    href={'/onboarding/form'}
                >
                    {t('cta')}
                </AnimatedLink>
            </div>
        </div>
    )
}
