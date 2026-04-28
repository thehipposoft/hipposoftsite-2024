import LogofolioSingleComp from '@/components/Logofolio/LogofolioSingleComp';
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
    title: 'HippoSoft | Logofolio | Diversity & Employment Case Study',
    description: 'Case study for Diversity & Employment: logo and brand identity design that celebrates inclusive hiring and employment excellence.',
    alternates: {
        canonical: '/logofolio/diversity-employment',
    },
    openGraph: {
        title: 'HippoSoft | Logofolio | Diversity & Employment Case Study',
        description: 'Explore the Diversity & Employment branding project, from visual identity strategy to final logo applications.',
        type: 'article',
        url: '/logofolio/diversity-employment',
        images: [
        {
            url: '/assets/images/logofolio/diversity-employment.png',
            width: 1200,
            height: 630,
            alt: 'Diversity & Employment logo by HippoSoft',
        },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HippoSoft | Logofolio | Diversity & Employment Case Study',
        description: 'Explore the Diversity & Employment branding project, from visual identity strategy to final logo applications.',
        images: ['/assets/images/logofolio/diversity-employment.png'],
    },
}

export default function DiversityEmploymentPage() {
    const t = useTranslations('LogofolioDiversity');
    const DIVERSITY_DATA = {
        isOld: true,
        name: 'Diversity Employment',
        description: [t("description1"), t("description2")],
        concept: [t("DiversityConcept"), t("DiversityConcept2")],
        content: <div className="flex flex-col md:flex-row justify-between pt-4 gap-8 md:gap-0">
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">{t("PrimaryColors")}</p>
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-3">
                                <div className="lg:w-[7vw] md:w-[15vw] w-[20vw] h-[5vh] bg-[#44B2AF]" />
                                <div className="flex flex-col gap-[1px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #44B2AF</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                          </div>
                            <div className="flex flex-col gap-3">
                                <div className="lg:w-[7vw] md:w-[15vw] w-[20vw] h-[5vh] bg-[#30528D]" />
                                <div className="flex flex-col gap-[1px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #44B2AF</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="lg:w-[7vw] md:w-[15vw] w-[20vw] h-[5vh] bg-[#F15F3F]" />
                                <div className="flex flex-col gap-[1px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #44B2AF</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">{t("Accent")}</p>
                        <div className="grid">
                            <div className="flex flex-col gap-3">
                                <div className="lg:w-[7vw] md:w-[15vw] w-[20vw] h-[5vh] bg-[#FFCC5F]" />
                                <div className="flex flex-col gap-[1px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #FFCC5F</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>,
        href: 'https://diversityemployment.nz/',
        information: ['Diversity employment', 'New Zealand', t("DiversityDate")],
        logo: '/assets/images/logofolio/diversity.png',
        logoSizes: ['300px', '80px'],
        gallery: ['/assets/images/logofolio/diversity/diversity-1.webp', '/assets/images/logofolio/diversity/diversity-3.webp', '/assets/images/logofolio/diversity/diversity-4.webp', '/assets/images/logofolio/diversity/diversity-2.webp'],
        vectorColors: ['#000000', '#000000', '#70FFE5', '#70FFE5',],
    }

    return (
        <LogofolioSingleComp data={DIVERSITY_DATA} />
    );
};
