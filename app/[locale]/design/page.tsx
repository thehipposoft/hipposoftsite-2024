import BrandingDesignMobile from '@/components/BrandingDesignMobile';
import BrandingDesing from '@/components/BrandingDesing';
import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Design',
  description: 'Discover all our design and branding services. From logos to social media posts that convey your identity.',
}

export default function DesignPage() {
    return (
        <div>
            <BrandingDesing />
            <BrandingDesignMobile />
        </div>
    );
}
