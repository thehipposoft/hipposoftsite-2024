'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedLink from './commons/AnimatedLink';

const BrandingDesignMobile = () => {

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

    const container = useRef(null)

    useGSAP(() => {
        gsap.from('.title', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            ease: 'back.out',
        })
        gsap.from('.images__layout > *' , {
            opacity: 0,
            delay: .5,
            duration: 1,
            yPercent: 45,
            stagger: 0.3,
        })
    }, {scope: container})

    
    return (
        <div ref={container} className='lg:hidden bg-white'>
            <div className='title items-center gap-8 flex justify-between w-full pt-24 px-8 pb-4'>
                <h1 className='text-black text-5xl light'>Branding & Design</h1>
                <AnimatedLink href={'/'}>
                    <svg className='' width="30" height="30" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                        fill='#000000'/>
                    </svg>
                </AnimatedLink>
            </div>
            <div className={`bg-white flex flex-col justify-center items-center pt-8 relative my-12`}>
                <div className={`images__layout flex flex-col gap-12 items-center`}>
                    <div className='w-[95vw] md:h-[530px] h-[400px] opacity-100 relative image-animation'>
                        <AnimatedLink href={'/logofolio'} className='absolute w-full h-full z-[11]'/>
                        <div className='info relative z-10 flex pt-12 pl-12 items-center gap-3'>
                            <h3 className='text-4xl'>{DESIGN_DATA[0].name}</h3>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                            </svg>
                        </div>
                        <Image 
                            src={DESIGN_DATA[0].image} 
                            fill 
                            className='object-cover object-center rounded-xl shadow-lg' 
                            alt='Logofolio section background' 
                            priority
                            sizes='95vw'
                        />
                    </div>
                    <div className='w-[95vw] md:h-[530px] h-[400px] relative carousel-slide'>
                        <AnimatedLink href={'/web-design'} className='absolute w-full h-full z-[11]' />
                        <div className='relative z-10 flex pt-12 pl-12 items-center gap-3'>
                            <h3 className='text-4xl'>{DESIGN_DATA[1].name}</h3>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                            </svg>
                        </div>
                        <Image
                            src={DESIGN_DATA[1].image} 
                            fill 
                            className='object-cover object-center rounded-xl shadow-lg' 
                            alt='Web design section background'
                            sizes='95vw'
                        />
                    </div>
                    <div className='w-[95vw] md:h-[530px] h-[400px] relative carousel-slide'>
                        <AnimatedLink href={'/social-media'} className='absolute w-full h-full z-[11]' />
                        <div className=' relative z-10 flex pt-12 pl-12 items-center gap-3'>
                            <h3 className='text-4xl'>{DESIGN_DATA[2].name}</h3>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                            </svg>
                        </div>
                        <Image 
                            src={DESIGN_DATA[2].image} 
                            fill 
                            className='object-cover object-center rounded-xl shadow-lg' 
                            alt='Social media section background' 
                            sizes='95vw'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandingDesignMobile;