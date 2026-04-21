'use client'
import React, {useRef} from 'react'
import AnimatedLink from '../commons/AnimatedLink'
import BackButton from '../commons/BackButton'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LogofolioSingleComp from './LogofolioSingleComp'
import {useTranslations} from 'next-intl';

gsap.registerPlugin(ScrollTrigger);


interface LogofolioTypes {
    logo: string,
    backgroundOne: string,
    backgroundTwo: string,
    itemImage: string,
    contain?: boolean,
    left? : boolean
    gallery?: string[],
    colorPrimary: string,
    colorSecondary: string[],
    legend: string,
    backgroundLegend?: string,
    backgroundLegendImage?: string,
    backgroundThree: string,
    backgroundFinal: string,
    name: string,
    country: string,
    date: string,
    href?: string
}

type LogofolioObjectTypes = {
    data: LogofolioTypes
}

const NewLogofolioComp = ({
    data
}:LogofolioObjectTypes) => {

    let mm = gsap.matchMedia();
    const t = useTranslations('LogofolioRockSteady');
    const container = useRef(null)

    useGSAP(() => {
        mm.add("(min-width: 1200px)", () => {
            gsap.to(".head", {
                scrollTrigger: {
                    start: "0 top",
                    end: "300 25%",
                    scrub: 2,
                },
            minHeight: "4rem",
            backgroundColor: "#FFFFFF30"
            })
        })
        mm.add("(max-width: 600px)", () => {
            gsap.to(".head", {
                scrollTrigger: {
                    start: "0 top",
                    end: "300 25%",
                    scrub: 2,
                },
            minHeight: "8rem",
            backgroundColor: "#FFFFFF30"
            })
        })
        gsap.from('.title', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            delay: 1,
            ease: 'back.out'
        })
        gsap.from(".svg", {
            opacity: 0,
            duration: 1,
            delay: 3,
            y: -50,
        })
        gsap.to(".svg", {
            scrollTrigger: {
                    trigger: container.current,
                    start: "20 top",
                    scrub: 2,
                },
            opacity: 0,
            duration: 2,
        })
        gsap.to(".title", {
            scrollTrigger: {
                start: "0 top",
                end: "300 25%",
                scrub: 2,
            },
        fontSize: "2rem",
        })

        gsap.from(".logo", {
            scrollTrigger: {
                trigger: ".logo",
                start: "-40% center",
                end: "center center",
                scrub: 1,
            },
            opacity: 0,
            y: 25,
            scale: .8
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".legend-container",
                start: "top top",
            },
        })
        tl.from(".reveal", {
            opacity: 0,
            y: 10,
            stagger: 0.1
        })
    }, {scope: container})



  return (
    <div ref={container} className='flex flex-col'>
        <div className='absolute bottom-5 left-1/2 -translate-x-1/2 z-30'>
            <svg className='svg animate-float  w-24 ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.70711 9.71069c-.39053.39051-.39053 1.02371 0 1.41421l4.89219 4.8874c.7812.7804 2.047.7801 2.8278-.0006l4.8903-4.8904c.3906-.3905.3906-1.0237 0-1.41422-.3905-.39053-1.0237-.39053-1.4142 0l-4.1856 4.18562c-.3905.3906-1.0237.3905-1.4142 0L7.12132 9.71069c-.39052-.39053-1.02369-.39053-1.41421 0Z" fill="#70FFE5"/></svg>
        </div>
        <div className='head min-h-44 flex items-end md:items-center pb-3 md:pb-0 justify-between mx-auto max-w-6xl w-full sticky top-0 bg-white rounded-b-xl px-6 z-30 backdrop-blur-md'>
            <h1 className='text-5xl text-black title'>
                {data.name}
            </h1>
            <div className='flex items-center gap-8 title'>
                <h4 className='text-base hidden md:block text-black'>Logofolio</h4>
                <BackButton href='/logofolio' color='#000000' />
                <AnimatedLink href={'/logofolio'} className='lg:hidden block'>
                    <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                        fill='#000000'/>
                    </svg>
                </AnimatedLink>
            </div>
        </div>
        <div className='h-[150vh] flex justify-center sticky top-0 pt-[35vh]'>
            <Image sizes='100vw' fill src={data.backgroundOne} alt='Background' className='-z-10' />
            <Image src={data.logo} alt={`${data.name} Logo`} sizes='375px' width={375} height={200} className='object-contain logo max-h-[250px] ' />
        </div>
        <div className='h-screen sticky top-0'>
            <Image sizes='100vw' src={data.backgroundTwo} fill className='object-cover' alt={`${data.name} image 2`} />
        </div>
        <div className='h-screen flex flex-col lg:flex-row relative'>
            <div className={`${data.contain ? "bg-white" : ""} lg:w-1/2 relative h-screen`}>
                <Image sizes='50vw' src={data.itemImage} fill className={`${data.contain ? "object-contain" : "object-cover"} ${data.left && "object-left"}`} alt='Object image' />
            </div>
            <div style={{gridTemplateColumns: `repeat(${data.colorSecondary.length}, minmax(0, 1fr))`}} className={'lg:w-1/2 grid grid-rows-2 h-screen'}>
                <div style={{backgroundColor: data.colorPrimary}} className={` col-span-full flex justify-end items-end p-4 w-full`}>
                    {data.colorPrimary}
                </div>
                {
                    data.colorSecondary.map((val, index) => (
                        <div style={{backgroundColor: val}} key={index} className='flex justify-end p-4 col-span-1'>
                            <p className={`${val === "#FFFFFF" ? "text-black" : ""}`}>{val}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex lg:flex-row flex-col h-screen legend-container sticky top-0'>
                <div style={{backgroundColor: data.backgroundLegend}} className='lg:w-1/2 flex justify-center items-center relative h-screen lg:h-auto'>
                    {data.backgroundLegendImage && <Image sizes='50vw' src={data.backgroundLegendImage} alt='Legend background Image' fill className='object-cover' />}
                    <div className='flex flex-wrap justify-center gap-1 max-w-xl text-center text-2xl light relative z-20 px-8 md:px-0 w-3/5'>
                        {
                            data.legend.split(" ").map((char:any, index:any) => (
                                    <p className='reveal' key={index}>{char}</p>
                            ))
                        }
                    </div>
                </div>
                <div className='lg:w-1/2 relative' style={{backgroundColor: data.backgroundLegend}}>
                    <Image sizes='50vw' src={data.backgroundThree} fill className={`${data.contain ? "object-contain" : "object-cover"} legend-image`} alt='Background three' />
                </div>
            </div>
            <div style={{backgroundColor: data.backgroundLegend}} className='h-[50vh]' />
        </div>
        <div className='h-screen sticky top-0 flex items-end pb-12 '>
            <Image src={data.backgroundFinal} alt='' className='object-cover -z-10' fill />
        </div>
        <LogofolioSingleComp data={data} />
    </div>
  )
}

export default NewLogofolioComp