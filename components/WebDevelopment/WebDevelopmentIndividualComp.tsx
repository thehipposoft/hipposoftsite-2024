'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BackButton from '../commons/BackButton';
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger);


const WebDevelopmentIndividualComp = ({props}:any) => {

    const container = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from('.title', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            ease: 'back.out'
        })

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

        gsap.from('.scroll-text > *', {
            opacity: 0,
            x: -50,
            ease: 'back.out',
            stagger: .2,
            delay: 1.5,
        })
    })

    return (
        <div ref={container} className='section flex flex-col text-black'>
            <div className='title w-[1300px] flex mx-auto justify-between items-center pt-12'>
                <h2 className='text-6xl'>{props.title}</h2>
                <BackButton href='/web-development' />
            </div>
            <div className='timelapse gap-16 flex flex-col mt-44'>
                <div className='line h-[2px] w-[400px] bg-cyan' />
                <div className='box__wrapper w-[1250px] mx-auto flex justify-between'>
                    {
                        props.boxes.map((val:any, index:any) => {
                            return(
                                <div className='box overflow-hidden first:opacity-100 first:translate-x-0 first:translate-y-0 first:rotate-0 opacity-0 translate-x-28 -translate-y-12 rotate-12 flex flex-col gap-8'>
                                    <h2 className='text-5xl thin italic'>0{index+1}</h2>
                                    <h3 className='thin uppercase'>{val.title}</h3>
                                    <p className='text-sm w-10/12'>{val.paragraph}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='scroll-text flex items-center gap-4 w-[1300px] mx-auto pt-32 text-xl '>
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