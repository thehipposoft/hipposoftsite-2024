import React from 'react';
import LogofolioSingleComp from '@/components/Logofolio/LogofolioSingleComp';
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'HippoSoft | Logofolio: Destino Salta',
  description: 'We design the logo and give your brand identity, aligning it with the values ​​you want to convey.',
}

export default function DestinoSaltaPage() {

    const t = useTranslations('LogofolioDestinoSalta');

    const DESTINO_DATA = {
        name: 'Destino Salta',
        description: [t("description1")],
        concept: [t("Concept"), t("Concept2")],
        content: <div className="flex md:flex-row-reverse flex-col-reverse gap-8 md:gap-0 justify-between pt-6">
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">{t("SecondaryColors")}</p>
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-4">
                                <div className="lg:w-[7vw] md:w-[15vw] w-[20vw] h-[5vh] bg-[#BE6312]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 190</p>
                                    <p className="light">G: 99</p>
                                    <p className="light">B: 18</p>
                                    <p className="light">Hex: #BE6312</p>
                                    <p className="light">C: 20</p>
                                    <p className="light">M: 71</p>
                                    <p className="light">Y: 100</p>
                                    <p className="light">K: 9</p>
                                </div>
                        </div>
                            <div className="flex flex-col gap-4">
                                <div className="lg:w-[7vw] md:w-[15vw] w-[20vw] h-[5vh] bg-[#EF973B]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 239</p>
                                    <p className="light">G: 151</p>
                                    <p className="light">B: 59</p>
                                    <p className="light">Hex: #EF973B</p>
                                    <p className="light">C: 3</p>
                                    <p className="light">M: 49</p>
                                    <p className="light">Y: 97</p>
                                    <p className="light">K: 0</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="lg:w-[7vw] md:w-[15vw] w-[20vw] h-[5vh] bg-[#4B4136]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 75</p>
                                    <p className="light">G: 65</p>
                                    <p className="light">B: 54</p>
                                    <p className="light">Hex: #4B4136</p>
                                    <p className="light">C: 56</p>
                                    <p className="light">M: 63</p>
                                    <p className="light">Y: 79</p>
                                    <p className="light">K: 62</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className=" text-sm">{t("PrimaryColors")}</p>
                        <div className="grid">
                            <div className="flex flex-col gap-4">
                                <div className="lg:w-[7vw] md:w-[15vw] w-[20vw] h-[5vh] bg-[#8F122B]" />
                                <div className="flex flex-col gap-[2px] text-xs">
                                    <p className="light">R: 68</p>
                                    <p className="light">G: 178</p>
                                    <p className="light">B: 175</p>
                                    <p className="light">Hex: #8F122B</p>
                                    <p className="light">C: 72</p>
                                    <p className="light">M: 7</p>
                                    <p className="light">Y: 36</p>
                                    <p className="light">K: 0</p>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>,
        href: 'https://destinosalta.com.ar/',
        information: ['Destino salta', 'Argentina', t("Date")],
        logo: '/assets/images/logofolio/destino.png',
        logoSizes: ['180px', '180px'],
        gallery: ['/assets/images/logofolio/destino/destino-1.webp', '/assets/images/logofolio/destino/destino-2.webp', '/assets/images/logofolio/destino/destino-3.webp', '/assets/images/logofolio/destino/destino-4.webp'],
        vectorColors: ['#70FFE5', '#70FFE5', '#000000', '#000000',],
    }

    return (
        <div>
            <LogofolioSingleComp data={DESTINO_DATA} />
        </div>
    );
};
