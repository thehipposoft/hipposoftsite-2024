"use client"
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CollapseItem from './CollapseItem'
import {useTranslations} from 'next-intl';
gsap.registerPlugin(ScrollTrigger);

const CollapseComponent = () => {

    const container = useRef(null);
    const t = useTranslations('CollapseComponent');

    useGSAP(() => {
        gsap.from(".textone_", {
            scrollTrigger: {
                    trigger: ".textone_",
                    start: "top center"
                },
            opacity: 0,
        })
        gsap.from(".items_container", {
            scrollTrigger: {
                    trigger: ".textone_",
                    start: "top 35%",
                },
            opacity: 0,
            stagger: 0.1,
            duration: 1,
        })
        
    }, {scope: container})

  return (
    <div ref={container} className='lg:max-w-[1350px] md:max-w-[90vw] max-w-[80vw] mx-auto flex flex-col justify-between py-24'>
        <div className='flex textone_ lg:flex-row flex-col w-full justify-between lg:items-center text-black gap-6 lg:gap-0 pb-12'>
            <h3 className='uppercase thin text-xl'>{t("slug")}</h3>
            <h5 className='uppercase md:text-6xl text-5xl -tracking-wider'>{t("title")}<br/>{t("title2")}</h5>
        </div>
        <div className='items_container'>
            <CollapseItem 
                title={t("itemOneTitle")}
                items={[
                    {item: t("itemOneSubTitleOne"), text: t("itemOneSubTitleOneText")},
                    {item: t("itemOneSubTitleTwo"), text: t("itemOneSubTitleTwoText")},
                    {item: t("itemOneSubTitleThree"), text: t("itemOneSubTitleThreeText")},
                ]}
            />
            <CollapseItem 
                title={t("itemTwoTitle")}
                items={[
                    {item: t("itemTwoSubTitleOne"), text: t("itemTwoSubTitleOneText")},
                ]}
            />
            <CollapseItem 
                title={t("itemThreeTitle")}
                items={[
                    {item: t("itemThreeSubTitleOne"), text: t("itemThreeSubTitleOneText")},
                    {item: t("itemThreeSubTitleTwo"), text: t("itemThreeSubTitleTwoText")},
                    {item: t("itemThreeSubTitleThree"), text: t("itemThreeSubTitleThreeText")},
                    {item: t("itemThreeSubTitleFour"), text: t("itemThreeSubTitleFourText")},
                    {item: t("itemThreeSubTitleFive"), text: t("itemThreeSubTitleFiveText")},
                ]}
            />
            <CollapseItem 
                title={t("itemFourTitle")}
                items={[
                    {item: t("itemFourSubTitleOne"), text: t("itemFourSubTitleOneText")},
                    {item: t("itemFourSubTitleTwo"), text: t("itemFourSubTitleTwoText")},
                    {item: t("itemFourSubTitleThree"), text: t("itemFourSubTitleThreeText")},
                    {item: t("itemFourSubTitleFour"), text: t("itemFourSubTitleFourText")},
                    {item: t("itemFourSubTitleFive"), text: t("itemFourSubTitleFiveText")},
                ]}
            />
        </div>
    </div>
  )
}

export default CollapseComponent