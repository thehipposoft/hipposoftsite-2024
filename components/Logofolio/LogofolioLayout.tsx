'use client'
import Link from 'next/link';
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
            stagger: 0.2
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
        <div ref={container} className='h-full flex md:pt-[7%] pt-10 lg:gap-20 gap-16 flex-col md:w-[80vw] lg:max-w-[1250px] mx-auto'>
            <div className='layout__one flex flex-col gap-12 md:gap-16 lg:gap-0 lg:flex-row flex-wrap justify-between items-center lg:w-[1100px] mx-auto '>
                <Link href={'/logofolio/rock-steady-digital'} className='flex flex-col items-center gap-4 group'>
                    <div className='w-[220px] h-[120px] relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image src={'/assets/images/logofolio/rock-steady.png'} fill className='object-center'  alt='Rock Steady Logo' />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </Link>
                <Link href={'/logofolio/inspir-performance'} className='flex flex-col items-center gap-4 group'>
                    <div className='w-[190px] h-[100px] relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image src={'/assets/images/logofolio/inspir.png'} fill className='object-center'  alt='Inspir Logo' />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </Link>
                <Link href={'/logofolio/diversity-employment'} className='flex flex-col items-center gap-4 group'>
                    <div className='w-[280px] h-[80px] relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image src={'/assets/images/logofolio/diversity.png'} fill className='object-center'  alt='Diversity & Employment logo' />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </Link>
            </div>
            <div className='layout__two flex flex-col gap-20 md:gap-16 lg:gap-0 lg:flex-row flex-wrap justify-between lg:items-end items-center lg:w-[1200px] mx-auto'>
                <Link href={'/logofolio/destino-salta'} className='flex flex-col items-center gap-4 group'>
                    <div className='w-[170px] h-[180px] relative opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 -bottom-2 group-hover:bottom-2 duration-500'>
                        <Image src={'/assets/images/logofolio/destino.png'} fill className='object-center'  alt='Destino Salta Logo' />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </Link>
                <div className='w-[240px] h-[60px] relative opacity-60 -top-8'>
                    <Image src={'/assets/images/logofolio/logofolio-5.webp'} fill className='object-center' alt='Lisbon Licores naturales logo' />
                </div>
                <div className='w-[180px] h-[150px] relative opacity-60 -top-8'>
                    <Image src={'/assets/images/logofolio/logofolio-6.webp'} fill className='object-center'  alt='Organica natural store logo' />
                </div>
                <div className='w-[140px] h-[140px] relative opacity-60 -top-8'>
                    <Image src={'/assets/images/logofolio/logofolio-7.webp'} fill className='object-center'  alt='Shizen Japanese Experience logo' />
                </div>
            </div>
        </div>
    );
};

export default LogofolioLayout;