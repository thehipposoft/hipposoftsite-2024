'use client'
import Link from 'next/link';
import Image from 'next/image';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';

const ContactInfo = () => {

    const t = useTranslations('Contact');
    const container = useRef(null)

    useGSAP(() => {
        gsap.from('.text', {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.1,
            delay: 0.8,
        })
    }, {scope: container})

    return (
        <div ref={container} className='flex flex-col gap-10 lg:gap-7 data__wrapper'>
            <div className='overflow-hidden'>
                <Image src={'/assets/logo.png'} alt='HippoSoft logo' width={1144} height={451} className='w-56 text' />
            </div>
            <div className='overflow-hidden p-1'>
                <h2 className='md:text-6xl text-5xl text-black text'>{t("title1")}<br/> {t("title2")}</h2>
            </div>
            <div className='flex flex-col gap-10 mt-8'>
                <div className='p-1 overflow-hidden'>
                    <Link href={'mailto:hello@thehipposoft.com'} className='flex gap-4 items-center w-fit text'>
                        <svg width="24" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.075 2.333A3 3 0 0 1 3 0h18a3 3 0 0 1 2.925 2.333L12 9.62.075 2.332ZM0 4.045v10.656l8.704-5.337L0 4.045Zm10.142 6.2-9.855 6.04A3 3 0 0 0 3 18h18a3 3 0 0 0 2.712-1.716l-9.855-6.04L12 11.378l-1.858-1.136v.002Zm5.154-.879L24 14.701V4.046l-8.704 5.318v.002Z" fill="#031728"/></svg>
                        <p className='text-xl text-black hover:underline'>hello@thehipposoft.com</p>
                    </Link>
                </div>
                <div className='p-1 overflow-hidden'>
                    <Link href={'tel:61 414 286 242'} className='flex gap-4 items-center w-fit text'>
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.828.766a2.617 2.617 0 0 1 3.915.245L9.435 4.47c.494.634.668 1.46.473 2.24l-.82 3.286a1.017 1.017 0 0 0 .266.964l3.686 3.686a1.017 1.017 0 0 0 .966.267l3.283-.82a2.617 2.617 0 0 1 2.241.472l3.46 2.69a2.617 2.617 0 0 1 .244 3.917l-1.551 1.551c-1.11 1.11-2.77 1.598-4.316 1.053a27.95 27.95 0 0 1-10.515-6.63A27.95 27.95 0 0 1 .222 6.633C-.32 5.088.167 3.427 1.277 2.317l1.55-1.55Z" fill="#031728"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>
                        <p className='text-xl text-black hover:underline'>+61 414 286 242</p>
                    </Link>
                </div>
                <div className='p-1 overflow-hidden'>
                    <div className='flex gap-4 items-center text'>
                        <svg width="24" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14c.825 0 1.531-.274 2.12-.823.587-.548.88-1.207.88-1.977s-.293-1.43-.88-1.978C13.532 8.674 12.825 8.4 12 8.4c-.825 0-1.531.274-2.118.822C9.294 9.77 9 10.43 9 11.2s.294 1.429.882 1.977c.587.549 1.293.823 2.118.823Zm0 14c-4.025-3.197-7.031-6.166-9.018-8.908C.994 16.35 0 13.813 0 11.48c0-3.5 1.206-6.288 3.62-8.365C6.031 1.038 8.825 0 12 0c3.175 0 5.968 1.038 8.38 3.115C22.795 5.192 24 7.98 24 11.48c0 2.333-.994 4.87-2.98 7.612C19.032 21.834 16.024 24.803 12 28Z" fill="#031728"/></svg>
                        <p className='text-xl text-black'>Melbourne, Australia</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;