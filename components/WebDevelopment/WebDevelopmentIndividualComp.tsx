'use client'
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BackButton from '../commons/BackButton';
import { ScrollTrigger } from "gsap/ScrollTrigger"


const WebDevelopmentIndividualComp = () => {

    const container = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from('.line', {
            scrollTrigger: {
                trigger: '.line',
                scrub: true,
                start: 'top bottom',
                end: 'top top'
            },
            scaleX: 0,
            transformOrigin: 'left center',
        })
    })

    return (
        <div ref={container} className=' flex flex-col text-black'>
            <div className='w-[1300px] flex mx-auto justify-between pt-16'>
                <h2 className='text-6xl'>Strategy and planning</h2>
                <BackButton href='/web-development' />
            </div>
            <div className='h-screen timelapse gap-8 flex flex-col mt-48'>
                <div className='line w-full h-1 bg-cyan' />
                <div className='w-[1300px] mx-auto flex'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-5xl'>01</h2>
                        <h3>Client consultation</h3>
                        <p>
                            TO Understand the client's business goals, target audience, and requirements.
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-5xl'>02</h2>
                        <h3>Client consultation</h3>
                        <p>
                            TO Understand the client's business goals, target audience, and requirements.
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-5xl'>03</h2>
                        <h3>Client consultation</h3>
                        <p>
                            TO Understand the client's business goals, target audience, and requirements.
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-5xl'>04</h2>
                        <h3>Client consultation</h3>
                        <p>
                            TO Understand the client's business goals, target audience, and requirements.
                        </p>
                    </div>
                </div>
            </div>
            <div className='h-screen timelapse gap-8 flex flex-col mt-48'>
                <div className='line w-full h-1 bg-cyan' />
                <div className='w-[1300px] mx-auto flex'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-5xl'>01</h2>
                        <h3>Client consultation</h3>
                        <p>
                            TO Understand the client's business goals, target audience, and requirements.
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-5xl'>02</h2>
                        <h3>Client consultation</h3>
                        <p>
                            TO Understand the client's business goals, target audience, and requirements.
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-5xl'>03</h2>
                        <h3>Client consultation</h3>
                        <p>
                            TO Understand the client's business goals, target audience, and requirements.
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-5xl'>04</h2>
                        <h3>Client consultation</h3>
                        <p>
                            TO Understand the client's business goals, target audience, and requirements.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebDevelopmentIndividualComp;