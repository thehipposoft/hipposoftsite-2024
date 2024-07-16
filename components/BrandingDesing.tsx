'use client'
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import BackButton from './commons/BackButton';


const BrandingDesing = () => {

    const DESIGN_DATA = [
        {
            name: 'Logofolio',
            image: '/assets/images/design/design-1.webp',
            customClass: 'image-animation',
        },
        {
            name: 'Web Design',
            image: '/assets/images/design/design-2.webp',
            customClass: 'carousel-slide',
        },
        {
            name: 'Social Media',
            image: '/assets/images/design/design-3.webp',
            customClass: 'carousel-slide',
        }
    ]

    const [state, setState] = useState({
        isActive1: true,
        isActive2: false,
        isActive3: false,
    })

    const setActive1 = () => {
        setState({
            isActive1: true,
            isActive2: false,
            isActive3: false,
        })
    }
    const setActive2 = () => {
        setState({
            isActive1: false,
            isActive2: true,
            isActive3: false,
        })
    }
    const setActive3 = () => {
        setState({
            isActive1: false,
            isActive2: false,
            isActive3: true,
        })
    }

    const container = useRef<HTMLDivElement>(null);

    const tl = useRef<any>();

    useGSAP(() => {
        tl.current = gsap
        .timeline({ defaults: {ease: 'power2.inOut'} })
        .to('.image-animation', {
            transformOrigin: 'bottom',
            width: 180,
            height: 220,
            duration: 1
        })
        .to('.image-animation', {
            transformOrigin: 'bottom',
            width: 300,
            duration: 1
        })
        .to('.image-animation', {
            transformOrigin: 'bottom',
            width: 850,
            height: 530,
            duration: 2,
        })
        .to(['.title', '.info', '.carousel-slide'], {
            opacity: 1,
        })


    }, {scope: container});

    const { contextSafe } = useGSAP({ scope: container }); 

    const onClickOne = contextSafe(() => {
        gsap.to('.carousel__wrapper', { x: 900, duration: 1.2, ease: 'power2.inOut' });
        setActive1()
    });
    const onClickTwo = contextSafe(() => {
        gsap.to('.carousel__wrapper', { x: 0, duration: 1.2, ease: 'power2.inOut' });
        setActive2()

    });
    const onClickThree = contextSafe(() => {
        gsap.to('.carousel__wrapper', { x: -900, duration: 1.2, ease: 'power2.inOut' });
        setActive3()
    });


    return (
        <div ref={container} className='h-screen bg-white'>
            <div className='title items-center opacity-0 flex justify-between w-full px-20 pt-16 pb-4'>
                <h1 className='text-black text-5xl'>Branding & Design</h1>
                <BackButton href={'/'} color='black' />
            </div>
            <div className={`bg-white flex flex-col justify-center items-center pt-8 relative overflow-hidden`}>
                <div className={`carousel__wrapper translate-x-[900px] flex gap-20 items-center`}>
                    <div className='w-[200px] h-[10px] relative image-animation' onClick={onClickOne}>
                        <Link href={'/logofolio'} className={`${state.isActive1 ? '' : 'hidden'} absolute w-full h-full z-[11]`} />
                        <div className='info relative z-10 flex opacity-0 pt-12 pl-12 items-center gap-3'>
                            <h3 className='text-4xl'>{DESIGN_DATA[0].name}</h3>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            </svg>
                        </div>
                        <Image src={DESIGN_DATA[0].image} fill objectFit='cover' objectPosition='center' alt='Inspir logo' className=''/>
                    </div>
                    <div className='w-[850px] h-[530px] relative carousel-slide opacity-0' onClick={onClickTwo}>
                        <Link href={'/web-design'} className={`${state.isActive2 ? '' : 'hidden'} absolute w-full h-full z-[11]`} />
                        <div className='relative z-10 flex pt-12 pl-12 items-center gap-3'>
                            <h3 className='text-4xl'>{DESIGN_DATA[1].name}</h3>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            </svg>
                        </div>
                        <Image src={DESIGN_DATA[1].image} fill objectFit='cover' objectPosition='center' alt='Inspir logo' className=''/>
                    </div>
                    <div className='w-[850px] h-[530px] relative carousel-slide opacity-0' onClick={onClickThree}>
                        <Link href={'/social-media'} className={`${state.isActive3 ? '' : 'hidden'} absolute w-full h-full z-[11]`} />
                        <div className=' relative z-10 flex pt-12 pl-12 items-center gap-3'>
                            <h3 className='text-4xl'>{DESIGN_DATA[2].name}</h3>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            </svg>
                        </div>
                        <Image src={DESIGN_DATA[2].image} fill objectFit='cover' objectPosition='center' alt='Inspir logo' className=''/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BrandingDesing;