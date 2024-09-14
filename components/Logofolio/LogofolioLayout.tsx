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
        <div ref={container} className='h-full flex md:pt-[7%] pt-10 md:gap-20 gap-12 flex-col md:max-w-[1250px] mx-auto'>
            <div className='layout__one flex flex-col gap-12 md:gap-0 md:flex-row flex-wrap justify-between items-center md:w-[1100px] mx-auto '>
                <Link href={'/logofolio/rock-steady-digital'} className='flex flex-col items-center gap-4 group'>
                    <div className='w-[220px] h-[100px] relative opacity-60 -bottom-2 group-hover:bottom-0 duration-300'>
                        <Image src={'/assets/images/logofolio/logofolio-1.webp'} fill className='object-center'  alt='' />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </Link>
                <Link href={'/logofolio/inspir-performance'} className='flex flex-col items-center gap-4 group'>
                    <div className='w-[190px] h-[100px] relative opacity-60 -bottom-2 group-hover:bottom-0 duration-300'>
                        <Image src={'/assets/images/logofolio/logofolio-2.webp'} fill className='object-center'  alt='' />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </Link>
                <Link href={'/logofolio/diversity-employment'} className='flex flex-col items-center gap-4 group'>
                    <div className='w-[280px] h-[80px] relative opacity-60 -bottom-2 group-hover:bottom-0 duration-300'>
                        <Image src={'/assets/images/logofolio/logofolio-3.webp'} fill className='object-center'  alt='' />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </Link>
            </div>
            <div className='layout__two flex flex-col gap-16 md:gap-0 md:flex-row flex-wrap justify-between md:items-end items-center md:w-[1200px] mx-auto'>
                <Link href={'/logofolio/destino-salta'} className='flex flex-col items-center gap-4 group'>
                    <div className='w-[170px] h-[180px] relative opacity-60 -bottom-2 group-hover:bottom-0 duration-300'>
                        <Image src={'/assets/images/logofolio/logofolio-4.webp'} fill className='object-center'  alt='' />
                    </div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </Link>
                <div className='w-[240px] h-[60px] relative opacity-60 -top-8'>
                    <Image src={'/assets/images/logofolio/logofolio-5.webp'} fill className='object-center' alt='' />
                </div>
                <div className='w-[180px] h-[150px] relative opacity-60 -top-8'>
                    <Image src={'/assets/images/logofolio/logofolio-6.webp'} fill className='object-center'  alt='' />
                </div>
                <div className='w-[140px] h-[140px] relative opacity-60 -top-8'>
                    <Image src={'/assets/images/logofolio/logofolio-7.webp'} fill className='object-center'  alt='' />
                </div>
            </div>
        </div>
    );
};

export default LogofolioLayout;