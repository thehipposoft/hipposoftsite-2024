'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AnimatedLink from './commons/AnimatedLink';
import BackButton from './commons/BackButton';
import {useTranslations} from 'next-intl';

gsap.registerPlugin(ScrollTrigger);


const BrandingDesing = () => {
    const t = useTranslations('BrandingAndDesign');

    const container = useRef<HTMLDivElement>(null);

    const tl = useRef<any>();

    useGSAP(() => {
        tl.current = gsap
        .timeline({ defaults: {ease: 'power2.inOut'} })

        .from('.image-animation', {
            yPercent: 100,
            duration: 1.5,
            opacity: 0,
        })
        .to(['.title', '.info', '.carousel-slide'], {
            opacity: 1,
        })
        
        gsap.to('.carousel__wrapper' , {
            x: -900,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: container.current,
                scrub: 2,
                end: '=+1000',
                pin: true,
            }
        })


    }, {scope: container});

    return (
        <div ref={container} className='h-screen hidden lg:block bg-white'>
            <div className='title items-center opacity-0 flex justify-between w-full px-20 pt-16 pb-4'>
                <h1 className='text-black text-5xl'>{t("title")}</h1>
                <BackButton href={'/'} color='#000000' />
            </div>
            <div className={`bg-white flex justify-center items-center pt-8 relative `}>
                <div className={`carousel__wrapper translate-x-[900px] flex gap-20 items-center`}>
                    <div className='overflow-hidden w-[850px] h-[530px]'>
                        <div className={`overflow-hidden w-[850px] h-[530px] opacity-100 relative group image-animation rounded-md`} >
                            <AnimatedLink href={'/logofolio'} className={`absolute w-full h-full z-[11]`}>
                                <div className='info relative z-10 flex opacity-0 pt-12 pl-12 items-center gap-6'>
                                    <h3 className='text-4xl'>{t("Logofolio")}</h3>
                                    <svg className='group-hover:rotate-180 group-hover:scale-125 duration-700' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                    </svg>
                                </div>
                            </AnimatedLink>    
                            <Image src={"/assets/images/design/design-1.webp"} fill className={`group-hover:scale-110 duration-1000 rounded-md object-cover object-center`} alt='Logofolio section background' priority/>
                        </div>
                    </div>
                    <div className={`overflow-hidden w-[850px] h-[530px] relative group carousel-slide opacity-0 rounded-md`} >
                        <AnimatedLink href={'/web-design'} className={`absolute w-full h-full z-[11]`} />
                            <div className='relative z-10 flex pt-12 pl-12 items-center gap-6'>
                                <h3 className='text-4xl'>{t("WebDesign")}</h3>
                                <svg className='group-hover:rotate-180 group-hover:scale-125 duration-700' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                </svg>
                            </div>
                        <Image src={'/assets/images/design/design-2.webp'} fill className={`group-hover:scale-110 duration-1000 rounded-md object-cover object-center`} alt='Web design section background'/>
                    </div>
                    <div className={`overflow-hidden w-[850px] h-[530px] relative group carousel-slide opacity-0 rounded-md`} >
                        <AnimatedLink href={'/social-media'} className={`absolute w-full h-full z-[11]`} />
                            <div className=' relative z-10 flex pt-12 pl-12 items-center gap-6'>
                                <h3 className='text-4xl'>{t("SocialMedia")}</h3>
                                <svg className='group-hover:rotate-180 group-hover:scale-125 duration-700' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                </svg>
                            </div>
                        <Image src={'/assets/images/design/design-3.webp'} fill className='group-hover:scale-110 duration-1000 rounded-md object-cover object-center' alt='Social Media section background' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandingDesing;