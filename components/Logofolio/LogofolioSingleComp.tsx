import Image from 'next/image';
import React from 'react';
import LogofolioGallery from './LogofolioGallery';
import Link from 'next/link';
import BackButton from '../commons/BackButton';

const LogofolioSingleComp = ({ data }:any) => {
    return (
        <div className='flex flex-col h-screen text-black'>
            <div className='flex justify-between py-8 w-[1300px] mx-auto'>
                <h2 className='text-4xl'>{data.name}</h2>
                    {
                        data.category ?
                        <div className='flex items-center gap-4'>
                            <p>Social Media</p>
                            <BackButton href={'/design'}/>
                        </div>
                        :
                        <div className='flex items-center gap-4'>
                            <p>Logofolio</p>
                            <BackButton href={'/logofolio'}/>
                        </div>
                    }
            </div>
            <div className='w-[1300px] mx-auto h-[550px] flex justify-between gap-2'>
                <div className='w-[375px] h-[500px]'>
                    <LogofolioGallery images={data.gallery} />
                </div>
                <div className='flex flex-col justify-between '>
                    <div className='flex flex-col gap-2 text-sm w-[460px]'>
                        <p>{data.description[0]}</p>
                        <p>{data.description[1]}</p>
                        <p>{data.description[2]}</p>
                    </div>
                    <div>
                        <div className='font-black w-[460px] text-sm pt-12'>
                            {
                                data.client ?
                                <div>
                                    <p>Client:</p>
                                    <p>{data.client}</p>
                                    <p>We invite you to check out their Instagram profile <Link href={data.href} target='_blank' rel='noreferrer' className='underline'>here!</Link></p>
                                </div>
                                :
                                <div>
                                    <p>Concept:</p>
                                    {
                                        data.concept.length > 1 ? 
                                        <div>
                                            <p>{data.concept[0]}</p>
                                            <p>{data.concept[1]}</p>
                                        </div>
                                        :
                                        <p>{data.concept}</p>
        
                                    }
                                </div>
                            }

                        </div>
                        <div>
                            {data.content}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between'>
                    <div className='uppercase text-[15px]'>
                        <h3>{data.information[0]}</h3>
                        <h3>{data.information[1]}</h3>
                        <h3>{data.information[2]}</h3>
                        {data.category ? <Link href={data.href} rel='noreferrer' target='_blank' className='flex w-fit mt-6'>
                                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_2328_1259)">
                                                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#41EAD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15.9997 11.3698C16.1231 12.2021 15.981 13.052 15.5935 13.7988C15.206 14.5456 14.5929 15.1512 13.8413 15.5295C13.0898 15.9077 12.2382 16.0394 11.4075 15.9057C10.5768 15.7721 9.80947 15.3799 9.21455 14.785C8.61962 14.1901 8.22744 13.4227 8.09377 12.592C7.96011 11.7614 8.09177 10.9097 8.47003 10.1582C8.84829 9.40667 9.45389 8.79355 10.2007 8.40605C10.9475 8.01856 11.7975 7.8764 12.6297 7.99981C13.4786 8.1257 14.2646 8.52128 14.8714 9.12812C15.4782 9.73496 15.8738 10.5209 15.9997 11.3698Z" stroke="#41EAD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_2328_1259">
                                                <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </Link> 
                        : <></>}
                    </div>
                    {
                        data.logo ?
                        <div className={`relative w-[${data.logoSizes[0]}] h-[${data.logoSizes[1]}] `}>
                            <Image src={data.logo} alt={`${data.name} logo`} fill />
                        </div>
                        :
                        <></>
                    }

                </div>
            </div>
        </div>
    );
};

export default LogofolioSingleComp;