'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useTranslations} from 'next-intl';



const Expertise = () => {

    const t = useTranslations('Expertise');

    const DATA = [
        {
            title: t("item1"),
            text: t("text1")
        },
        {
            title: t("item2"),
            text: t("text2")
        },
        {
            title: t("item3"),
            text: t("text3")
        },
        {
            title: t("item4"),
            text: t("text4")
        },
        {
            title: t("item5"),
            text: t("text5")
        },
    ]

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleChange = (index:number) => {
        setCurrentIndex(index)
    }

  return (
    <div className='lg:max-w-[1350px] md:max-w-[90vw] max-w-[80vw] mx-auto py-8 bg-[#e6e7e893] flex flex-col'>
        <div className='lg:p-8 p-4 w-full h-full flex md:flex-row flex-col justify-between lg:min-h-[450px]'>
            <div className='flex flex-col lg:gap-12 gap-4'>
                <h3 className='uppercase text-2xl px-2 text-black'>{t("title")}</h3>
                <ul className='flex flex-col gap-4 md:gap-0'>
                    {
                        DATA.map((val, index) => (
                            <li 
                                key={index} 
                                className='uppercase text-black h-10 duration-500 hover:bg-[#41EAD4] px-2 py-2 md:py-0 rounded-sm flex items-center cursor-pointer font-light'
                                onMouseEnter={() => handleChange(index)}
                            >
                                {val.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='relative lg:w-[800px] md:w-[40vw] lg:min-h-[400px] min-h-[350px] pt-6 md:pt-0'>
                {
                    DATA.map((val, index) => (
                        <div className={`${currentIndex === index ? "opacity-100" : "opacity-0"} duration-700 flex flex-col lg:gap-16 absolute`} key={index}>
                            <h3 className={`${currentIndex === index ? "-translate-y-0" : "-translate-y-4"} uppercase text-black h-10 duration-500 flex items-center`}>{val.title}</h3>
                            <p className='lg:text-3xl text-black pr-4 pt-4 md:pt-0'>{val.text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='p-8 w-full h-full lg:flex hidden flex-col md:flex-row justify-between'>
            <h3 className={` uppercase text-black h-10 duration-500 flex items-center`}>cms case studies</h3>
            <div className='flex gap-6 lg:w-[800px] '>
                <Link href={"/portfolio/TeMStudio"} className='relative h-64 w-full group overflow-hidden'>
                    <Image sizes='250px' src="/assets/images/portfolio/te.m_hippo.webp" alt='Te M. Architecture mock image' fill className='object-cover group-hover:scale-105 duration-500' />
                    <div className='flex relative z-10 items-center justify-end px-4 gap-2'>
                        <h4 className='tracking-widest uppercase font-medium py-3 text-black'>discover</h4>
                        <svg className='group-hover:rotate-90 duration-500' width="25" height="25" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                            <path d="M1.25 20H38.75" className='' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                            <path d="M20 1.25V38.75" className='' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        </svg>
                    </div>
                </Link>
                <Link  href={"/portfolio/JamesConradArchitect"} className='relative h-64 w-full group overflow-hidden'>
                    <Image sizes='250px' src="/assets/images/webdesign/conrad.webp" alt='Conrad Mock Image' fill className='object-cover group-hover:scale-105 duration-500' />
                    <div className='flex relative z-10 items-center justify-end px-4 gap-2'>
                        <h4 className='tracking-[0.1em] uppercase font-medium py-3 text-black'>discover</h4>
                        <svg className='group-hover:rotate-90 duration-500' width="25" height="25" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                            <path d="M1.25 20H38.75" className='' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                            <path d="M20 1.25V38.75" className='' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        </svg>
                    </div>
                </Link>
                <Link href={"/portfolio/SPEKTRUM"} className='relative h-64 w-full group overflow-hidden'>
                    <Image sizes='250px' src="/assets/images/portfolio/spektrum-mockg.webp" alt='Spektrum Mock Image' fill className='object-cover group-hover:scale-105 duration-500' />
                    <div className='flex relative z-10 items-center justify-end px-4 gap-2'>
                        <h4 className='tracking-[0.2em] uppercase font-medium py-3 text-black'>discover</h4>
                        <svg className='group-hover:rotate-90 duration-500' width="25" height="25" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg"  >
                            <path d="M1.25 20H38.75" className='' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                            <path d="M20 1.25V38.75" className='' stroke={`#000000`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        </svg>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Expertise