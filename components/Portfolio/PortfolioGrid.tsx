'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PORTFOLIO_DATA } from './constants';
import Link from 'next/link';
import AnimatedLink from '../commons/AnimatedLink';
import BackButton from '../commons/BackButton';

const PortfolioGrid = () => {

    const container = useRef<HTMLDivElement>(null)

    const tl = useRef<any>(null)

    useGSAP(() => {
        gsap.from('.title', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            ease: 'back.out'
        })
        gsap.from('item', {
            opacity: 0,
        })
    }, {scope: container})

    return (
        <div ref={container} className='flex flex-col py-12 gap-12 justify-between items-center md:max-w-[1250px] mx-auto text-black'>
            <div className="title flex justify-between items-center md:w-[85vw] w-[80vw] md:max-w-[1250px] mx-auto gap-12 md:gap-0 lg:pt-0 pt-16">
                <h1 className="text-5xl">Our Projects</h1>
                <BackButton href="/" />
                <AnimatedLink href={'/'} className='lg:hidden '>
                    <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                        fill='#000000'/>
                    </svg>
                </AnimatedLink>
            </div>
            <div className='grid  lg:grid-cols-3 grid-cols-1 gap-12 lg:w-[85vw] md:w-[600px] w-[80vw] md:max-w-[1250px] md:self-baseline mx-auto'>
                {
                    PORTFOLIO_DATA.map((val, index) => (
                        <div className='flex flex-col gap-4 item' key={index}>
                            <AnimatedLink href={`/portfolio/${val.slug}`}  className=' w-[80vw] md:w-[600px] lg:w-[340px] h-[520px] relative group cursor-pointer pointer-events-none lg:pointer-events-auto' key={index}>
                                <div className='w-full h-full absolute top-0 left-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 duration-500 z-10'>
                                    <h4 className='px-8 tracking-[0.2em] font-medium py-3 text-white text-2xl'>DISCOVER</h4>
                                </div>
                                <Image src={val.data.mockGrid} alt={`${val.data.name} background`} fill className={`object-cover ${val.data.objectPosition} `} />
                                <div className='absolute bottom-4 left-4'>
                                    {val.data.logo_content}
                                </div>
                                <svg className='hidden lg:block absolute right-4 bottom-4 z-10 duration-500 group-hover:rotate-180 group-hover:scale-110' width="45" height="45" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                                    <path d="M1.25 20H38.75" className='group-hover:stroke-white duration-500' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                    <path d="M20 1.25V38.75" className='group-hover:stroke-white duration-500' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                </svg>
                            </AnimatedLink>
                            <div className='flex justify-between'>
                                <div className='flex flex-col'>
                                    <h4 className='text-xl'>{val.data.name}</h4>
                                    <p className='uppercase md:text-sm text-xs text-sora pt-2'>{val.data.industry}</p>
                                    <p className='uppercase md:text-sm text-xs text-sora'>{val.data.work}</p>
                                    <div className='flex gap-4 pt-2'>
                                        <h4 className='text-2xl'>{val.data.year}</h4>
                                        <Image src={val.data.flag} alt='country flag' width={35} height={24} />
                                        {val.data.secondFlag ? <Image src={val.data.secondFlag} alt='country flag' width={35} height={24} /> : <></>}
                                        {val.data.technologies_icons}
                                    </div>
                                </div>
                                <div className='flex items-center lg:hidden'>
                                    <Link 
                                        className='px-3 duration-700 text-center hover:bg-white/50 hover:scale-105 text-xs font-medium py-3 bg-cyan text-black rounded-3xl'
                                        href={val.data.href}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        DISCOVER SITE
                                    </Link>
                                </div>
                            </div>
                        </div>

                    ))  
                }
            </div>
        </div>

    );
};

export default PortfolioGrid;