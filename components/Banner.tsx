'use client'
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedLink from './commons/AnimatedLink';
import {useTranslations} from 'next-intl';

const BACKGROUNDS = [
    {
        src: '/assets/images/banner/banner-1.webp',
        alt: 'Design',
    },
    {
        src: '/assets/images/banner/banner-2.webp',
        alt: 'Web Development',
    },
    {
        src: '/assets/images/banner/banner-3.webp',
        alt: 'Portfolio',
    },
]

const Banner = () => {
    const t = useTranslations('Banner');
    const [isToggleOne, setIsToggleOne] = useState(true);
    const [isToggleTwo, setIsToggleTwo] = useState(false);
    const [isToggleThree, setIsToggleThree] = useState(false);

    const toggleFunctionOne = () => {
        setIsToggleOne(true)
        setIsToggleTwo(false)
        setIsToggleThree(false)
        setCurrentBackground(0)
    }

    const toggleFunctionOnTwo = () => {
        setIsToggleOne(false)
        setIsToggleTwo(true)
        setIsToggleThree(false)
        setCurrentBackground(1)
    }

    const toggleFunctionThree = () => {
        setIsToggleOne(false)
        setIsToggleTwo(false)
        setIsToggleThree(true)
        setCurrentBackground(2)
    }

    const [ currentBackground, setCurrentBackground] = useState<number>(0)

    const container = useRef<HTMLDivElement>(null)

    const { contextSafe } = useGSAP({ scope: container });

    let mm = gsap.matchMedia();

    const tl = useRef<any>();
    
    useGSAP(() => {
        tl.current = gsap
        .timeline()
        .to(container.current, {
            opacity: 100,
            y: 0,
            ease: 'power4.inOut',
            duration: 1,
        })
        .to('.layers', {
            delay: -.5,
            opacity: 1,
            stagger: 0.2,
            ease: 'back.in'
        })
        .to('.subTitle' , {
            opacity: 1,
            stagger: 0.2,
        })
        mm.add("(min-width: 600px)", () => {
            gsap.from('.first__content', {
                opacity: 0,
                y: '-50%',
                duration: 1,
                rotate: '12deg',
                ease: 'back.out',
                stagger: 0.2,
                delay: 1,
            })
        })



    }, {scope: container});

    return (
        <div className='md:h-full relative opacity-0 translate-y-full' ref={container}>
            {
                BACKGROUNDS.map((val, index):any => {
                    return(
                        <div key={index} className={`${currentBackground === index ? 'opacity-100 -z-[1] transition-none' : ' '} opacity-0 absolute top-0 left-0 w-full h-full duration-700`}>
                            <Image
                                priority
                                sizes="100vw"
                                src={val.src} 
                                className='object-cover'
                                fill
                                alt={`${val?.alt} background`} 
                            />
                        </div>
                    )
                })
            }
            <div className='layers__container relative z-20 h-screen flex flex-col lg:flex-row'>
                <div 
                    className={`
                    layers opacity-0  w-full 
                    lg:h-full relative group flex justify-center items-center md:duration-500 duration-700
                    ${isToggleOne  ? 'lg:w-1/2 h-[60vh] bg-black/70' : 'lg:w-1/4 h-1/4 cursor-pointer'}
                    ${isToggleTwo  ? ' h-[20vh] bg-black/50 hover:bg-black/55' : ''} 
                    ${isToggleThree  ? 'h-[20vh] bg-black/45 hover:bg-black/55' : ''} 
                    `} 
                    onClick={toggleFunctionOne}
                >
                    <div className=''>
                        <div className={`${isToggleOne ? 'opacity-1 block md:-top-12' : ' hidden '} relative duration-1000 lg:w-[400px] flex md:gap-8 gap-4 flex-col justify-center items-center md:items-start`}>
                                <Image src={'/assets/logo.png'} width={150} height={250} alt='HippoSoft logo' className='first__content' />
                                <h4 className='first__content uppercase text-cyan md:tracking-[0.5em] tracking-[0.25em]'>{t('BrandingSubTitle')}</h4>
                                <h2 className='md:text-[64px] text-4xl leading-[72px] first__content '>{t('BrandingTitle')}</h2>
                                <p className='first__content '>{t('BrandingDescription')}</p>
                            <div className='mt-4 md:mt-0 first__content'>
                                <AnimatedLink 
                                    className='px-8 tracking-[0.3em] uppercase mt-4 md:mt-0 border border-cyan hover:scale-x-105 hover:bg-transparent hover:text-cyan duration-300 text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                                    href={'/design'}
                                >
                                    {t('Button')}
                                </AnimatedLink>
                            </div>
                        </div>
                        <div className={`${isToggleOne ? 'hidden' : 'block'}  flex gap-4 flex-col justify-center  items-center`}>
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                </svg>
                                <h3 className='relative uppercase font-medium tracking-[0.5em] -top-4 duration-500 group-hover:top-0'>{t('BrandingMobileSlug')}</h3>
                        </div>
                    </div>
                </div>
                <div 
                    className={`lg:h-full layers  opacity-0 bg-black/50 group flex justify-center items-center
                     origin-right md:duration-500 duration-700 relative  
                    ${isToggleTwo ? 'lg:w-1/2 bg-black/70 h-[60vh]' : ' cursor-pointer lg:w-1/4 bg-black/50 hover:bg-black/60 h-[20vh]'}`} 
                    onClick={toggleFunctionOnTwo}
                >
                    <div className=''>
                        <div className={`${isToggleTwo ? 'opacity-1 block' : ' hidden'} lg:w-[400px] md:gap-8 gap-4 duration-1000 flex flex-col justify-center items-center md:items-start`}>
                            <h4 className='text-cyan md:tracking-[0.5em] tracking-[0.25em] uppercase'>{t('DevelopmentSubTitle')}</h4>
                            <h2 className='md:text-[64px] text-4xl leading-[72px]'>{t('DevelopmentTitle')}</h2>
                            <p className='px-10 text-center md:px-0 md:text-left'>{t('DevelopmentDescription')}</p>
                            <AnimatedLink 
                                className='px-8 mt-4 md:mt-0 uppercase tracking-[0.3em] border border-cyan hover:scale-x-105 hover:bg-transparent hover:text-cyan duration-300 text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                                href={'/web-development'}
                            >
                                {t('Button')}
                            </AnimatedLink>
                        </div>
                        <div className={`${isToggleTwo ? 'hidden' : 'block'} subTitle opacity-0 flex gap-4 flex-col justify-center  items-center`}>
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                </svg>
                                <h3 className='uppercase relative font-medium tracking-[0.5em] -top-4 duration-500 group-hover:top-0'>{t('DevelopmentTitle')}</h3>
                        </div>
                    </div>
                </div>
                <div 
                    className={`lg:h-full layers opacity-0 bg-black/40 group flex justify-center items-center
                     origin-right md:duration-500 duration-700 relative
                    ${isToggleThree ? 'bg-black/70 lg:w-1/2 h-[60vh]' : 'lg:w-1/4 h-[20vh] cursor-pointer'} 
                    ${isToggleOne  ? ' bg-black/40 hover:bg-black/55' : ''}
                    ${isToggleTwo  ? ' bg-black/50 hover:bg-black/55' : ''}`} 
                    onClick={toggleFunctionThree}
                >
                    <div className=''>
                        <div className={`${isToggleThree ? 'opacity-1 block -top-12' : 'opacity-0 hidden'} relative lg:w-[400px] md:gap-8 gap-4 duration-1000 flex flex-col justify-center items-center md:items-start`}>
                            <h4 className='text-cyan md:tracking-[0.5em] tracking-[0.25em] uppercase'>{t('PortfolioSubTitle')}</h4>
                            <h2 className='md:text-[64px] text-4xl leading-[72px] text-center md:text-left'>{t('PortfolioTitle')}</h2>
                            <p className='px-8 text-center md:px-0 md:text-left'>{t('PortfolioDescription')}</p>
                            <AnimatedLink href={'/portfolio'} className='uppercase px-8 tracking-[0.3em] border border-cyan hover:scale-x-105 hover:bg-transparent hover:text-cyan duration-300 text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'>
                                {t('Button')}
                            </AnimatedLink>
                        </div>
                        <div className={`${isToggleThree ? 'hidden' : 'block'} subTitle opacity-0 flex gap-4 flex-col justify-center  items-center`}>
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                </svg>
                                <h3 className=' relative uppercase font-medium tracking-[0.5em] -top-4 duration-500 group-hover:top-0'>{t('PortfolioTitle')}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;