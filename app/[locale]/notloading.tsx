import Image from 'next/image';
import React from 'react';

const loading = () => {
    return (
        <div className='h-screen flex flex-col gap-4 justify-center items-center bg-[#ffffff]'>
            <Image className='animate-pulse' src={'/assets/logo.png'} alt='HippoSoft logo' width={200} height={150} />
            <h2 className='thin text-black text-3xl animate-pulse tracking-wide'>LOADING...</h2>
        </div>
    );
}; 

export default loading;