import Image from 'next/image';
import React from 'react';
import LogofolioGallery from './LogofolioGallery';
import Link from 'next/link';
import BackButton from '../commons/BackButton';

const LogofolioSingleComp = ({ data }:any) => {
    return (
        <div className='flex flex-col lg:h-screen text-black lg:gap-12'>
            <div className='flex justify-between pt-20 lg:pt-12 2xl:pt-16 lg:w-[1300px] w-[85vw] mx-auto'>
                <h2 className='lg:text-[54px] w-3/4 text-4xl'>{data.name}</h2>
                    {
                        data.category ?
                        <div className='flex items-center gap-4'>
                            <p className='hidden md:block'>Social Media</p>
                            <BackButton href={'/design'} />
                            <Link href={'/design'} className='lg:hidden block'>
                                <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                                    fill='#000000'/>
                                </svg>
                            </Link>
                        </div>
                        :
                        <div className='flex items-center gap-8'>
                            <h4 className='text-base hidden md:block'>Logofolio</h4>
                            <BackButton href='/logofolio' />
                            <Link href={'/logofolio'} className='lg:hidden block'>
                                <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                                    fill='#000000'/>
                                </svg>
                            </Link>
                        </div>
                    }
            </div>
            <div className='lg:w-[1300px] w-[80vw] my-4 md:my-0 mx-auto min-h-[600px] 2xl:min-h-[700px] 2xl:m-auto flex flex-col-reverse lg:flex-row justify-between md:gap-2 gap-14'>
                <div className='lg:w-[375px] md:w-[450px] w-[80vw] lg:h-[550px] md:my-12 md:mx-auto lg:mx-0 lg:my-0'>
                    <LogofolioGallery images={data.gallery} vc={data.vectorColors} />
                </div>
                <div className='flex flex-col lg:h-[550px] justify-between'>
                    <div className='flex flex-col gap-2 text-sm md:w-[460px]'>
                        <p>{data.description[0]}</p>
                        <p>{data.description[1]}</p>
                        <p>{data.description[2]}</p>
                    </div>
                    <div>
                        <div className='font-black md:w-[460px] text-sm pt-6'>
                            {
                                data.client ?
                                <div>
                                    <p>Client:</p>
                                    <p>{data.client}</p>
                                    <p>We invite you to check out their Instagram profile <Link href={data.instagram} target='_blank' rel='noreferrer' className='underline bold'>here!</Link></p>
                                </div>
                                :
                                <div>
                                    <h4>Concept:</h4>
                                    {
                                        data.concept.length > 1 ? 
                                        <div>
                                            <h4>{data.concept[0]}</h4>
                                            <h4>{data.concept[1]}</h4>
                                        </div>
                                        :
                                        <h4>{data.concept}</h4>
        
                                    }
                                </div>
                            }

                        </div>
                        <div>
                            {data.content}
                        </div>
                    </div>
                </div>
                <div className='flex lg:flex-col flex-col-reverse gap-6 justify-between lg:h-[350px] mt-8 md:mb-8 lg:my-0'>
                    <div className='uppercase text-[15px] flex flex-col lg:items-end md:gap-1 gap-4'>
                        <h3 className='light'>{data.information[0]}</h3>
                        <h3 className='light'>{data.information[1]}</h3>
                        <h3 className='light'>{data.information[2]}</h3>
                        <Link href={data.href} target='_blank' rel='noreferrer' className='relative z-10 mt-2 overflow-hidden duration-500 px-4 tracking-[0.2em] text-xs py-2 border-cyan border-2 text-black w-fit rounded-3xl hover:bg-cyan hover:scale-x-105'>
                                DISCOVER SITE
                        </Link>
                        {data.category ? <Link href={data.instagram} rel='noreferrer' target='_blank' className='flex w-fit mt-6'>
                                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" stroke="#41EAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Z"/><path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>
                                        </Link> 
                        : <></>}
                    </div>
                    {
                        data.logo ?
                        <div className={`relative w-[${data.logoSizes[0]}] h-[${data.logoSizes[1]}]`}>
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