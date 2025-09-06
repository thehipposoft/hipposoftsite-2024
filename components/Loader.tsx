'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onFinish }: { onFinish: () => void }) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const tl = useRef<any>();

  useEffect(() => {

    // Animate number count
    tl.current = gsap
    .timeline()
    .set(('.loader-text'), {
      y: 50,
      autoAlpha: 0,
    })
    .to(('.loader-text'), {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.2,
      delay: 0.5,
    })
    .to(('.loader-text'), {
      y: -50,
      autoAlpha: 0,
      ease: 'power4.in',
      stagger: 0.3,
      duration: .7,
      onComplete: () => onFinish(),
    });

    const checkLoaded = () => {
        gsap.to('.loader-wrapper', {
          opacity: 0,
          duration: 0.5,
          onComplete: onFinish,
        });
    };

    const interval = setInterval(checkLoaded, 7000);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader-wrapper fixed inset-0 bg-[#221b35] text-white flex items-end z-50">
      <div className="pl-12 pb-12 gap-2 flex flex-col loader-container" ref={counterRef}>
        <div className='overflow-hidden'>
          <h3 className='loader-text bold md:text-[184px] text-6xl md:leading-[160px] uppercase font-bold text-sora '>
              HERE
          </h3>
        </div>
        <div className='overflow-hidden'>
          <h3 className='loader-text bold md:text-[184px] text-6xl md:leading-[160px] uppercase font-bold text-sora '>
              comes
          </h3>
        </div>
        <div className='overflow-hidden'>
          <h3 className='loader-text md:text-[184px] text-6xl md:leading-[160px] uppercase font-bold text-sora'>
              the hippo
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Loader;
