import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Strategy and Planning',
  description: 'Start Strong. The success of any project begins with careful planning. Together we will define clear objectives, create a detailed plan, and establish a robust foundations.',
}

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
