import React from 'react';
import BackButton from '../commons/BackButton';
import Link from 'next/link';
import Image from 'next/image';

const SingleProyect = ({project}: any) => {
    return (
        <div className={`min-h-screen flex flex-col justify-between py-12 relative bg-[${project.bgColor}]`}>
            <Image src={project.mockBig} alt={`${project.name} mock background`} fill className={`${project.backgroundSize ? 'object-contain' : 'object-cover'}`}/>
            <div className={`md:w-[90vw] w-[75vw] flex justify-between items-center mx-auto relative z-10`}>
                <h1 style={{color: `${project.nameColor}`}}  className={`text-4xl`}>{project.name}</h1>
                <div className={`${project.logoAbove ? '' : 'hidden'} absolute right-[20%]`}>
                    {project.logo_full}
                </div>
                <BackButton href={'/portfolio'} color={project.nameColor}/>
                <Link href={'/portfolio'} className='md:hidden'>
                    <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                        fill='#000000'/>
                    </svg>
                </Link>
            </div>
            <div className={`${project.logoAbove ? 'justify-end' : 'justify-between'} md:w-[90vw] w-[75vw] md:bg-transparent bg-white/70 py-4 md:py-0 rounded-xl flex md:flex-row flex-col  items-center mx-auto relative z-10 gap-2 md:gap-0`}>
                <div className={`${project.logoAbove ? "hidden" : ""}`}>
                    {project.logo_full}
                </div>
                <div className='flex md:flex-row flex-col md:gap-8 gap-4'>
                    <div className='flex flex-col md:bg-white/50 bg-transparent rounded-md py-4 px-6'>
                        <h4 style={{color: `${project.textColor}`}} className={`text-xl `}>{project.name}</h4>
                        <p style={{color: `${project.textColor}`}} className={`uppercase text-sm text-sora pt-2 `}>{project.industry}</p>
                        <p style={{color: `${project.textColor}`}} className={`uppercase text-sm text-sora `}>{project.work}</p>
                        <div className='flex gap-4 pt-2'>
                            <h4 style={{color: `${project.textColor}`}} className={`text-2xl `}>{project.year}</h4>
                            <Image src={project.flag} alt='country flag' width={35} height={24} />
                            {project.secondFlag ? <Image src={project.secondFlag} alt='country flag' width={35} height={24} /> : <></>}
                            {project.technologies_icons}
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Link href={project.href} target='_blank' className='md:px-6 px-8 tracking-[0.2em] border border-black hover:text-black hover:bg-transparent hover:scale-x-105 duration-500 md:text-sm text-xs font-medium py-3 bg-black text-white w-fit rounded-3xl'>
                            DISCOVER SITE
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProyect;