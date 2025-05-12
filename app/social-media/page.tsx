import SocialMediaComp from '@/components/SocialMediaComp';
import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Social Media',
  description: 'At Hipposoft we are also dedicated to the development of Social Networks to enhance brands. Tailor-made strategies: We design unique strategies adapted to your business. Quality Content: We create visual and written content that captures the essence of your brand.',
}

export default function SocialMedia() {
    return (
        <div>
            <SocialMediaComp />
        </div>
    );
}
