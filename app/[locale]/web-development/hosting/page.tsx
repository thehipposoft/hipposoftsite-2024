import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'HippoSoft | Hosting',
  description: 'Ensuring your technical infrastructure is strong and properly set up is our top priority. We take every measure to create a resilient and seamlessly functioning foundation for your project, so you can focus on achieving your goals with confidence.',
}

export default function Hosting() {

    const t = useTranslations('Hosting');
    const DATA = {
        title: t("title"),
        boxes: [
            {
                title: t("item1"),
                paragraph: t("text1"),
            },
            {
                title: t("item2"),
                paragraph: t("text2"),
            },
            {
                title: t("item3"),
                paragraph: t("text3"),
            },
            {
                title: t("item4"),
                paragraph: t("text4"),
            },
            {
                title: t("item5"),
                paragraph: t("text5"),
            },
        ]
    } 
    
    return (
        <div>
            <WebDevelopmentIndividualComp props={DATA} />
        </div>
    );
};