import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const ContactComponent = () => {
    return (
        <div className='md:h-screen relative flex justify-center items-center'>
            <Image src={'/assets/images/contact/contactBg.webp'} alt='' fill />
            <div className='absolute h-full w-full left-0 top-0 z-[5] md:bg-white/10 bg-white/30' />
            <div className='md:w-[1200px] w-[80vw] flex flex-col mx-auto relative z-10 gap-8 my-8 md:my-0'>
                <div className='flex justify-end'>
                    <Link href={'/'} className=''>
                        <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                            fill='#FFFFFF'/>
                        </svg>
                    </Link>
                </div>
                <div className='flex flex-col md:flex-row items-center justify-between gap-14 md:gap-0'>
                    <div className='flex flex-col gap-10'>
                        <h2 className='text-7xl text-black'>Let´s take the<br/> next step!</h2>
                        <div className='flex flex-col gap-12'>
                            <div className='flex gap-4 items-center'>
                                <svg width="24" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.075 2.333A3 3 0 0 1 3 0h18a3 3 0 0 1 2.925 2.333L12 9.62.075 2.332ZM0 4.045v10.656l8.704-5.337L0 4.045Zm10.142 6.2-9.855 6.04A3 3 0 0 0 3 18h18a3 3 0 0 0 2.712-1.716l-9.855-6.04L12 11.378l-1.858-1.136v.002Zm5.154-.879L24 14.701V4.046l-8.704 5.318v.002Z" fill="#031728"/></svg>                              
                                <p className='text-xl text-black'>hipposoft@gmail.com</p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.828.766a2.617 2.617 0 0 1 3.915.245L9.435 4.47c.494.634.668 1.46.473 2.24l-.82 3.286a1.017 1.017 0 0 0 .266.964l3.686 3.686a1.017 1.017 0 0 0 .966.267l3.283-.82a2.617 2.617 0 0 1 2.241.472l3.46 2.69a2.617 2.617 0 0 1 .244 3.917l-1.551 1.551c-1.11 1.11-2.77 1.598-4.316 1.053a27.95 27.95 0 0 1-10.515-6.63A27.95 27.95 0 0 1 .222 6.633C-.32 5.088.167 3.427 1.277 2.317l1.55-1.55Z" fill="#031728"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>
                                <p className='text-xl text-black'>+61 414 286 242</p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <svg width="24" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14c.825 0 1.531-.274 2.12-.823.587-.548.88-1.207.88-1.977s-.293-1.43-.88-1.978C13.532 8.674 12.825 8.4 12 8.4c-.825 0-1.531.274-2.118.822C9.294 9.77 9 10.43 9 11.2s.294 1.429.882 1.977c.587.549 1.293.823 2.118.823Zm0 14c-4.025-3.197-7.031-6.166-9.018-8.908C.994 16.35 0 13.813 0 11.48c0-3.5 1.206-6.288 3.62-8.365C6.031 1.038 8.825 0 12 0c3.175 0 5.968 1.038 8.38 3.115C22.795 5.192 24 7.98 24 11.48c0 2.333-.994 4.87-2.98 7.612C19.032 21.834 16.024 24.803 12 28Z" fill="#031728"/></svg>
                                <p className='text-xl text-black'>Melbourne, Australia</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#EEEEEE] rounded-xl p-10'>
                        <form action="#" className='flex flex-col md:gap-4 gap-8 md:w-[600px]'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-black text-lg'>I'm intereseted in...</p>
                                <div className='flex gap-4 flex-wrap'>
                                    <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                        <input type="checkbox" name="web-design" id="web-design" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                        <label htmlFor="web-design" className='text-black'>Web Design</label>
                                    </div>
                                    <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                        <input type="checkbox" name="web-development" id="web-development" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                        <label htmlFor="web-development" className='text-black'>Web Development</label>
                                    </div>
                                    <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                        <input type="checkbox" name="web-development" id="web-development" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                        <label htmlFor="web-development" className='text-black'>Graphic Design</label>
                                    </div>
                                    <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                        <input type="checkbox" name="web-development" id="web-development" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                        <label htmlFor="web-development" className='text-black'>Branding</label>
                                    </div>
                                    <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                        <input type="checkbox" name="web-development" id="web-development" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                        <label htmlFor="web-development" className='text-black'>Social Media</label>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="name">
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="Your name" 
                                    required
                                    className='border-b-2 focus:border-[#7653E3] border-[#9042C04D] focus:outline-0 w-full px-2 py-4 text-black bg-transparent focus:placeholder:text-black placeholder:text-[#9042c0a8]'
                                />
                            </label>
                            <label htmlFor="email">
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Your email" 
                                    required
                                    className='border-b-2 focus:border-[#7653E3] border-[#9042C04D] focus:outline-0 w-full px-2 py-4 text-black bg-transparent focus:placeholder:text-black placeholder:text-[#9042c0a8]'
                                />
                            </label>
                            <label htmlFor="message">
                                <textarea 
                                    className='resize-none border-b-2 focus:border-[#7653E3] border-[#9042C04D] focus:outline-0 w-full px-2 py-4 text-black bg-transparent focus:placeholder:text-black placeholder:text-[#9042c0a8]' 
                                    id="message" 
                                    name="message" 
                                    placeholder="Your message" 
                                    rows={2} 
                                    required>
                                </textarea>
                            </label>
                            <button 
                                type="submit"
                                className='group bg-black/30 hover:bg-black/50 hover:text-cyan duration-500 w-72 tracking-[0.3em] py-5 px-5 text-left flex justify-between items-center text-base mt-8'
                            >
                                SEND MESSAGE
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='group-hover:rotate-180 duration-500'>
                                    <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                    <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactComponent;
