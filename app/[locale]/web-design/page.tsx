import WebDesignComp from '@/components/WebDesign';
import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Web Design',
  description: 'Understand the process of deployment, development and maintenance of the websites we produce.',
}

export default function WebDesign() {
    return (
        <div>
            <WebDesignComp />
        </div>
    );
}
