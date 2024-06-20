'use client'
import Image from 'next/image';
import React, {useState} from 'react';

const Menu = () => {

    const [openMenu, setOpenMenu] = useState<boolean>(false)

    const openMenuFunc = () => setOpenMenu(!openMenu);

    return (
        <div>
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
            <div className={`${openMenu ? 'opacity-1 z-10' : 'opacity-0'} absolute w-full h-full top-0 duration-700 bg-white/20 flex justify-end items-center`} />
            <div className={`${openMenu ? 'right-24' : '-right-[20%]'}
                absolute top-24 duration-700 flex flex-col justify-between bg-[#291959] z-10 rounded-lg px-8 py-4`} >
                    <ul className='flex flex-col gap-4'>
                        <li className='flex items-center gap-4'>
                            <div className='bg-white p-2 rounded-full'>
                                <Image src={'/assets/images/vectors/menu-1.svg'} width={25} height={25} alt='' />
                            </div>
                            <p>Branding & Design</p>
                        </li>
                        <li className='flex items-center gap-4'>
                            <div className='bg-white p-2 rounded-full'>
                                <Image src={'/assets/images/vectors/menu-1.svg'} width={25} height={25} alt='' />
                            </div>
                            <p>Branding and Design</p>
                        </li>
                        <li className='flex items-center gap-4'>
                            <div className='bg-white p-2 rounded-full'>
                                <Image src={'/assets/images/vectors/menu-1.svg'} width={25} height={25} alt='' />
                            </div>
                            <p>Branding and Design</p>
                        </li>
                        <li className='flex items-center gap-4'>
                            <div className='bg-white p-2 rounded-full'>
                                <Image src={'/assets/images/vectors/menu-1.svg'} width={25} height={25} alt='' />
                            </div>
                            <p>Branding and Design</p>
                        </li>
                        <li className='flex items-center gap-4'>
                            <div className='bg-white p-2 rounded-full'>
                                <Image src={'/assets/images/vectors/menu-1.svg'} width={25} height={25} alt='' />
                            </div>
                            <p>Branding and Design</p>
                        </li>
                        <li className='flex items-center gap-4'>
                            <div className='bg-white p-2 rounded-full'>
                                <Image src={'/assets/images/vectors/menu-1.svg'} width={25} height={25} alt='' />
                            </div>
                            <p>Branding and Design</p>
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