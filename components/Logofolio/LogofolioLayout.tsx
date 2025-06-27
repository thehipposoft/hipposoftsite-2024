'use client'
import AnimatedLink from '../commons/AnimatedLink';
import Image from 'next/image';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LogofolioLayout = () => {

    const container = useRef(null)

    const tl = useRef<any>(null)

    useGSAP(() => {
        tl.current = gsap
        .timeline()
        .from('.layout__one > *', {
            opacity: 0,
            yPercent: 35,
            ease: 'power1.inOut',
            stagger: 0.2,
            delay: .5,
        })
        .from('.layout__two > *', {
            opacity: 0,
            yPercent: 35,
            ease: 'power1.inOut',
            stagger: 0.2,
            delay: -.2,
        })
    }, {scope: container})

    return (
        <div ref={container} className='h-full flex md:pt-[7%] pt-10 lg:gap-20 gap-16 flex-col md:w-[90vw] lg:max-w-[1250px] mx-auto'>
            <div className='layout__one flex flex-col gap-12 md:gap-16 lg:gap-0 lg:flex-row flex-wrap justify-between items-center lg:w-[1250px] mx-auto '>
                <AnimatedLink href={'/logofolio/rock-steady-digital'} className='flex flex-col items-center gap-4 group'>
                    <div className='relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image 
                            src={'/assets/images/logofolio/rock-steady.png'} 
                            width={1078}
                            height={580}
                            className='object-center w-[220px] h-[120px]'
                            alt='Rock Steady Logo' 
                        />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </AnimatedLink>
                <AnimatedLink href={'/logofolio/inspir-performance'} className=' flex flex-col items-center gap-4 group'>
                    <div className=' relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image 
                            src={'/assets/images/logofolio/inspir.png'} 
                            width={729}
                            height={390}
                            className='object-center w-[190px] h-[100px]'  
                            alt='Inspir Logo' 
                        />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </AnimatedLink>
                <AnimatedLink href={'/logofolio/diversity-employment'} className='flex flex-col items-center gap-4 group'>
                    <div className=' relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image 
                            src={'/assets/images/logofolio/diversity.png'} 
                            className='object-center w-[280px] h-[80px]'  
                            alt='Diversity & Employment logo'
                            width={1189}
                            height={330}
                         />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </AnimatedLink>
                <AnimatedLink href={'/logofolio/lumina-technologies'} className='flex flex-col items-center gap-4 group'>
                    <div className=' relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image 
                            src={'/assets/images/logofolio/lumina.png'} 
                            className='object-center w-[270px] h-[110px]'  
                            alt='Lumina Technologies logo'
                            width={882}
                            height={370}
                         />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </AnimatedLink>
            </div>
            <div className='layout__two flex flex-col gap-20 md:gap-16 lg:gap-0 lg:flex-row flex-wrap justify-between lg:items-end items-center lg:w-[1200px] mx-auto'>
                <AnimatedLink href={'/logofolio/destino-salta'} className='flex flex-col items-center gap-4 group'>
                    <div className=' relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image 
                            src={'/assets/images/logofolio/destino.png'} 
                            width={660}
                            height={686}
                            className='object-center w-[170px] h-[180px]'  
                            alt='Destino Salta Logo'
                         />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </AnimatedLink>
                <div className=' relative opacity-60 -top-8'>
                    <Image 
                        src={'/assets/images/logofolio/logofolio-5.webp'} 
                        width={732}
                        height={198}
                        className='object-center w-[240px] h-[60px]' 
                        alt='Lisbon Licores naturales logo'
                     />
                </div>
                <div className=' relative opacity-60 -top-8'>
                    <Image 
                        src={'/assets/images/logofolio/logofolio-6.webp'} 
                        width={364}
                        height={325}
                        className='object-center w-[180px] h-[150px]'  
                        alt='Organica natural store logo' 
                    />
                </div>
                <div className=' relative opacity-60 -top-8'>
                    <Image 
                        src={'/assets/images/logofolio/logofolio-7.webp'} 
                        width={934}
                        height={1036} 
                        className='object-center w-[140px] h-[140px]'  
                        alt='Shizen Japanese Experience logo'
                     />
                </div>
            </div>
        </div>
    );
};

export default LogofolioLayout;