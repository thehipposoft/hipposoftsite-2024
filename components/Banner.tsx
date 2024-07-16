'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Banner = () => {

    const [isToggleOne, setIsToggleOne] = useState(true);
    const [isToggleTwo, setIsToggleTwo] = useState(false);
    const [isToggleThree, setIsToggleThree] = useState(false);

    const toggleFunctionOne = () => {
        setIsToggleOne(true)
        setIsToggleTwo(false)
        setIsToggleThree(false)
    }

    const toggleFunctionOnTwo = () => {
        setIsToggleOne(false)
        setIsToggleTwo(true)
        setIsToggleThree(false)
    }

    const toggleFunctionThree = () => {
        setIsToggleOne(false)
        setIsToggleTwo(false)
        setIsToggleThree(true)
    }

    const container = useRef<HTMLDivElement>(null)

    const { contextSafe } = useGSAP({ scope: container });

    const toggleFunction1 = contextSafe(() => {
        gsap.to('.first__content', { opacity: 1, top: 0, ease: 'power3.inOut'})
        setIsToggleOne(true)
        setIsToggleTwo(false)
        setIsToggleThree(false)
    })
    

    return (
        <div className='md:h-screen relative' ref={container}>
            <div className={`${isToggleOne ? 'opacity-1' : 'opacity-0'} duration-100 absolute top-0 left-0 w-full h-full`}>
                <Image 
                    src={'/assets/images/banner/banner-1.jpeg'} 
                    layout='fill' alt='Desing Background' 
                    objectFit='cover' 
                    objectPosition='center 70%'
                />
            </div>
            <div className={`${isToggleTwo ? 'opacity-1' : 'opacity-0'} duration-100 absolute top-0 left-0 w-full h-full`}>
                <Image 
                    src={'/assets/images/banner/banner-2.jpeg'} 
                    layout='fill' alt='Desing Background' 
                    objectFit='cover' 
                    objectPosition='center 70%'
                />
            </div>
            <div className={`${isToggleThree ? 'opacity-1' : 'opacity-0'} duration-100 absolute top-0 left-0 w-full h-full`}>
                <Image 
                    src={'/assets/images/banner/banner-3.jpeg'} 
                    layout='fill' alt='Desing Background' 
                    objectFit='cover' 
                    objectPosition='center 70%'
                />
            </div>
            <div className='layers-container h-screen flex'>
                <div 
                    className={`
                    ${isToggleOne  ? 'w-1/2 bg-black/70' : 'w-1/4'}
                    ${isToggleTwo  ? ' bg-black/50 hover:bg-black/55' : ''} 
                    ${isToggleThree  ? ' bg-black/45 hover:bg-black/55' : ''} 
                    h-full relative group
                    flex justify-center items-center duration-500
                    `} 
                    onClick={toggleFunction1}
                >
                    <div className=''>
                        <div className={`first__content ${isToggleOne ? 'opacity-1 block -top-12' : 'opacity-0 hidden '} relative duration-300 w-[400px] flex gap-4 flex-col justify-center`}>
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
                        </div>
                        <div className={`${isToggleOne ? 'hidden' : 'block'}  flex gap-2 flex-col justify-center  items-center`}>
                                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                </svg>
                                <h3 className='relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>DESIGN</h3>
                        </div>
                    </div>
                </div>
                <div 
                    className={`
                    ${isToggleTwo ? 'w-1/2 bg-black/70' : 'w-1/4'}
                    ${isToggleOne  ? ' bg-black/50 hover:bg-black/60' : ''}
                    ${isToggleThree  ? ' bg-black/50 hover:bg-black/60' : ''} 
                      bg-black/50 group h-full flex justify-center items-center origin-right duration-500 relative`} 
                    onClick={toggleFunctionOnTwo}
                >
                    <div className=''>
                        <div className={`${isToggleTwo ? 'opacity-1 block' : 'opacity-0 hidden'} w-[400px] gap-4 duration-200 flex flex-col justify-center`}>
                            <h4 className='text-cyan tracking-[0.5em]'>FROM DESIGN TO CODE</h4>
                            <h2 className='text-[64px] leading-[72px]'>Web Development</h2>
                            <p>Building is important but how is just as essential to us.</p>
                            <Link 
                                className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                                href={'/web-development'}
                            >
                                DISCOVER
                            </Link>
                        </div>
                        <div className={`${isToggleTwo ? 'hidden' : 'block'}  flex gap-2 flex-col justify-center  items-center`}>
                                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                </svg>
                                <h3 className='relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>WEB DEVELOPMENT</h3>
                        </div>
                    </div>
                </div>
                <div 
                    className={`
                    ${isToggleThree ? 'bg-black/70 w-1/2' : 'w-1/4'} 
                    ${isToggleOne  ? ' bg-black/40 hover:bg-black/55' : ''}
                    ${isToggleTwo  ? ' bg-black/50 hover:bg-black/55' : ''} 
                     bg-black/40 group flex justify-center items-center h-full origin-right duration-500 relative`} 
                    onClick={toggleFunctionThree}
                >
                    <div className=''>
                        <div className={`${isToggleThree ? 'opacity-1 block -top-12' : 'opacity-0 hidden'} relative w-[400px] gap-4 duration-200 flex flex-col justify-center `}>
                            <h4 className='text-cyan tracking-[0.5em]'>LET'S GROW TOGETHER</h4>
                            <h2 className='text-[64px] leading-[72px]'>Are you an entrepenur?</h2>
                            <p>A product that no one can see is meaningless. We focus on getting the company to the right audience through the right channels.</p>
                            <button className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'>DISCOVER</button>
                        </div>
                        <div className={`${isToggleThree ? 'hidden' : 'block'}  flex gap-2 flex-col justify-center  items-center`}>
                                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='opacity-0 group-hover:opacity-100 duration-300'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                </svg>
                                <h3 className='relative font-medium tracking-[0.5em] -top-4 duration-300 group-hover:top-0'>ENTREPENUR</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;