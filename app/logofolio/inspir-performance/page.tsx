import React from 'react';
import LogofolioSingleComp from '@/components/Logofolio/LogofolioSingleComp';
import { LOGOFOLIO_DATA } from '@/components/Logofolio/constants';

export default function InspirPerformancePage() {
    return (
        <div>
            <LogofolioSingleComp data={LOGOFOLIO_DATA[1]} />
        </div>
    );
};
