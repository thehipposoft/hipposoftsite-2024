import WebDevelopmentIndividualComp from '@/components/WebDevelopment/WebDevelopmentIndividualComp';
import React from 'react';
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl';
 
export const metadata: Metadata = {
  title: 'HippoSoft | Launch and Maintenance',
  description: 'We launch your website and commit to its ongoing functionality and performance. Our dedicated support ensures your site runs smoothly, providing a seamless experience for your users now and in the future.',
}


export default function LaunchAndMaintennance() {
    const t = useTranslations('Launch');
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
            },
            {
                title: t("item5"),
                paragraph: t("text5"),
            },
            {
                title: t("item6"),
                paragraph: t("text6"),
            },
            
        ]
    } 

    return (
        <div>
            <WebDevelopmentIndividualComp props={DATA} />
        </div>
    );
};