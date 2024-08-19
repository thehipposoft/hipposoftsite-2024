import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';

export default function StrategyAndPlanning() {

    const DATA = {
        title: 'Strategy and planning',
        boxes: [
            {
                title: 'Client Consultation',
                paragraph: "To Understand the client's business goals, target audience, and requirements.",
            },
            {
                title: 'Market Research',
                paragraph: "We analyze competitors, industry trends, and best practices.",
            },
            {
                title: 'Project Planning',
                paragraph: "Define the project scope, objectives, timelines, and deliverables",
            },
            {
                title: 'Content Strategy',
                paragraph: "Plan the structure and types of content needed for the site.",
            }
        ]
    } 
    

    return (
        <div>
            <WebDevelopmentIndividualComp props={DATA} />
        </div>
    );
};
