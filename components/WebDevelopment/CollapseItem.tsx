'use client'
import React, { useState } from 'react'

type ItemsType = {
    item: any,
    text: string,
}

type Item = {
    title: string,
    items: ItemsType[]
}

const CollapseItem = ({title, items}:Item) => {

    const [currentIndex, setCurrentIndex] = useState<number | undefined>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleIndex = (index:number | undefined) => {
        if (index === currentIndex) {
            setCurrentIndex(undefined);
        } else {
            setCurrentIndex(index);
        }
    }

    const handleButton = (index:number | undefined) => {
        currentIndex === undefined ?
        setCurrentIndex(0)
        :
        setCurrentIndex(undefined)
    }


  return (
    <div className='w-full border-t border-black text-black flex flex-col md:flex-row justify-between md:py-12 py-0 relative duration-300 '>
        <h5 className='hidden lg:block uppercase lg:text-6xl md:text-5xl text-4xl -tracking-wider'>{title}</h5>
        <div className='flex items-center gap-12 justify-end lg:min-w-[500px] relative overflow-hidden'>
            <div className='flex flex-col gap-4 '>
                {/* Only Mobile & Tablet */}
                <div className='lg:hidden flex flex-col overflow-hidden relative '>
                    <div 
                        className='flex items-center justify-between min-h-16 relative z-10'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <h5
                            className='uppercase text-4xl -tracking-wider '
                        >
                            {title}
                        </h5>
                        <svg className={''} width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M1.25 20H38.75" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                            <path className={`${isOpen && "rotate-90 origin-center "} duration-500`} d="M20 1.25V38.75" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
                        </svg>
                    </div>
                    <div className={`${isOpen ? "translate-y-0 max-h-screen opacity-100 pb-4" : "-translate-y-full max-h-0 opacity-0"} duration-700 flex flex-col gap-2 `}>
                        {
                            items.map((val, index) => (
                                <div className={""} key={index}>
                                        <h4 className='text-xl'>{val.item}</h4>
                                        <p>{val.text}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='lg:flex hidden relative overflow-hidden lg:max-w-[550px]'>
                    {
                        items.map((val, index) => (
                            <div key={index} className={` duration-700 
                                ${currentIndex === undefined ? "-translate-y-ful " : ""}
                                ${currentIndex === 0 ? "translate-x-0" : ""}
                                ${currentIndex === 1 ? "-translate-x-[500px]" : ""}
                                ${currentIndex === 2 ? "-translate-x-[1000px]" : ""}
                                ${currentIndex === 3 ? "-translate-x-[1500px]" : ""}
                                ${currentIndex === 4 ? "-translate-x-[2000px]" : ""}
                             lg:min-w-[500px]`
                            }>
                                <p className={`${currentIndex === index ? "max-h-68 min-h-40 opacity-100" : "max-h-0 opacity-0"} text-2xl left-0 min-w-72 duration-500`}>{val.text}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='lg:flex hidden lg:max-w-[550px] flex-wrap space-x-6'>
                    {
                        items.map((val, index) => (
                            <div key={index} className={``}>
                                <button 
                                    onClick={() => {handleIndex(index)}} 
                                    className={`
                                    
                                    ${currentIndex === index ? " text-black" : "text-black/55 hover:text-black"}
                                    duration-500 thin  -tracking-wider text-lg cursor-pointer hover:underline`}
                                >
                                    {val.item}
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        <svg onClick={() => handleButton(currentIndex)} className={'absolute right-0 top-4 cursor-pointer hidden lg:block'} width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M1.25 20H38.75" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
            <path className={`${currentIndex !== undefined ? "rotate-90 origin-center " : ""} duration-500`} d="M20 1.25V38.75" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
        </svg>
    </div>
  )
}

export default CollapseItem