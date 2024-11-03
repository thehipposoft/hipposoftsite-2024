'use client'
import Link from 'next/link';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type ButtonTypes = {
    href: string,
    color?: string,
    bgColor?: string,
    ref?: any,
}

const BackButton = ({ href, color }:ButtonTypes) => {

    const container = useRef(null)

    const { contextSafe } = useGSAP({ scope: container }); 

    const mouseEnterAnimation = contextSafe(() => {
        gsap.to('.overlay', { opacity: 1, width: '100%', duration: .5, ease: 'power2.inOut' });
        gsap.to('.back-text', { opacity: 1, duration: .5, y: 0, rotate: 0,  ease: 'power2.inOut' });
    });

    const mouseLeaveAnimation = contextSafe(() => {
        gsap.to('.overlay', { opacity: 0, width: 0, duration: .5, ease: 'power2.inOut' });
        gsap.to('.back-text', { opacity: 0, duration: .5, y: '-120%', rotate: '-12deg',  ease: 'power2.inOut' });
    });


    return (
        <Link 
            ref={container}
            href={href}
            onMouseEnter={mouseEnterAnimation}
            onMouseLeave={mouseLeaveAnimation}
            className='hidden relative md:flex md:flex-row-reverse items-center justify-center gap-2 px-5 py-1 overflow-hidden'
         >
            <div className='overlay bg-black/20 absolute top-0 left-0 w-0 h-full rounded-3xl opacity-0' />
            <svg className='arrow' width="13" height="13" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                fill={`${color ? `${color}` : 'black'} `}/>
            </svg>
            <p className={`text-[${color}] back-text opacity-0 -translate-y-[120%] -rotate-12`}>Back</p>
        </Link>
    );
};

export default BackButton;