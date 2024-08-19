'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BANNER_DATA = [
    {
        closedTitle: 'Design',
        slug: 'WE CREATE TO CONNECT',
        title: 'Branding & Design',
        text: 'Where it all begins. Identity. innovation. Unique',
        href: '/design',
     },
     {
        closedTitle: 'Web Development',
        slug: 'WE CREATE TO CONNECT',
        title: 'Branding & Design',
        text: 'Where it all begins. Identity. innovation. Unique',
        href: '/design',
     },
     {
        closedTitle: 'Entrepenur',
        slug: 'WE CREATE TO CONNECT',
        title: 'Branding & Design',
        text: 'Where it all begins. Identity. innovation. Unique',
        href: '/design',
     },
]

const BannerTwo = () => {

    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const container = useRef<HTMLDivElement>(null)

    const { contextSafe } = useGSAP({ scope: container });

    const toggleFunction1 = contextSafe(() => {
        gsap.from('.first__content', { opacity: 0, top: -100, left: -100 , ease: 'power3.inOut'})
    })

    const setNewIndex = () => {
        if(currentIndex < BANNER_DATA.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentIndex(0)
        }
    }

    const tl = useRef<any>();

    useGSAP(() => {
        tl.current = gsap
        .timeline()
        .from('.layer__container', {
            opacity: 0,
            xPercent: -100,
            stagger: 0.4,
            duration: 1,
            ease: 'back.out'
        })
        .from('.layer__data > *', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            ease: 'back.out',
            stagger: 0.2,
        })
    }, {scope: container});


    return (
        <div className='md:h-screen relative bg-black/30' ref={container}>
            <div className='BACKGROUNDS hidden'>
                <div className={`absolute top-0 left-0 w-full h-full`}>
                    <Image 
                        src={'/assets/images/banner/banner-1.jpeg'} 
                        fill alt='Desing Background'
                        className='object-cover'
                        objectPosition='center 70%'
                    />
                </div>
                <div className={`absolute top-0 left-0 w-full h-full`}>
                    <Image 
                        src={'/assets/images/banner/banner-2.jpeg'} 
                        fill alt='Desing Background' 
                        className='object-cover'
                        objectPosition='center 70%'
                    />
                </div>
                <div className={`absolute top-0 left-0 w-full h-full`}>
                    <Image 
                        src={'/assets/images/banner/banner-3.jpeg'} 
                        fill alt='Desing Background' 
                        className='object-cover'
                        objectPosition='center 70%'
                    />
                </div>
            </div>
            <div className='container flex h-screen w-f'>
                <div className='section_col'>
                        <Image src={'/assets/logo.png'} width={150} height={250} alt='HippoSoft logo' />
                        <h4 className='text-cyan tracking-[0.5em]'>WE CREATE TO CONNECT</h4>
                        <h2 className='text-[64px] leading-[72px]'>Branding & Design</h2>
                        <p>Where it all begins. Identity. innovation. Unique</p>
                        <Link 
                            className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                            href={'/design'}
                        >
                            DISCOVER
                        </Link>
                    <div className={`section_col_data flex gap-2 flex-col justify-center  items-center`}>
                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        </svg>
                        <h3 className='relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>DESIGN</h3>
                    </div>
                </div>
                <div className='section_col'>
                        <Image src={'/assets/logo.png'} width={150} height={250} alt='HippoSoft logo' />
                        <h4 className='text-cyan tracking-[0.5em]'>WE CREATE TO CONNECT</h4>
                        <h2 className='text-[64px] leading-[72px]'>2</h2>
                        <p>Where it all begins. Identity. innovation. Unique</p>
                        <Link 
                            className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                            href={'/design'}
                        >
                            DISCOVER
                        </Link>
                    <div className={`section_col_data flex gap-2 flex-col justify-center  items-center`}>
                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        </svg>
                        <h3 className='relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>DESIGN</h3>
                    </div>
                </div>
                <div className='section_col'>
                        <Image src={'/assets/logo.png'} width={150} height={250} alt='HippoSoft logo' />
                        <h4 className='text-cyan tracking-[0.5em]'>WE CREATE TO CONNECT</h4>
                        <h2 className='text-[64px] leading-[72px]'>3</h2>
                        <p>Where it all begins. Identity. innovation. Unique</p>
                        <Link 
                            className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                            href={'/design'}
                        >
                            DISCOVER
                        </Link>
                    <div className={`section_col_data flex gap-2 flex-col justify-center  items-center`}>
                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        </svg>
                        <h3 className='relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>DESIGN</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerTwo;

/* 
{
    BANNER_DATA.map((val, index) => {
        return(
            <div className={`layer__container ${currentIndex === index ? 'w-1/2' : 'w-1/4'} group border flex flex-col gap-4 justify-center items-center`} key={index}>
                <div className={`${index === 0 ? '' : 'hidden'} relative w-[155px] h-[65px]`}>
                    <Image src={'/assets/logo.png'} fill alt='HippoSoft logo' />
                </div>
                <div className={`layer__data ${currentIndex === index ? 'flex' : 'hidden'} flex-col gap-6`}>
                    <h4 className='text-cyan tracking-[0.5em]'>{val.slug}</h4>
                    <h2 className='text-[64px] leading-[72px]'>{val.title}</h2>
                    <p>{val.text}</p>
                    <Link 
                        className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                        href={val.href}
                    >
                        DISCOVER
                    </Link>
                </div>
                <div 
                className={`${currentIndex === index ? 'hidden' : 'block'}`}
                onClick={setNewIndex}
                >
                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        </svg>
                        <h3 className='relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0 uppercase'>{val.closedTitle}</h3>
                </div>
            </div>
        )
    })
} */