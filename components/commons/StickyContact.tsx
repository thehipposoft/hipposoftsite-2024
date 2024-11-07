import Link from 'next/link';
import React from 'react';

const StickyContact = () => {
    return (
        <Link href={'/contact'} className='fixed z-40 sm:w-[4vw] w-[15vw] cursor-pointer bg-black/20 duration-500 hover:bg-black/50 hover:scale-105 rounded-full bottom-8 right-8 p-2'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 9h10M7 13h5m9 7-3.324-1.662a4.161 4.161 0 0 0-.51-.234 2.007 2.007 0 0 0-.36-.085c-.139-.019-.28-.019-.561-.019H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 16.48 3 15.92 3 14.8V7.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 4 5.08 4 6.2 4h11.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 5.52 21 6.08 21 7.2V20Z" stroke="#70ffe5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </Link>
    );
};

export default StickyContact;