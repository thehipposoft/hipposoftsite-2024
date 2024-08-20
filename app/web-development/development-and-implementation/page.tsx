import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';

export default function Development() {

    const DATA = {
        title: 'Development and Implementation',
        boxes: [
            {
                title: 'Domain Search and Registration',
                paragraph: "Code the visual and interactive parts of the website.",
            },
            {
                title: 'Hosting Solutions',
                paragraph: "We recommend and set up appropriate hosting plans based on the site’s needs.",
            },
            {
                title: 'Responsive Design',
                paragraph: "Ensure the website is mobile-friendly and looks good on all devices.",
            },
            {
                title: 'Third-Party Integrations',
                paragraph: "Integrate external services like payment gateways, analytics, and CRM systems",
            },
            {
                title: 'Quality Assurance (QA) and Testing:',
                paragraph: "Test for bugs, compatibility, performance, and security vulnerabilities.",
            },
        ]
    } 

    return (
        <div>
            <WebDevelopmentIndividualComp props={DATA} />
        </div>
    );
};