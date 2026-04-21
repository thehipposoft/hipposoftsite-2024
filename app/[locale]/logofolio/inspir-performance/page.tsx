import React from 'react';
import LogofolioSingleComp from '@/components/Logofolio/LogofolioSingleComp';
import type { Metadata } from 'next'
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import NewLogofolioComp from '@/components/Logofolio/NewLogofolioComp';
 
export const metadata: Metadata = {
  title: 'HippoSoft | Logofolio: Inspir Performance',
  description: 'We design the logo and give your brand identity, aligning it with the values ​​you want to convey.',
}

export default function InspirPerformancePage() {

    const t = useTranslations('LogofolioInspir');

    const INSPIR_DATA = {
        name: 'Inspir Performance',
        description: [t('description1'), t('description2')],
        concept: [t('InspirConcept')],
        content: <div className="flex md:flex-row flex-col gap-4 pt-4">
                    <div className="relative w-[300px] h-[165px]">
                        <Image src={'/assets/images/logofolio/inspir/inspir-info.webp'} fill alt="Inspir primary colors" />
                    </div>
                    <div className="relative w-[310px] h-[160px] mt-2">
                        <Image src={'/assets/images/logofolio/inspir/inspir-info2.webp'} fill alt="Inspir tonal gradient" />
                    </div>
                </div>,
        information: ['INSPIR PERFORMANCE', 'PARIS - AUSTRALIA', t("InspirDate")],
        logo: '/assets/images/logofolio/inspir.png',
        logoSizes: ['200px', '100px'],
        href: 'https://www.inspirperformance.com/',
        gallery: ['/assets/images/logofolio/inspir/inspir-1.webp', '/assets/images/logofolio/inspir/inspir-2.webp', '/assets/images/logofolio/inspir/inspir-3.webp', '/assets/images/logofolio/inspir/inspir-4.webp'],
        vectorColors: ['#70FFE5', '#000000', '#000000', '#70FFE5',],
    }
    const DATA = {
                logo: '/assets/images/logofolio/inspir.png',
                backgroundOne: "/assets/images/logofolio/inspir/background.jpg",
                backgroundTwo: "/assets/images/logofolio/inspir/background2.jpg",
                itemImage: "/assets/images/logofolio/inspir/itemImage.png",
                left: true,
                colorPrimary: "#1E1860",
                colorSecondary: ["#FC823C", "#FC4C28"],
                backgroundThree: "/assets/images/logofolio/inspir/background4.jpg",
                backgroundLegend: "#FFFFFF",
                backgroundLegendImage: "/assets/images/logofolio/inspir/background3.jpg",
                legend: "The mind is not a vessel to be filled, but a fire to be ignited.",
                backgroundFinal: "/assets/images/logofolio/inspir/background5.jpg",
                name: 'Inspir Performance',
                country: "Paris - Australia",
                date: "march 2023",
                href: "",
                description: [t('description1'), t('description2')],
                concept: [t('InspirConcept')],
                content: <div className="flex md:flex-row flex-col gap-4 pt-4">
                    <div className="relative w-[300px] h-[165px]">
                        <Image src={'/assets/images/logofolio/inspir/inspir-info.webp'} fill alt="Inspir primary colors" />
                    </div>
                    <div className="relative w-[310px] h-[160px] mt-2">
                        <Image src={'/assets/images/logofolio/inspir/inspir-info2.webp'} fill alt="Inspir tonal gradient" />
                    </div>
                </div>,
                logoSizes: ['200px', '100px'],
                gallery: ['/assets/images/logofolio/inspir/inspir-1.webp', '/assets/images/logofolio/inspir/inspir-2.webp', '/assets/images/logofolio/inspir/inspir-3.webp', '/assets/images/logofolio/inspir/inspir-4.webp'],
                vectorColors: ['#70FFE5', '#000000', '#000000', '#70FFE5',],
        }

    return (
        <div>
            <NewLogofolioComp data={DATA} />
        </div>
    );
};
