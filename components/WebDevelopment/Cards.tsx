'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BackButton from '../commons/BackButton';

const Cards = () => {
    const CARDS_DATA = [
        {
            href: '/web-development/strategy-and-planning',
            image: '/assets/images/logofolio/diversity/diversity-1.webp',
            title: 'Strategy and Planning',
            description: 'Start Strong. The success of any project begins with careful planning.  Together we will define clear objectives, create a detailed plan, and establish a robust foundations. ',
        },
        {
            href: '/web-development/hosting',
            image: '/assets/images/webdesign/steelart.webp',
            title: 'Hosting, Domain Search and Configuration',
            description: 'Ensuring your technical infrastructure is strong and properly set up is our top priority. We take every measure to create a resilient and seamlessly functioning foundation for your project, so you can focus on achieving your goals with confidence.',
        },
        {
            href: '/web-development/development-and-implementation',
            image: '/assets/images/web-development/web-development-3.jpeg',
            title: 'Development and implementation',
            description: 'We meticulously construct your website based on a well-crafted strategy and an intentional design. Our approach ensures that every element aligns with your vision and goals, resulting in a powerful online presence that stands out.',
        },
        {
            href: '/web-development/launch-and-maintenance',
            image: '/assets/images/design/design-2.webp',
            title: 'Launch and Maintenance',
            description: 'We launch your website and commit to its ongoing functionality and performance. Our dedicated support ensures your site runs smoothly, providing a seamless experience for your users now and in the future.',
        },
    ]

    const container = useRef<HTMLDivElement>(null)

    const tl = useRef<any>(null)

    useGSAP(() => {
        gsap.set('.card-1', {bottom: 50})
        gsap.set('.card-2', {bottom: 100})
        gsap.set('.card-3', {bottom: 150})
        tl.current = gsap
        .timeline()
        .from('.title', {
            opacity: 0,
            y: '-120%',
            rotate: '-12deg',
            duration: 1.2,
            ease: 'back.out'
        })
        gsap.from('.card', {
            delay: 1,
            opacity: 0,
            yPercent: 15,
            ease: 'back.out',
            stagger: .3,
            duration: .7,
        })
    })

    return (
        <div>
            <div className='title flex w-[1250px] mx-auto pt-12 justify-between items-center text-black'>
                <h2 className='text-5xl'>Web Development</h2>
                <BackButton href={'/'} />
            </div>
            <div ref={container} className='max-w-[1400px] mx-auto flex justify-between items-end h-[600px] overflow-hidden'>
                {
                    CARDS_DATA.map((val, index) => {
                        return(
                            <div className={`card card-${index} group relative`} key={index}>
                                <Link href={val.href} className={`flex flex-col gap-4 text-black max-w-[320px] relative`}>
                                    <div className='relative w-[320px] h-[240px]'>
                                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative z-10 left-[85%] top-[5%] duration-500 group-hover:scale-125'>
                                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                        </svg>
                                        <Image fill alt={`Image ${val.title}`} src={val.image} objectFit='cover' />
                                    </div>
                                    <h4 className='group-hover:pt-3 group-hover:mb-3 duration-500'>{val.title}</h4>
                                    <p className='text-sm  duration-500'>{val.description}</p>
                                </Link>
                             </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Cards;

/*

              <div className='card'>
                    <Link href={CARDS_DATA[0].href} className='flex flex-col gap-4 text-black max-w-[320px] relative'>
                        <div className='relative w-[320px] h-[240px]'>
                            <Image fill alt={`Image ${CARDS_DATA[0]}`} src={CARDS_DATA[0].image} objectFit='cover' />
                        </div>
                        <h4>{CARDS_DATA[0].title}</h4>
                        <p className='text-sm'>{CARDS_DATA[0].description}</p>
                    </Link>
                </div>
                <div className='card'>
                    <Link href={CARDS_DATA[1].href} className='flex flex-col gap-4 text-black max-w-[320px] relative bottom-[50px]'>
                        <div className='relative w-[320px] h-[240px]'>
                            <Image fill alt={`Image ${CARDS_DATA[1]}`} src={CARDS_DATA[1].image} objectFit='cover' />
                        </div>
                        <h4>{CARDS_DATA[1].title}</h4>
                        <p className='text-sm'>{CARDS_DATA[1].description}</p>
                    </Link>
                </div>
                <div className='card'>
                    <Link href={CARDS_DATA[2].href} className='flex flex-col gap-4 text-black max-w-[320px] relative bottom-[100px]'>
                        <div className='relative w-[320px] h-[240px]'>
                            <Image fill alt={`Image ${CARDS_DATA[2]}`} src={CARDS_DATA[2].image} objectFit='cover' />
                        </div>
                        <h4>{CARDS_DATA[2].title}</h4>
                        <p className='text-sm'>{CARDS_DATA[2].description}</p>
                    </Link>
                </div>
                <div className='card'>
                    <Link href={CARDS_DATA[3].href} className='flex flex-col gap-4 text-black max-w-[320px] relative bottom-[150px]'>
                        <div className='relative w-[320px] h-[240px]'>
                            <Image fill alt={`Image ${CARDS_DATA[3]}`} src={CARDS_DATA[3].image} objectFit='cover' />
                        </div>
                        <h4>{CARDS_DATA[3].title}</h4>
                        <p className='text-sm'>{CARDS_DATA[3].description}</p>
                    </Link>
                </div>
*/