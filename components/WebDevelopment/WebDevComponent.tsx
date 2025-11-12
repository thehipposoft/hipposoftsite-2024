'use client'
import Image from 'next/image';
import AnimatedLink from '../commons/AnimatedLink';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BackButton from '../commons/BackButton';
import {useTranslations} from 'next-intl';
import CollapseComponent from './CollapseComponent';
import Expertise from './Expertise';

const WebDevComponent = () => {
    const t = useTranslations('WebDevelopment');
    const CARDS_DATA = [
        {
            href: '/web-development/strategy-and-planning',
            image: '/assets/images/web-development/web-development-1.jpg',
            title: t("item1"),
            description: t("description1"),
        },
        {
            href: '/web-development/hosting',
            image: '/assets/images/web-development/web-development-2.jpg',
            title: t("item2"),
            description: t("description2"),
        },
        {
            href: '/web-development/development-and-implementation',
            image: '/assets/images/web-development/web-development-3.jpg',
            title: t("item3"),
            description: t("description3"),
        },
        {
            href: '/web-development/launch-and-maintenance',
            image: '/assets/images/web-development/web-development-4.jpg',
            title: t("item4"),
            description: t("description4"),
        },
    ]

    const container = useRef<HTMLDivElement>(null)

    const tl = useRef<any>(null)

    useGSAP(() => {
        tl.current = gsap
        .timeline()
        .from('.title', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            delay: .7,
            ease: 'back.out'
        })
        gsap.from(".firstText", {
            delay: 1,
            opacity: 0,
        })
        gsap.from('.card', {
            opacity: 0,
            delay: 1,
            yPercent: 15,
            ease: 'back.out',
            stagger: .2,
            duration: .7,
        })
    }, {scope: container})

    return (
        <div ref={container} className=''>
            <div className='title flex lg:w-[1250px] w-[80vw] mx-auto lg:pt-12 pt-20 justify-between items-center text-black'>
                <h2 className='md:text-5xl text-4xl w-3/4 md:w-auto'>{t("title")}</h2>
                <BackButton href={'/'} />
                <AnimatedLink href={'/'} className='lg:hidden block '>
                    <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z"
                        fill='#000000'/>
                    </svg>
                </AnimatedLink>
            </div>
            <div className='lg:max-w-[1350px] md:max-w-[90vw] max-w-[80vw] mx-auto flex lg:flex-row flex-col justify-between pt-12'>
                <div className='bg-slate-200 h-[600px] md:w-[400px] hidden'>bim</div>
                <p className='text-black lg:w-[750px] firstText text-2xl light'>{t("firstText")}</p>
            </div>
            <div  className='lg:max-w-[1350px] md:max-w-[90vw] max-w-[80vw] gap-8 lg:gap-0 mx-auto grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 overflow-hidden pt-12'>
                {
                    CARDS_DATA.map((val, index) => {
                        return(
                            <div className={`card group relative text-black lg:w-[320px] md:w-full w-[80vw]`} key={index}>
                                    <div className='relative lg:w-[320px] md:w-full w-[80vw] h-[280px]'>
                                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative z-10 left-[85%] top-[5%] duration-500 group-hover:scale-125'>
                                            <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                            <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                        </svg>
                                        <Image fill alt={`${val.title} image`} src={val.image} className='object-cover' />
                                    </div>
                                    <h4 className='text-lg'>{val.title}</h4>
                                    <p className='leading-6 text-sm duration-500'>{val.description}</p>
                             </div>
                        )
                    })
                }
            </div>
            <CollapseComponent />
            <Expertise />
            <div className='flex flex-col-reverse lg:max-w-[1350px] md:max-w-[90vw] max-w-[80vw] mx-auto lg:py-24 py-12 md:gap-12 gap-6'>
                <h2 className='bg-gradient-to-r from-brand-purple via-blue-600 to-cyan text-transparent md:text-8xl text-5xl animate-gradient bg-300% md:tracking-wide bg-clip-text text-black font-bold'>{t("ContactText1")}<br /> {t("ContactText2")}</h2>
                <AnimatedLink 
                    className='px-8 tracking-[0.1em] hover:tracking-[0.15em] uppercase mt-4 md:mt-0 border hover:bg-transparent border-cyan hover:scale-x-105 duration-300 text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                    href={'/contact'}
                >
                    {t("Contact")}
                </AnimatedLink>
            </div>
        </div>
    );
};

export default WebDevComponent;