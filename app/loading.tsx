import React from 'react';

const loading = () => {
    return (
        <div className='h-screen flex justify-center items-center bg-[#ffffff]'>
            <h2 className='thin text-black text-5xl animate-pulse tracking-widest'>LOADING...</h2>
        </div>
    );
}; 

export default loading;