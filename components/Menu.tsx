'use client'
import Image from 'next/image';
import React, {useRef, useState, useEffect} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Menu = () => {

    const container = useRef<HTMLDivElement>(null);

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const openMenuFunc = () => setOpenMenu(!openMenu);

    const tl = useRef<any>();

    useGSAP(() => {
        tl.current = gsap
        .timeline()
        .to('.overlay', {
            opacity: 1,
            duration: 1,
            zIndex: 10,
        })
        .to('.menu', {
            opacity: 1,
            delay: -0.75,
            duration: .5,
            xPercent: -125,
        })
    }, {scope: container});

    useEffect(() => {
        if(openMenu) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [openMenu])

    return (
        <div ref={container} className=''>
            <div 
                className='absolute top-12 right-24 hover:bg-white/30 rounded-xl px-2 py-3 duration-300 cursor-pointer z-20'
                onClick={openMenuFunc}
            >
                <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="2.75" rx="1.375" fill="#70FFE5"/>
                    <rect y="6.125" width="30" height="2.75" rx="1.375" fill="#70FFE5"/>
                    <rect y="12.25" width="30" height="2.75" rx="1.375" fill="#70FFE5"/>
                </svg>
            </div>
            <div className={`overlay ${openMenu ? '' : ''} -z-10 opacity-0 absolute w-full h-full top-0 bg-white/20 flex justify-end items-center`} />
            <div className={`menu translate-x-[100%] opacity-100 ${openMenu ? '' : ''}
                absolute top-24 right-0 flex flex-col justify-between bg-[#221b35] z-10 rounded-lg px-16 h-[450px] w-[300px] py-8`} >
                    <ul className='flex flex-col gap-7 pt-4'>
                        <li className='translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-1.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p className='text-sm'>Branding & Design</p>
                        </li>
                        <li className='translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-2.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p  className='text-sm'>Web Development</p>
                        </li>
                        <li className=' translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-3.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p  className='text-sm'>Projects</p>
                        </li>
                        <li className=' translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-4.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p  className='text-sm'>Entrepeneurs</p>
                        </li>
                        <li className='translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-5.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p  className='text-sm'>Contact</p>
                        </li>
                    </ul>
                    <div className='flex justify-between'>
                        <p>HORA</p>
                        <p>IG</p>
                    </div>
            </div>
        </div>
    );
};

export default Menu;