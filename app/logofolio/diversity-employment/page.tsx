import React from 'react';
import LogofolioSingleComp from '@/components/Logofolio/LogofolioSingleComp';
import { LOGOFOLIO_DATA } from '@/components/Logofolio/constants';

export default function DiversityEmploymentPage() {
    return (
        <div>
            <LogofolioSingleComp data={LOGOFOLIO_DATA[2]} />
        </div>
    );
};