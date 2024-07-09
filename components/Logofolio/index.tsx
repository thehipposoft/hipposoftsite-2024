import React from 'react';
import Image from 'next/image';

const LogofolioComp = () => {
    return (
        <div className='h-screen flex flex-col'>
            <div className='flex w-[1100px] mx-auto py-12 justify-between text-black'>
                <h2>LOGOFOLIO</h2>
                <button>Back home</button>
            </div>
            <div className='flex flex-wrap gap-28 max-w-[1200px] mx-auto'>
                <Image src={'/assets/images/logofolio/logofolio-1.webp'} width={220} height={200} alt='' />
                <Image src={'/assets/images/logofolio/logofolio-2.webp'} width={220} height={200} alt='' />
                <Image src={'/assets/images/logofolio/logofolio-3.webp'} width={290} height={200} alt='' />
            </div>
            <div className='flex flex-wrap max-w-[1300px] mx-auto'>
                <Image src={'/assets/images/logofolio/logofolio-4.webp'} width={260} height={200} alt='' />
                <Image src={'/assets/images/logofolio/logofolio-5.webp'} width={260} height={200} alt='' />
                <Image src={'/assets/images/logofolio/logofolio-6.webp'} width={260} height={200} alt='' />
                <Image src={'/assets/images/logofolio/logofolio-7.webp'} width={260} height={200} alt='' />
            </div>
        </div>
    );
};

export default LogofolioComp;