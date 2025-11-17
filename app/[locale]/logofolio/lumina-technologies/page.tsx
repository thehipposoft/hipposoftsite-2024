import React from 'react';
import LogofolioSingleComp from '@/components/Logofolio/LogofolioSingleComp';
import type { Metadata } from 'next'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import NewLogofolioComp from '@/components/Logofolio/NewLogofolioComp';

export const metadata: Metadata = {
  title: 'HippoSoft | Logofolio: Lumina Technologies',
  description: 'We design the logo and give your brand identity, aligning it with the values ​​you want to convey.',
}

export default function LuminaTechnologiesPage() {

    const t = useTranslations('LogofolioLumina');

    const DATA = {
            logo: '/assets/images/logofolio/lumina.png',
            backgroundOne: "/assets/images/logofolio/lumina/background.png",
            backgroundTwo: "/assets/images/logofolio/lumina/background2.jpg",
            itemImage: "/assets/images/logofolio/lumina/lumina-1.png",
            contain: true,
            colorPrimary: "#040D26",
            colorSecondary: ["#35E3ED", "#A044FF", "#151F27", "#FFFFFF"],
            backgroundThree: "/assets/images/logofolio/lumina/lumina-4.png",
            backgroundLegend: "#FFFFFF",
            backgroundLegendImage: "/assets/images/logofolio/lumina/background3.jpg",
            legend: "Reimagine the interface between light and matter",
            backgroundFinal: "/assets/images/logofolio/lumina/background4.jpg",
            name: "Lumina Technologies",
            country: "USA",
            date: "september 2025",
            href: "",
            description: [t("description1"), t("description2")],
            concept: [t("Concept"), t("Concept2")],
            content: <div className="flex md:flex-row flex-col gap-8 md:gap-0 justify-between pt-6">
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">{t("Palette")}</p>
                        <Image src={'/assets/images/logofolio/lumina/paleta_lumina.png'} className="w-[475px]" alt="" width={1198} height={430} />
                    </div>
                </div>,
            logoSizes: ['240px', '100px'],
            gallery: ['/assets/images/logofolio/lumina/lumina-1.png', '/assets/images/logofolio/lumina/lumina-2.png', '/assets/images/logofolio/lumina/lumina-3.png', '/assets/images/logofolio/lumina/lumina-4.png'],
            vectorColors: ['#000000', '#000000', '#000000', '#000000',],
    }

    return (
        <div>
            <NewLogofolioComp data={DATA} />
        </div>
    );
};
