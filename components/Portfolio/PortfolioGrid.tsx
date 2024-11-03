import Image from 'next/image';
import React from 'react';
import { PORTFOLIO_DATA } from './constants';
import Link from 'next/link';

const PortfolioGrid = () => {
    return (
        <div className='grid md:grid-cols-3 grid-cols-1 gap-12 md:w-[85vw] w-[80vw] md:self-baseline'>
            {
                PORTFOLIO_DATA.map((val, index) => (
                    <div className='flex flex-col gap-4' key={index}>
                        <Link href={`/portfolio/${val.slug}`} className='w-[340px] h-[520px] relative group cursor-pointer' key={index}>
                            <div className='w-full h-full absolute top-0 left-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 duration-500 z-10'>
                                <h4 className='px-8 tracking-[0.2em] font-medium py-3 text-white text-2xl'>DISCOVER</h4>
                            </div>
                            <Image src={val.data.mockGrid} alt={`${val.data.name} background`} fill className={`object-cover ${val.data.objectPosition} `} />
                            <div className='absolute bottom-4 left-4'>
                                {val.data.logo_content}
                            </div>
                            <svg className='absolute md:right-4 right-12 bottom-4 z-10 duration-500 group-hover:rotate-180 group-hover:scale-110' width="45" height="45" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                                <path d="M1.25 20H38.75" className='group-hover:stroke-white duration-500' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                                <path d="M20 1.25V38.75" className='group-hover:stroke-white duration-500' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                            </svg>
                        </Link>
                        <div className='flex flex-col'>
                            <h4 className='text-xl'>{val.data.name}</h4>
                            <p className='uppercase text-sm text-sora pt-2'>{val.data.industry}</p>
                            <p className='uppercase text-sm text-sora'>{val.data.work}</p>
                            <div className='flex gap-5 pt-2'>
                                <h4 className='text-2xl'>{val.data.year}</h4>
                                <Image src={val.data.flag} alt='country flag' width={35} height={24} />
                                <div className='flex gap-2'>
                                    <Image src={val.data.technologies_icons[0]} alt='wordpress icon' width={25} height={20}  />
                                    <Image src={val.data.technologies_icons[1]} alt='react-icon' width={25} height={20} className={`${val.data.technologies_icons[1] ? '' : 'hidden'}`}  />
                                </div>
                            </div>
                        </div>
                    </div>

                ))  
            }
        </div>
    );
};

export default PortfolioGrid;