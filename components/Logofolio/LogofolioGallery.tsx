'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';


const LogofolioGallery = ({ images, vc }:any) => {

    const container = useRef<HTMLDivElement>(null);

    let mm = gsap.matchMedia();

    useGSAP(() => {
        mm.add("(min-width: 1300px)", () => {
            gsap.from('.gallery__wrapper', {
                opacity: 0,
                scaleY: 0.6,
                left: 300,
                duration: 1.2,
                delay: .2,
                ease: 'power2.inOut'
            })
        })
    })

    const { contextSafe } = useGSAP({ scope: container });

    const onClickOne = contextSafe(() => {
        gsap.to('.gallery__wrapper > *', { x: '-100%', duration: .7, ease: 'power2.inOut' });
    });

    const onClickTwo = contextSafe(() => {
        gsap.to('.gallery__wrapper > *', { x: '-200%', duration: .7, ease: 'power2.inOut' });
    });

    const onClickThree = contextSafe(() => {
        gsap.to('.gallery__wrapper > *', { x: '-300%', duration: .7, ease: 'power2.inOut' });
    });

    const onClickFour = contextSafe(() => {
        gsap.to('.gallery__wrapper > *', { x: '0', duration: .7, ease: 'power2.inOut' });
    });

    return (
        <div ref={container}>
            <div className='gallery__wrapper origin-top flex relative overflow-hidden mx-auto rounded-md'>
                <div className='md:min-w-[450px] lg:min-w-[375px] min-w-[80vw] md:h-[550px] h-[450px] relative group cursor-pointer' onClick={onClickOne}>
                    <Image src={images[0]} alt='Gallery first image' fill className='object-cover' />
                    <svg className='absolute right-4 bottom-4 z-10 duration-500 group-hover:rotate-180 group-hover:scale-110' width="45" height="45" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                        <path d="M1.25 20H38.75" stroke={`${vc[0]}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke={`${vc[0]}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </div>
                <div className='md:min-w-[450px] lg:min-w-[375px] min-w-[80vw] md:h-[550px] h-[450px] relative group cursor-pointer' onClick={onClickTwo}>
                    <Image src={images[1]} alt='Gallery second image' fill className='object-cover' />
                    <svg className='absolute right-4 bottom-4 z-10 duration-500 group-hover:rotate-180 group-hover:scale-110' width="45" height="45" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                        <path d="M1.25 20H38.75" stroke={`${vc[1]}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke={`${vc[1]}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </div>
                <div className='md:min-w-[450px] lg:min-w-[375px] min-w-[80vw] md:h-[550px] h-[450px] relative group cursor-pointer' onClick={onClickThree}>
                    <Image src={images[2]} alt='Gallery third image' fill className='object-cover' />
                    <svg className='absolute right-4  bottom-4 z-10 duration-500 group-hover:rotate-180 group-hover:scale-110' width="45" height="45" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                        <path d="M1.25 20H38.75" stroke={`${vc[2]}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke={`${vc[2]}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </div>
                <div className='md:min-w-[450px] lg:min-w-[375px] min-w-[80vw] md:h-[550px] h-[450px] relative group cursor-pointer' onClick={onClickFour}>
                    <Image src={images[3]} alt='Gallery fourth image' fill className='object-cover' />
                    <svg className='absolute right-4 bottom-4 z-10 duration-500 group-hover:rotate-180 group-hover:scale-110' width="45" height="45" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                        <path d="M1.25 20H38.75" stroke={`${vc[3]}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke={`${vc[3]}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default LogofolioGallery;