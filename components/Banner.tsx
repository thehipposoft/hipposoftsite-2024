'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BACKGROUNDS = [
    '/assets/images/banner/banner-1.jpeg',
    '/assets/images/banner/banner-2.jpeg',
    '/assets/images/banner/banner-3.jpeg',
]

const Banner = () => {

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

    const tl = useRef<any>();
    
    useGSAP(() => {
        tl.current = gsap
        .timeline()
        .to('.layers', {
            opacity: 1,
            x: 0,
            stagger: 0.5,
            ease: 'back.in'
        })
        .from('.first__content > *', {
            opacity: 0,
            y: '-50%',
            rotate: '-12deg',
            duration: 1,
            ease: 'back.out',
            stagger: 0.3,
            delay: .2,
        })
        .to('.subTitle' , {
            opacity: 1,
            stagger: 0.3,
        })


    }, {scope: container});

    return (
        <div className='md:h-screen relative' ref={container}>
            {
                BACKGROUNDS.map((val, index) => {
                    return(
                        <div key={index} className={`${currentBackground === index ? 'opacity-100 -z-[1] transition-none' : ' '} opacity-0 absolute top-0 left-0 w-full h-full duration-700`}>
                            <Image 
                                src={val} 
                                layout='fill' alt='Desing Background' 
                                objectFit='cover' 
                                objectPosition='center 70%'
                            />
                        </div>
                    )
                })
            }
            <div className='layers__container relative z-20 h-screen flex flex-col md:flex-row'>
                <div 
                    className={`
                    layers opacity-0 -translate-x-24 w-full
                    md:h-full relative group flex justify-center items-center md:duration-500 duration-700
                    ${isToggleOne  ? 'md:w-1/2 h-[70vh] bg-black/70' : 'md:w-1/4 h-1/4'}
                    ${isToggleTwo  ? ' h-[15vh] bg-black/50 hover:bg-black/55' : ''} 
                    ${isToggleThree  ? 'h-[15vh] bg-black/45 hover:bg-black/55' : ''} 
                    `} 
                    onClick={toggleFunctionOne}
                >
                    <div className=''>
                        <div className={`first__content ${isToggleOne ? 'opacity-1 block md:-top-12' : ' hidden '} relative duration-1000 w-[400px] flex gap-8 flex-col justify-center items-center md:items-start`}>
                            <Image src={'/assets/logo.png'} width={150} height={250} alt='HippoSoft logo' />
                            <h4 className='text-cyan tracking-[0.5em]'>WE CREATE TO CONNECT</h4>
                            <h2 className='md:text-[64px] text-5xl leading-[72px]'>Branding & Design</h2>
                            <p>Where it all begins. Identity. innovation. Unique</p>
                            <Link 
                                className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                                href={'/design'}
                            >
                                DISCOVER
                            </Link>
                        </div>
                        <div className={`${isToggleOne ? 'hidden' : 'block'}  flex gap-4 flex-col justify-center  items-center`}>
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                </svg>
                                <h3 className='relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>DESIGN</h3>
                        </div>
                    </div>
                </div>
                <div 
                    className={`md:h-full layers opacity-0 -translate-x-24
                    ${isToggleTwo ? 'md:w-1/2 bg-black/70 h-[70vh]' : 'md:w-1/4 bg-black/50 hover:bg-black/60 h-[15vh]'}
                      bg-black/50  group h-full flex justify-center items-center origin-right md:duration-500 duration-700 relative `} 
                    onClick={toggleFunctionOnTwo}
                >
                    <div className=''>
                        <div className={`${isToggleTwo ? 'opacity-1 block' : ' hidden'} w-[400px] gap-8 duration-1000 flex flex-col justify-center items-center md:items-start`}>
                            <h4 className='text-cyan tracking-[0.5em]'>FROM DESIGN TO CODE</h4>
                            <h2 className='md:text-[64px] text-5xl leading-[72px]'>Web Development</h2>
                            <p className='px-10 text-center md:px-0 md:text-left'>Building is important but how is just as essential to us.</p>
                            <Link 
                                className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                                href={'/web-development'}
                            >
                                DISCOVER
                            </Link>
                        </div>
                        <div className={`${isToggleTwo ? 'hidden' : 'block'} subTitle opacity-0 flex gap-4 flex-col justify-center  items-center`}>
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                </svg>
                                <h3 className=' relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>WEB DEVELOPMENT</h3>
                        </div>
                    </div>
                </div>
                <div 
                    className={`md:h-full layers opacity-0 -translate-x-24
                    ${isToggleThree ? 'bg-black/70 md:w-1/2 h-[70vh]' : 'md:w-1/4 h-[15vh]'} 
                    ${isToggleOne  ? ' bg-black/40 hover:bg-black/55' : ''}
                    ${isToggleTwo  ? ' bg-black/50 hover:bg-black/55' : ''} 
                     bg-black/40   group flex justify-center items-center h-full origin-right md:duration-500 duration-700 relative `} 
                    onClick={toggleFunctionThree}
                >
                    <div className=''>
                        <div className={`${isToggleThree ? 'opacity-1 block -top-12' : 'opacity-0 hidden'} relative w-[400px] gap-8 duration-1000 flex flex-col justify-center items-center md:items-start`}>
                            <h4 className='text-cyan tracking-[0.5em]'>LET'S GROW TOGETHER</h4>
                            <h2 className='md:text-[64px] text-5xl leading-[72px] text-center md:text-left'>Are you an entrepenur?</h2>
                            <p className='px-8 text-center md:px-0 md:text-left'>A product that no one can see is meaningless. We focus on getting the company to the right audience through the right channels.</p>
                            <button className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'>DISCOVER</button>
                        </div>
                        <div className={`${isToggleThree ? 'hidden' : 'block'} subTitle opacity-0 flex gap-4 flex-col justify-center  items-center`}>
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                </svg>
                                <h3 className=' relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>ENTREPENUR</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;