import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'HippoSoft | Development and Implementation',
  description: 'We meticulously construct your website based on a well-crafted strategy and an intentional design. Our approach ensures that every element aligns with your vision and goals, resulting in a powerful online presence that stands out.',
}


export default function Development() {

    const t = useTranslations('Development');
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