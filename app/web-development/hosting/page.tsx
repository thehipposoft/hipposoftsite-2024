import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Hosting',
  description: 'Ensuring your technical infrastructure is strong and properly set up is our top priority. We take every measure to create a resilient and seamlessly functioning foundation for your project, so you can focus on achieving your goals with confidence.',
}

export default function Hosting() {

    const DATA = {
        title: 'Hosting, Domain search and Configuration',
        boxes: [
            {
                title: 'Domain Search and Registration',
                paragraph: "We Assist clients in selecting and registering a domain name.",
            },
            {
                title: 'Hosting Solutions',
                paragraph: "We recommend and set up appropriate hosting plans based on the site’s needs.",
            },
            {
                title: 'Server Configuration',
                paragraph: "Configure servers for optimal performance, security, and reliability.",
            },
            {
                title: 'SSL Certificates',
                paragraph: "Implement SSL certificates to ensure secure connections",
            },
            {
                title: 'DNS Settings',
                paragraph: "Configure DNS settings to link the domain to the hosting server",
            },
        ]
    } 
    
    return (
        <div>
            <WebDevelopmentIndividualComp props={DATA} />
        </div>
    );
};