'use client'
import Image from 'next/image';
import React, {useRef, useState, useEffect} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Menu = () => {

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
        .to('.overlay', {
            opacity: 1,
            zIndex: 20,
        })
        .to('.menu', {
            opacity: 1,
            delay: -0.75,
            duration: 1,
            x: 0,
            ease: 'power3.inOut',

        })
        .from('.links-list > *', {
            opacity: 0,
            yPercent: 25,
            delay: -0.5,
            ease: 'power2.inOut',
            stagger: .2
        })
        .reverse();
    }, {scope: container});

    useEffect(() => {
        tl.current.reversed(!openMenu);
    }, [openMenu])

    return (
        <div ref={container} className=''>
            <div 
                className='absolute top-12 right-24 hover:bg-white/30 rounded-xl px-2 py-3 duration-300 cursor-pointer z-40'
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
                absolute top-0 right-0 flex flex-col justify-center items-center bg-[#221b35] z-30 px-16 h-screen w-[400px] py-4`} >
                    <ul className='links-list flex flex-col gap-12'>
                        <li className='translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-1.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p className=''>Branding & Design</p>
                        </li>
                        <li className='translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-2.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p  className=''>Web Development</p>
                        </li>
                        <li className=' translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-3.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p  className=''>Projects</p>
                        </li>
                        <li className=' translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-4.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p  className=''>Entrepeneurs</p>
                        </li>
                        <li className='translate-y-4 flex items-center gap-3 group'>
                            <div className='bg-white p-2 rounded-full group-hover:scale-110 duration-500'>
                                <Image src={'/assets/images/vectors/menu-5.svg'} width={20} height={25} alt='' className='group-hover:scale-125 duration-500'/>
                            </div>
                            <p  className=''>Contact</p>
                        </li>
                        <div className='flex justify-between'>
                            <p className="tracking-wider inline-block bg-gradient-to-r from-[#9747FF] via-[#7B8FDD] to-[#09F4F4] bg-clip-text text-xl text-transparent">{formattedDate}</p>
                            <svg className='w-[30px] h-[30px]' fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.09.905h8.82c3.36 0 6.09 2.663 6.09 5.94v8.605a5.868 5.868 0 0 1-1.784 4.201 6.168 6.168 0 0 1-4.306 1.74H6.09c-3.36 0-6.09-2.663-6.09-5.94V6.845C0 5.27.642 3.759 1.784 2.645A6.168 6.168 0 0 1 6.09.905Zm-.21 2.048a3.829 3.829 0 0 0-2.673 1.08A3.642 3.642 0 0 0 2.1 6.641v9.014c0 2.039 1.69 3.688 3.78 3.688h9.24a3.829 3.829 0 0 0 2.673-1.08 3.642 3.642 0 0 0 1.107-2.608V6.641c0-2.038-1.69-3.688-3.78-3.688H5.88ZM16.013 4.49c.348 0 .681.135.928.375.246.24.384.566.384.905 0 .34-.138.666-.384.906a1.33 1.33 0 0 1-.928.375 1.33 1.33 0 0 1-.929-.375 1.265 1.265 0 0 1-.384-.906c0-.34.138-.665.384-.905.247-.24.58-.375.928-.375ZM10.5 6.026c1.392 0 2.728.54 3.712 1.5a5.059 5.059 0 0 1 1.538 3.622 5.059 5.059 0 0 1-1.538 3.622c-.984.96-2.32 1.5-3.712 1.5a5.317 5.317 0 0 1-3.712-1.5 5.06 5.06 0 0 1-1.538-3.622 5.06 5.06 0 0 1 1.538-3.622c.984-.96 2.32-1.5 3.712-1.5Zm0 2.049a3.19 3.19 0 0 0-2.227.9 3.036 3.036 0 0 0-.923 2.173c0 .815.332 1.597.923 2.173.59.576 1.392.9 2.227.9a3.19 3.19 0 0 0 2.227-.9c.591-.576.923-1.358.923-2.173s-.332-1.597-.923-2.173a3.19 3.19 0 0 0-2.227-.9Z" fill="url(#a)"/><defs><linearGradient id="a" x1="0" y1="11.636" x2="21" y2="11.636" gradientUnits="userSpaceOnUse"><stop stop-color="#9747FF"/><stop offset=".271" stop-color="#C88BC4"/><stop offset=".531" stop-color="#7B8FDD"/><stop offset=".771" stop-color="#86BFF2"/><stop offset="1" stop-color="#09F4F4"/></linearGradient></defs></svg>
                        </div>
                    </ul>

            </div>
        </div>
    );
};

export default Menu;