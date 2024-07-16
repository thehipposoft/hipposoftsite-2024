import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackButton from '../commons/BackButton';

const LogofolioComp = () => {
    return (
        <div className='h-screen flex flex-col'>
            <div className='flex w-[1250px] mx-auto pt-12 justify-between items-center text-black'>
                <h2 className='text-5xl'>LOGOFOLIO</h2>
                <BackButton href={'/design'} />
            </div>
            <div className='h-full flex pt-[7%] gap-20 flex-col max-w-[1250px] mx-auto'>
                <div className='flex flex-wrap justify-between items-center w-[1100px] mx-auto '>
                    <Link href={'/logofolio/rock-steady-digital'} className='flex flex-col items-center gap-2 group'>
                        <div className='w-[220px] h-[100px] relative opacity-60 -bottom-2 group-hover:bottom-0 duration-300'>
                            <Image src={'/assets/images/logofolio/logofolio-1.webp'} fill objectFit='center' alt='' />
                        </div>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative -top-8 opacity-0 group-hover:top-0 group-hover:opacity-100 duration-500'>
                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        </svg>
                    </Link>
                    <Link href={'/logofolio/inspir-performance'} className='flex flex-col items-center gap-2 group'>
                        <div className='w-[190px] h-[100px] relative opacity-60 -bottom-2 group-hover:bottom-0 duration-300'>
                            <Image src={'/assets/images/logofolio/logofolio-2.webp'} fill objectFit='center' alt='' />
                        </div>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative -top-8 opacity-0 group-hover:top-0 group-hover:opacity-100 duration-500'>
                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        </svg>
                    </Link>
                    <Link href={'/logofolio/diversity-employment'} className='flex flex-col items-center gap-2 group'>
                        <div className='w-[280px] h-[80px] relative opacity-60 -bottom-2 group-hover:bottom-0 duration-300'>
                            <Image src={'/assets/images/logofolio/logofolio-3.webp'} fill objectFit='center' alt='' />
                        </div>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative -top-8 opacity-0 group-hover:top-0           group-hover:opacity-100 duration-500'>
                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        </svg>
                    </Link>
                </div>
                <div className='flex flex-wrap justify-between items-end w-[1200px] mx-auto'>
                    <Link href={'/logofolio/destino-salta'} className='flex flex-col items-center gap-2 group'>
                        <div className='w-[170px] h-[180px] relative opacity-60 -bottom-2 group-hover:bottom-0 duration-300'>
                            <Image src={'/assets/images/logofolio/logofolio-4.webp'} fill objectFit='center' alt='' />
                        </div>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative -top-8 opacity-0 group-hover:top-0           group-hover:opacity-100 duration-500'>
                            <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                            <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        </svg>
                    </Link>
                    <div className='w-[240px] h-[60px] relative opacity-60 -top-8'>
                        <Image src={'/assets/images/logofolio/logofolio-5.webp'} fill objectFit='center' alt='' />
                    </div>
                    <div className='w-[180px] h-[150px] relative opacity-60 -top-8'>
                        <Image src={'/assets/images/logofolio/logofolio-6.webp'} fill objectFit='center' alt='' />
                    </div>
                    <div className='w-[140px] h-[140px] relative opacity-60 -top-8'>
                        <Image src={'/assets/images/logofolio/logofolio-7.webp'} fill objectFit='center' alt='' />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LogofolioComp;