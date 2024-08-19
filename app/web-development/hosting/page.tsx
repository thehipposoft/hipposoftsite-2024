import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';

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