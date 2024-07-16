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
                                    <div className='max-w-[1350px] mx-auto flex flex-col justify-between h-[85vh] relative pt-12 z-10'>
                                        <div className={`flex justify-between items-center text-${value.textColor}`}>
                                            <div className='flex flex-col gap-4'>
                                                <h2 className='title text-5xl'>Web Design</h2>
                                                <h4 className='slide__name text-2xl'>{value.name}</h4>
                                            </div>
                                            <div className='back opacity-0'>
                                                <BackButton href={'/design'} color={value.textColor} /> 
                                            </div>
                                        </div>
                                        <div className='navigation opacity-0 flex flex-col items-end gap-20'>
                                            <div 
                                            onMouseEnter={MouseEnter}
                                            onMouseLeave={MouseLeave}
                                            className='p-2 rounded-md cursor-pointer vector-container' 
                                            >
                                                <svg width="45" height="45" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg" className='vector' onClick={nextSlide}>
                                                    <path d="M1.25 20H38.75" stroke={`${value.vectorColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                                    <path d="M20 1.25V38.75" stroke={`${value.vectorColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                                </svg>
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
