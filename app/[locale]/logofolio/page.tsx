import LogofolioComp from '@/components/Logofolio';
import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Logofolio',
  description: 'We design the logo and give your brand identity, aligning it with the values ​​you want to convey.',
}

export default function Logofolio() {
    return (
        <div>
            <LogofolioComp />
        </div>
    );
}
