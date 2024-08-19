import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';

export default function LaunchAndMaintennance() {

    const DATA = {
        title: 'Development and Implementation',
        boxes: [
            {
                title: 'Deployment',
                paragraph: "Launch the website on the client’s server or hosting platform.",
            },
            {
                title: 'Seo Optimization',
                paragraph: "Implement on-page SEO practices to enhance search engine visibility.",
            },
            {
                title: 'Performance Monitoring',
                paragraph: "Set up tools to monitor site performance and user behavior.",
            },
            {
                title: 'Regular Updates',
                paragraph: "Apply software updates, security patches, and performance enhancements.",
            },
            {
                title: 'Backups',
                paragraph: "Implement regular backup solutions to prevent data loss.",
            },
            {
                title: 'Support and training',
                paragraph: "Provide training for the client to manage their site and offer ongoing technical support.",
            },
            
        ]
    } 

    return (
        <div>
            <WebDevelopmentIndividualComp props={DATA} />
        </div>
    );
};