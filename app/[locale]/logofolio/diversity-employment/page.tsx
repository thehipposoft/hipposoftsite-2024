import React from 'react';
import LogofolioSingleComp from '@/components/Logofolio/LogofolioSingleComp';
import { LOGOFOLIO_DATA } from '@/components/Logofolio/constants';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Logofolio: Diversity & Employment',
  description: 'We design the logo and give your brand identity, aligning it with the values ​​you want to convey.',
}

export default function DiversityEmploymentPage() {
    return (
        <div>
            <LogofolioSingleComp data={LOGOFOLIO_DATA[2]} />
        </div>
    );
};
