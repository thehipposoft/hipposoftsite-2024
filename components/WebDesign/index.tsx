'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { MutableRefObject, use, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import BackButton from '../commons/BackButton';

const WebDesignComp = () => {

    const WEBDESIGN_DATA = [
        {
            name: 'MB Analyst',
            background: '/assets/images/webdesign/mbanalyst.webp',
            href: 'https://www.mbanalyst.com/',
            textColor: 'black',
            vectorColor: '#000000',
        },
        {
            name: 'Rock Steady Digital',
            background: '/assets/images/webdesign/rocksteady.webp',
            href: 'https://www.rocksteadydigital.com.au/',
            textColor: 'white',
            vectorColor: '#70FFE5',
        },
        {
            name: 'Steel Art',
            background: '/assets/images/webdesign/steelart.webp',
            href: 'https://steelartsla.com.ar/',
            textColor: 'black',
            vectorColor: '#70FFE5',
        },
        {
            name: 'Destino Salta',
            background: '/assets/images/webdesign/destinosalta.webp',
            href: 'https://destinosalta.com.ar/',
            textColor: 'black',
            vectorColor: '#000000',
        },
        {
            name: 'Conrad Architect',
            background: '/assets/images/webdesign/conrad.webp',
            href: 'https://www.conradarchitect.com/',
            textColor: 'black',
            vectorColor: '#000000',
        },
    ]

    const container = useRef<HTMLDivElement>(null);

    const [index, setCurrentIndex] = useState<number>(1);

    const sliderMovement = 100 * index;

    const tl = useRef<any>();

    useGSAP(() => {
        tl.current = gsap
        .timeline()
        .from('.background-image', {
            scale: 0,
            opacity: 0,
            duration: 2,
            ease: 'circ.inOut'
        })
        .from('.title', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            ease: 'back.out'
        })
        .from('.slide__name', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            ease: 'back.out',
            delay: -0.5,
        })
        .to(['.navigation', '.back'], {
            opacity: 1,
            duration: 1.5,
            delay: -0.5,
        })



    }, {scope: container});

    const { contextSafe } = useGSAP({ scope: container }); 

    const nextSlide = contextSafe(() => {
        gsap.to('.slider__wrapper > *', { x: `-${sliderMovement}%`, duration: 1.2, ease: 'power3.inOut' });
        if(index < WEBDESIGN_DATA.length - 1) {
            setCurrentIndex(prev => prev + 1)
        } else {
            setCurrentIndex(0)
        }
    });

    const MouseEnter = contextSafe(() => {
        gsap.to('.vector', {
            rotate: 180,
            scale: 1.2,
            duration: .7,
            ease: 'power3.inOut',
        })
    });

    const MouseLeave = contextSafe(() => {
        gsap.to('.vector', {
            rotate: 0,
            scale: 1,
            duration: .7,
            ease: 'power3.inOut',
        })

    });

    return (
        <div className='h-screen w-screen' ref={container}>
            <div className='slider__wrapper relative overflow-hidden flex'>
                    {
                        WEBDESIGN_DATA.map((value, index) => {
                            return(
                                <div className='min-w-[100vw] min-h-screen relative' key={index}>
                                    <Image className='background-image' src={value.background} alt={`${value.name} site background`} fill objectFit='cover' />
                                    <div className='md:max-w-[1350px] max-w-[80vw] mx-auto flex flex-col justify-between md:h-[85vh] h-[92vh] relative md:pt-12 pt-6 z-10'>
                                        <div className={`flex justify-between items-center text-${value.textColor}`}>
                                            <div className='flex flex-col gap-4'>
                                                <h2 className='title text-5xl'>Web Design</h2>
                                                <h4 className='slide__name text-2xl'>{value.name}</h4>
                                            </div>
                                            <div className='back opacity-0'>
                                                <BackButton href={'/design'} color={value.textColor} />
                                                <Link href={'/design'} className='md:hidden '>
                                                    <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                                                        fill='#000000'/>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='navigation opacity-0 flex flex-col md:items-end items-center md:gap-20 gap-12'>
                                            <div 
                                                onMouseEnter={MouseEnter}
                                                onMouseLeave={MouseLeave}
                                                onClick={nextSlide}
                                                className='md:p-2 p-[10px] flex flex-col gap-2 items-center md:block rounded-md cursor-pointer vector-container bg-white/45 md:bg-transparent' 
                                            >
                                                <svg width="45" height="45" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg" className='vector' >
                                                    <path d="M1.25 20H38.75" stroke={`${value.vectorColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                                    <path d="M20 1.25V38.75" stroke={`${value.vectorColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                                </svg>
                                                <p className={`md:hidden text-[#000000]`}>See More</p>
                                            </div>
                                            <div>
                                                <Link 
                                                    className='px-8 tracking-[0.3em] text-sm font-medium py-3 bg-cyan text-black w-fit rounded-3xl'
                                                    href={value.href}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    DISCOVER NOW
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    );
};

export default WebDesignComp;
