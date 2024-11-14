'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BackButton from '../commons/BackButton';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);


const WebDevelopmentIndividualComp = ({props}:any) => {

    const container = useRef<HTMLDivElement>(null)

    let mm = gsap.matchMedia();

    useGSAP(() => {
        gsap.from('.title', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            ease: 'back.out'
        })

        mm.add("(min-width: 1300px)", () => {
            gsap.to('.line' , {
                width: '100%',
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: '.section',
                    start: 'top top',
                    end: '=+6000',
                    scrub: 2,
                    pin: true,
                }
            })
        })

        mm.add("(min-width: 1300px)", () => {
            gsap.to('.box', {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                stagger: 0.5,
                ease: 'back.out',
                scrollTrigger: {
                    trigger: '.section',
                    end: '=+5500',
                    scrub: 2,
                }
            })
        })

        mm.add("(max-width: 1300px)", () => {
            gsap.to('.box', {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'back.out',
            })
        })

        gsap.from('.scroll-text > *', {
            opacity: 0,
            x: -50,
            ease: 'back.out',
            stagger: .2,
            delay: 1.5,
        })
    })

    return (
        <div ref={container} className='section flex flex-col text-black lg:h-screen'>
            <div className='title lg:w-[1300px] w-[80vw] flex mx-auto justify-between items-center lg:pt-12 pt-20'>
                <h2 className='lg:text-6xl md:text-5xl text-4xl w-3/4 md:w-auto'>{props.title}</h2>
                <BackButton href='/web-development' />
                <Link href={'/web-development'} className='lg:hidden block'>
                    <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                        fill='#000000'/>
                    </svg>
                </Link>
            </div>
            <div className='timelapse gap-16 flex flex-col lg:mt-44 lg:mb-0 mt-20 md:mb-16'>
                <div className='line hidden lg:block h-[2px] w-[400px] bg-cyan' />
                <div className='box__wrapper lg:w-[1250px] w-[80vw] gap-16 mx-auto flex flex-col lg:flex-row justify-between mb-20 md:mb-0'>
                    {
                        props.boxes.map((val:any, index:any) => {
                            return(
                                <div className='box overflow-hidden md:first:opacity-100 md:first:translate-x-0 md:first:translate-y-0 md:first:rotate-0 opacity-0 translate-x-28 -translate-y-12 rotate-12 flex flex-col gap-8'>
                                    <h2 className='text-5xl thin italic'>0{index+1}</h2>
                                    <h3 className='thin uppercase'>{val.title}</h3>
                                    <p className='text-sm w-10/12'>{val.paragraph}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='scroll-text lg:flex items-center gap-4 w-[1300px] mx-auto absolute bottom-[10%] left-[5%] text-xl hidden'>
                <p className='thin'>S</p>
                <p className='thin'>C</p>
                <p className='thin'>R</p>
                <p className='thin'>O</p>
                <p className='thin'>L</p>
                <p className='thin'>L</p>
                <p className='thin'>&#10509;</p>
            </div>
        </div>
    );
};

export default WebDevelopmentIndividualComp;