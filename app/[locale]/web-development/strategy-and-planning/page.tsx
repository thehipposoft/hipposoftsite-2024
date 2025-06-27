import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl';
 
export const metadata: Metadata = {
  title: 'HippoSoft | Strategy and Planning',
  description: 'Start Strong. The success of any project begins with careful planning. Together we will define clear objectives, create a detailed plan, and establish a robust foundations.',
}

export default function StrategyAndPlanning() {

    const t = useTranslations('StrategyAndPlanning');
    const DATA = {
        title: t('title'),
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
            }
        ]
    } 
    

    return (
        <div>
            <WebDevelopmentIndividualComp props={DATA} />
        </div>
    );
};
