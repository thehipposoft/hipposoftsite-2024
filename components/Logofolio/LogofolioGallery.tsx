'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';


const LogofolioGallery = ({ images }:any) => {
 
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.gallery__wrapper', {
            opacity: 0,
            scaleY: 0.6,
            left: 300,
            duration: 1.2,
            delay: .2,
            ease: 'power2.inOut'
        })
    })

    const { contextSafe } = useGSAP({ scope: container }); 

    const onClickOne = contextSafe(() => {
        gsap.to('.gallery__wrapper > *', { x: -375, duration: .7, ease: 'power2.inOut' });
    });

    const onClickTwo = contextSafe(() => {
        gsap.to('.gallery__wrapper > *', { x: -750, duration: .7, ease: 'power2.inOut' });
    });

    const onClickThree = contextSafe(() => {
        gsap.to('.gallery__wrapper > *', { x: -1125, duration: .7, ease: 'power2.inOut' });
    });

    const onClickFour = contextSafe(() => {
        gsap.to('.gallery__wrapper > *', { x: 0, duration: .7, ease: 'power2.inOut' });
    });

    return (
        <div ref={container}>
            <div className='gallery__wrapper origin-top flex relative overflow-hidden mx-auto'>
                <div className='min-w-[375px] h-[500px] relative' onClick={onClickOne}>
                    <Image src={images[0]} alt='RS' fill objectFit='contain' />
                </div>
                <div className='min-w-[375px] h-[500px] relative' onClick={onClickTwo}>
                    <Image src={images[1]} alt='RS' fill objectFit='contain'/>
                </div>
                <div className='min-w-[375px] h-[500px] relative' onClick={onClickThree}>
                    <Image src={images[2]} alt='RS' fill objectFit='contain'/>
                </div>
                <div className='min-w-[375px] h-[500px] relative' onClick={onClickFour}>
                    <Image src={images[3]} alt='RS' fill objectFit='contain'/>
                </div>
            </div>
        </div>
    );
};

export default LogofolioGallery;