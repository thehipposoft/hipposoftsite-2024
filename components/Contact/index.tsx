import Image from 'next/image';
import React from 'react';
import AnimatedLink from '../commons/AnimatedLink';
import BackButton from '../commons/BackButton';
import { Form } from '../Form';
import ContactInfo from './ContactInfo';
import { useTranslations } from 'next-intl';

const ContactComponent = () => {
    const t = useTranslations('Form');

    return (
        <div className='lg:h-screen relative flex justify-center items-center py-4 md:py-12 lg:py-8'>
            <Image src={'/assets/images/contact/contact-bg.webp'} alt='Contact section background' priority fill className='object-cover object-[100%70%]' />
            <div className='absolute h-full w-full left-0 top-0 z-[5] md:bg-white/25 bg-white/40' />
            <div className='lg:w-[1200px] w-[85vw] flex flex-col mx-auto relative z-10 gap-8 my-8 md:my-0'>
                <div className='flex justify-end lg:pt-0 md:pt-16 pt-20'>
                    <BackButton href='/' color='#000000' />
                    <AnimatedLink href={'/'} className='lg:hidden '>
                        <svg className='' width="20" height="20" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 0.75C2 0.33579 2.33579 0 2.75 0H9C10.9786 0 12.5041 0.82266 13.5198 2.07425C14.5207 3.30739 15 4.9201 15 6.5C15 8.0799 14.5207 9.6926 13.5198 10.9258C12.5041 12.1773 10.9786 13 9 13H2.56066L5.0303 15.4697C5.3232 15.7626 5.3232 16.2374 5.0303 16.5303C4.73744 16.8232 4.26256 16.8232 3.96967 16.5303L0.219668 12.7803C-0.0732225 12.4874 -0.0732225 12.0126 0.219668 11.7197L3.96967 7.9697C4.26256 7.6768 4.73744 7.6768 5.0303 7.9697C5.3232 8.2626 5.3232 8.7374 5.0303 9.0303L2.56066 11.5H9C10.5214 11.5 11.6209 10.8852 12.3552 9.9805C13.1043 9.0574 13.5 7.7951 13.5 6.5C13.5 5.2049 13.1043 3.94261 12.3552 3.0195C11.6209 2.11484 10.5214 1.5 9 1.5H2.75C2.33579 1.5 2 1.16421 2 0.75Z" 
                            fill='#000000'/>
                        </svg>
                    </AnimatedLink>
                </div>
                <div className='flex flex-col lg:flex-row justify-between gap-14 lg:gap-0'>
                    <ContactInfo />
                    <div className='bg-[#EEEEEE] rounded-xl md:p-10 p-6'>
                        <Form
                            fields={[
                                {
                                    name: 'interest',
                                    type: 'select',
                                    label: '',
                                    placeholder: 'Your Name',
                                    required: true,
                                },
                                {
                                    name: 'name',
                                    type: 'text',
                                    label: '',
                                    placeholder: t("name"),
                                    required: true,
                                },
                                {
                                    name: 'customerEmail',
                                    type: 'email',
                                    label: '',
                                    placeholder: t("email"),
                                    required: true,
                                },
                                {
                                    name: 'message',
                                    type: 'textArea',
                                    label: '',
                                    placeholder: t("message"),
                                    required: true,
                                },
                            ]}
                            onSuccessMessage={t("success")}
                            onErrorMessage={t("error")}
                            submitButtonLabel={t("submit")}
                            emailServiceURL={'https://thehippoapi.netlify.app/.netlify/functions/api/hipposoft-email'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactComponent;
