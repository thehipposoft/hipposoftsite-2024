'use client';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let loadedImages = 0;
    const images = Array.from(document.images);
    const totalImages = images.length;

    const updateProgress = () => {
      loadedImages++;
      const newProgress = Math.floor((loadedImages / totalImages) * 100);
      setProgress(newProgress);
    };

    // Animate number count
    const countTween = gsap.to({}, {
      duration: 5,
      onUpdate: () => {
        const val = Math.floor(countTween.progress() * 100);
        setProgress(val);
      },
      onComplete: () => {
        // Wait for all images to finish loading
        if (totalImages === 0) onFinish();
      }
    });

    images.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress);
      }
    });

    const checkLoaded = () => {
      if (loadedImages >= totalImages) {
        gsap.to('.loader-wrapper', {
          opacity: 0,
          duration: 0.5,
          onComplete: onFinish,
        });
      }
    };

    const interval = setInterval(checkLoaded, 7000);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader-wrapper fixed inset-0 bg-[#221b35] text-white flex items-end z-50">
      <div className="pl-12" ref={counterRef}>
        <p className='text-[184px] font-bold text-sora animate-pulse'>
            {progress}%
        </p>
      </div>
    </div>
  );
};

export default Loader;
