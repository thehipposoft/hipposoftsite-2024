'use client'
import Image from 'next/image';
import React, {useRef, useState, useEffect} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedLink from './commons/AnimatedLink';
import {useTranslations} from 'next-intl';

const Menu = () => {
    const t = useTranslations('Menu');
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const container = useRef<HTMLDivElement>(null);

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const openMenuFunc = () => setOpenMenu(!openMenu);

    const tl = useRef<any>();

    useGSAP(() => {
        tl.current = gsap
        .timeline()
        .to('.menu', {
            opacity: 1,
            x: 0,
            ease: 'sine.inOut',

        })
        .from('.links-list > *', {
            y: '-120%',
            rotate: '-12deg',
            ease: 'back.out',
            duration: .6,
            opacity: 0,
            delay: 0.1,
            stagger: .1,
        })

    }, {scope: container});

    useEffect(() => {
        tl.current.reversed(!openMenu);
    }, [openMenu])

    return (
        <div ref={container} className=''>
            <button 
                className='fixed md:top-4 top-7 md:right-6 right-7 hover:bg-white/20 bg-black/15 rounded-xl px-2 py-2 duration-500 cursor-pointer z-40'
                onClick={openMenuFunc}
            >
                <svg width="35" height="35" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect className={`duration-700  origin-left ${openMenu ? 'rotate-45 -translate-y-[6px]' : ''}`} width="30" height="2.75" rx="1.375" fill="#70FFE5"/>
                    <rect className={`duration-700  ${openMenu ? 'opacity-0' : ''}`} y="6.125" width="30" height="2.75" rx="1.375" fill="#70FFE5"/>
                    <rect className={`duration-700  origin-left ${openMenu ? '-rotate-45 translate-y-[6px]' : ''}`} y="12.25" width="30" height="2.75" rx="1.375" fill="#70FFE5"/>
                </svg>
            </button>
            <div className={`menu translate-x-[100%] opacity-100
                fixed top-0 right-0 flex flex-col justify-center items-center md:items-start bg-[#221b35] z-30 md:px-32 h-screen w-screen py-4`} >
                    <ul className='links-list flex flex-col gap-6 md:gap-10 2xl:gap-14 md:mx-auto lg:mx-0'>
                        <Image src={'/assets/logo.png'} alt='' width={1144} height={541} className='w-40' />
                        <AnimatedLink href={'/'} >
                            <div onClick={openMenuFunc} className='flex translate-y-4 items-center gap-4 lg:gap-6 group '>
                                <div className='bg-white p-3 rounded-full group-hover:scale-110 duration-500'>
                                    <Image src={'/assets/images/vectors/menu-3.svg'} width={40} height={40} alt='Web design status Vector' className='h-8 w-8 group-hover:scale-125 group-hover:rotate-90 duration-700'/>
                                </div>
                                <p className='thin uppercase md:text-4xl text-2xl group-hover:animate-pulse'>{t("Home")}</p>
                            </div>
                        </AnimatedLink>
                        <AnimatedLink href={'/design'} >
                            <div onClick={openMenuFunc} className='translate-y-4 flex items-center gap-4 lg:gap-6 group '>
                                <div className=' bg-white p-3 rounded-full group-hover:scale-110 duration-500'>
                                    <Image src={'/assets/images/vectors/menu-1.svg'} width={40} height={40} alt='Branding & Design vector' className='h-8 w-8 group-hover:scale-125 group-hover:rotate-90 duration-700'/>
                                </div>
                                <p className='thin uppercase md:text-4xl text-2xl group-hover:animate-pulse'>{t("Branding")}</p>
                            </div>
                        </AnimatedLink>
                        <AnimatedLink href={'/web-development'}>
                        <div onClick={openMenuFunc} className='translate-y-4 flex items-center gap-4 lg:gap-6 group '>
                            <div className='bg-white  p-3 rounded-full group-hover:scale-110 duration-500'>
                                    <Image src={'/assets/images/vectors/menu-2.svg'} width={40} height={40} alt='Web development vector' className='h-8 w-8 group-hover:scale-125 group-hover:rotate-90 duration-700'/>
                                </div>
                                <p  className=' thin uppercase md:text-4xl text-2xl group-hover:animate-pulse'>{t("Development")}</p>
                            </div>
                        </AnimatedLink>
                        <AnimatedLink href={'/portfolio'}>
                            <div onClick={openMenuFunc} className='translate-y-4 flex items-center gap-4 lg:gap-6 group '>
                                <div className='bg-white p-3 rounded-full group-hover:scale-110 duration-500'>
                                    <Image src={'/assets/images/vectors/menu-4.svg'} width={40} height={40} alt='Portfolio vector' className='h-8 w-8  group-hover:scale-125 group-hover:rotate-90 duration-700'/>
                                </div>
                                <p className='thin uppercase md:text-4xl text-2xl group-hover:animate-pulse'>{t("Portfolio")}</p>
                            </div>
                        </AnimatedLink>
                        <AnimatedLink href={'/contact'}>
                            <div onClick={openMenuFunc} className='translate-y-4 flex items-center gap-4 lg:gap-6 group '>
                                <div className='bg-white p-3 rounded-full group-hover:scale-110 duration-500'>
                                    <Image src={'/assets/images/vectors/menu-5.svg'} width={40} height={40} alt='Contact vector' className='h-8  w-8  group-hover:scale-125 group-hover:rotate-90 duration-700'/>
                                </div>
                                <p  className='thin uppercase md:text-4xl text-2xl group-hover:animate-pulse'>{t("Contact")}</p>
                            </div>
                        </AnimatedLink>
                        <div className='flex justify-between mt-8'>
                            <p className="text-2xl tracking-wider inline-block bg-gradient-to-r from-[#9747FF] via-[#7B8FDD] to-[#09F4F4] bg-clip-text text-transparent">{formattedDate}</p>
                            <AnimatedLink  rel='noreferrer' target='_blank' href={'https://www.instagram.com/thehipposoft/'}>
                                <svg className='scale-150 w-[30px]  h-[30px]' fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.09.905h8.82c3.36 0 6.09 2.663 6.09 5.94v8.605a5.868 5.868 0 0 1-1.784 4.201 6.168 6.168 0 0 1-4.306 1.74H6.09c-3.36 0-6.09-2.663-6.09-5.94V6.845C0 5.27.642 3.759 1.784 2.645A6.168 6.168 0 0 1 6.09.905Zm-.21 2.048a3.829 3.829 0 0 0-2.673 1.08A3.642 3.642 0 0 0 2.1 6.641v9.014c0 2.039 1.69 3.688 3.78 3.688h9.24a3.829 3.829 0 0 0 2.673-1.08 3.642 3.642 0 0 0 1.107-2.608V6.641c0-2.038-1.69-3.688-3.78-3.688H5.88ZM16.013 4.49c.348 0 .681.135.928.375.246.24.384.566.384.905 0 .34-.138.666-.384.906a1.33 1.33 0 0 1-.928.375 1.33 1.33 0 0 1-.929-.375 1.265 1.265 0 0 1-.384-.906c0-.34.138-.665.384-.905.247-.24.58-.375.928-.375ZM10.5 6.026c1.392 0 2.728.54 3.712 1.5a5.059 5.059 0 0 1 1.538 3.622 5.059 5.059 0 0 1-1.538 3.622c-.984.96-2.32 1.5-3.712 1.5a5.317 5.317 0 0 1-3.712-1.5 5.06 5.06 0 0 1-1.538-3.622 5.06 5.06 0 0 1 1.538-3.622c.984-.96 2.32-1.5 3.712-1.5Zm0 2.049a3.19 3.19 0 0 0-2.227.9 3.036 3.036 0 0 0-.923 2.173c0 .815.332 1.597.923 2.173.59.576 1.392.9 2.227.9a3.19 3.19 0 0 0 2.227-.9c.591-.576.923-1.358.923-2.173s-.332-1.597-.923-2.173a3.19 3.19 0 0 0-2.227-.9Z" fill="url(#a)"/><defs><linearGradient id="a" x1="0" y1="11.636" x2="21" y2="11.636" gradientUnits="userSpaceOnUse"><stop stopColor="#9747FF"/><stop offset=".271" stopColor="#C88BC4"/><stop offset=".531" stopColor="#7B8FDD"/><stop offset=".771" stopColor="#86BFF2"/><stop offset="1" stopColor="#09F4F4"/></linearGradient></defs></svg>
                            </AnimatedLink>
                        </div>
                    </ul>

            </div>
        </div>
    );
};

export default Menu;