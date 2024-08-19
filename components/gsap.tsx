'use client'
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(useGSAP, ScrollTrigger);

const Gsap = () => {

    useGSAP(() => {
        gsap.to('.square', {
            x: 600,
            rotate: 180,
            duration: 5,
            borderRadius: '5vw',
            scrollTrigger: {
                trigger: '.section-2',
                start: 'top top',
                end: '+=2000 70%',
                markers: true,
                scrub: 3,
                pin: true,
            },
        })
    })

    return (
        <div className='flex flex-col container w-screen'>
            <div className="section h-screen bg-amber-200 w-full">

            </div>
            <div className="section-2 h-screen bg-emerald-200 w-full flex flex-col gap-12">
                <div className='w-52 h-52 bg-black square'></div>
                <h1 className='text text-5xl mt-60'>Trigger</h1>
            </div>
            <div className="section h-screen bg-amber-200 w-full">

            </div>
                <div className="section h-screen bg-amber-200 w-full">

            </div>
        </div>
    );
};

export default Gsap;