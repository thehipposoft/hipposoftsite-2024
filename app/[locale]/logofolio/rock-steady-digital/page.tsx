import type { Metadata } from 'next'
import {useTranslations} from 'next-intl';
import NewLogofolioComp from '@/components/Logofolio/NewLogofolioComp';
import { buildLocalizedMetadata } from '../../metadata-utils';

type MetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;

    return buildLocalizedMetadata({
        locale,
        path: '/logofolio/rock-steady-digital',
        image: '/assets/images/logofolio/rock-steady.png',
        imageAlt: 'Rock Steady Digital logo by HippoSoft',
        type: 'article',
        content: {
            en: {
                title: 'HippoSoft | Logofolio | Rock Steady Digital Case Study',
                description: 'Case study for Rock Steady Digital: logo and brand identity design built to connect people, process, tools and data for business growth.',
                socialDescription: 'Explore the Rock Steady Digital branding project, from visual identity strategy to final logo applications.',
            },
            es: {
                title: 'HippoSoft | Logofolio | Caso de Estudio Rock Steady Digital',
                description: 'Caso de estudio de Rock Steady Digital: diseno de logo e identidad de marca para impulsar el crecimiento del negocio.',
                socialDescription: 'Explora el proyecto de branding de Rock Steady Digital, desde la estrategia visual hasta las aplicaciones finales del logo.',
            },
        },
    });
}

export default function RockSteadyDigitalPage() {
    const t = useTranslations('LogofolioRockSteady');

    const DATA = {
        logo: '/assets/images/logofolio/rock-steady.png',
        backgroundOne: "/assets/images/logofolio/rs/background.jpg",
        backgroundTwo: "/assets/images/webdesign/rocksteady.webp",
        itemImage: "/assets/images/logofolio/rs/rock-1.webp",
        colorPrimary: "#040D26",
        colorSecondary: ["#380A24", "#860522", "#A60321"],
        backgroundThree: "/assets/images/logofolio/rs/background2.jpg",
        backgroundLegend: "#040D26",
        legend: "We unite people, process, tools and data in a creative way that will help your business grow.",
        backgroundFinal: "/assets/images/logofolio/rs/rock-2.webp",
        name: "Rock Steady Digital",
        country: "australia",
        date: "november 2022",
        href: "https://www.rocksteadydigital.com.au/",
        description: [t("description1"), t('description2'), t('description3')],
        concept: [t("RockSteadyConcept")],
        content: <div className="flex flex-col md:flex-row gap-12 pt-12">
                    <div className="flex flex-col gap-6">
                        <p className="text-sm">Primary Palette</p>
                        <div className="flex gap-12">
                            <div className="flex flex-col gap-4">
                                <div className="rounded-full bg-[#040D26] w-[90px] h-[90px]" />
                                <div className="flex flex-col text-xs">
                                    <p>RGB: 4/13/38</p>
                                    <p>HEX: 040D26</p>
                                    <p>CMYK: 80/73/60/84</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="rounded-full bg-[#A60321] w-[90px] h-[90px]" />
                                <div className="flex flex-col text-xs">
                                    <p>RGB: 166/3/33</p>
                                    <p>HEX: A60321</p>
                                    <p>CMYK: 20/100/100/22</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="text-sm">Tonal gradient</p>
                        <div className="flex items-end gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="rounded-full bg-[#380A24] w-[50px] h-[50px]" />
                                <div className="flex flex-col text-xs">
                                    <p>RGB: 56/10/36</p>
                                    <p>HEX: 380A24</p>
                                    <p>CMYK: 65/76/58/81</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="rounded-full bg-[#860522] w-[50px] h-[50px]" />
                                <div className="flex flex-col text-xs">
                                    <p>RGB: 134/5/34</p>
                                    <p>HEX: 860522</p>
                                    <p>CMYK: 27/100/100/41</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
        logoSizes: ['220px', '120px'],
        gallery: [
            '/assets/images/logofolio/rs/rock-1.webp',
            '/assets/images/logofolio/rs/rock-2.webp',
            '/assets/images/logofolio/rs/rock-3.webp',
            '/assets/images/logofolio/rs/rock-4.webp'
        ],
        vectorColors: ['#000000', '#000000', '#000000', '#70FFE5',],
    }
    return (
        <NewLogofolioComp data={DATA} />
    );
};
