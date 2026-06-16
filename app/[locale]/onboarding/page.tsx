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
        imageAlt: 'HippoSoft Onboarding Form',
        content: {
            en: {
                title: 'HippoSoft | Start Working With Us',
                description: 'Fill out our project discovery form and let us understand your business, goals, and needs. The first step to building something great together.',
            },
            es: {
                title: 'HippoSoft | Empecemos a Trabajar',
                description: 'Completá nuestro formulario de descubrimiento y dejanos entender tu negocio, objetivos y necesidades. El primer paso para construir algo grande juntos.',
            },
        },
    });
}

export default async function OnBoardingPage () {
    const t = await getTranslations('OnboardingPage');
    return(
        <div className="h-screen relative flex flex-col gap-8">
            <Image src={'/assets/images/onboarding/onboarding.webp'} alt="Background with pen and paper" fill className="object-cover object-right lg:object-center" />
            <div className="absolute h-full w-full lg:bg-white/25 bg-white/60" />
            <div className="relative z-10 flex flex-col gap-4 mx-auto lg:w-[1100px] w-[80vw] pt-24">
                <h1 className=" text-black md:text-6xl text-5xl">
                    {t('title')}
                </h1>
                <div className="flex flex-col gap-4 lg:gap-1 text-black font-semibold text-lg leading-5 lg:text-base">
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
