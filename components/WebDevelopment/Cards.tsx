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
            description: 'Start Strong. The success of any project begins with careful planning. Together we will define clear objectives, create a detailed plan, and establish a robust foundations. ',
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
            <div className='title flex lg:w-[1250px] w-[80vw] mx-auto lg:pt-12 pt-20 justify-between items-center text-black'>
                <h2 className='md:text-5xl text-4xl w-3/4 md:w-auto'>Web Development</h2>
                <BackButton href={'/'} />
                <Link href={'/'} className='lg:hidden block '>
                    <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                        fill='#000000'/>
                    </svg>
                </Link>
            </div>
            <div ref={container} className='lg:max-w-[1400px] max-w-[80vw] mx-auto flex flex-col lg:flex-row justify-between lg:items-end gap-20 md:gap-32 lg:gap-0 pt-12 lg:pt-0 lg:h-[600px] overflow-hidden'>
                {
                    CARDS_DATA.map((val, index) => {
                        return(
                            <div className={`card card-${index} group relative`} key={index}>
                                <Link href={val.href} className={`flex flex-col gap-4 text-black lg:max-w-[320px] max-w-[80vw] relative`}>
                                    <div className='relative lg:w-[320px] w-[80vw] h-[240px]'>
                                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative z-10 left-[85%] top-[5%] duration-500 group-hover:scale-125'>
                                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                        </svg>
                                        <Image fill alt={`${val.title} image`} src={val.image} objectFit='cover' />
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