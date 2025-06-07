"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const initialValues = {
    interest: [],
    name: '',
    customerEmail: '',
    message: '',
};

type FieldsType = {
    name: 'interest' | 'name' | 'customerEmail' | 'message';
    type: 'text' | 'textArea' | 'select' | 'email';
    label: string;
    placeholder: string;
    required?: boolean;
}

type MyCustomFormProps = {
    fields: FieldsType[];
    onSuccessMessage: string;
    onErrorMessage: string;
    emailServiceURL: string;
    submitButtonLabel: string;
};

type FormValues = {
    interest: string[];
    name: string;
    customerEmail: string;
    message: string;
};

const MyCustomForm = ({
    fields,
    onSuccessMessage,
    onErrorMessage,
    emailServiceURL,
    submitButtonLabel
}:MyCustomFormProps) => {
    const [messageSent, setMessageSent] = useState<string>('');
    const [isAPILoading, setIsAPILoading] = useState<boolean>(false);
    const [messageDescription, setMessageDescription] = useState<string>('');
    const [values, setValues] = useState<FormValues>({
        interest: [],
        name: '',
        customerEmail: '',
        message: '',
    });

    const renderSentMessage = () => {
        if (messageSent === 'succeed') {
            return <div className={`message succeed w-full text-center mb-6`}>
                <h2 className={'mb-2 text-4xl text- uppercase'}>Thanks! </h2>
                <p className='text-black'>{onSuccessMessage}</p>
            </div>
        }
        if (messageSent === 'error') {
            return <div className={`message error w-full text-center mb-6`}>
                <h2 className={'mb-4 text-red-500'}>Something went wrong</h2>
                <p>{onErrorMessage}</p>
                <p>{messageDescription}</p>
            </div>
        }
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target } = e;
        const { name, value } = target;

        setValues({
            ...values,
            [name]: value
        });
    };

    const handleChangeBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setValues({
                ...values,
                interest: [...values.interest, e.target.value]
            })
        } else {
            const index = values.interest.indexOf(e.target.value);
            values.interest.splice(index, 1);
            setValues({
                ...values,
                interest: values.interest
            })
        }
    }

    const handleSubmit = (event:any) => {
        if (event) event.preventDefault();

        setIsAPILoading(true);
        axios.post(
            emailServiceURL,
            {
                interest: values.interest,
                message: values.message,
                name: values.name,
                customerEmail: values.customerEmail,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json, text/plain, */*',
                },
            }
        )
            .then(function (response) {
                setValues(initialValues);
                setMessageSent('succeed');
                setIsAPILoading(false);
            })
            .catch(function (error) {
                setMessageDescription(error.toString());
                setMessageSent('error');
                setIsAPILoading(false);
            });
    };

    return (
        <form
            className={`form mx-auto lg:w-[600px]`}
            onSubmit={(event) => handleSubmit(event)}
        >
            {
                fields.map((field)=> {
                    const { name, type, label, placeholder } = field;

                    switch (type) {
                        case 'textArea':
                            return (
                                <section className={'mb-4'} key={name}>
                                    <label className={'contact-label'}>{label}</label>
                                    <textarea
                                        name={name}
                                        id={name}
                                        value={values[name]}
                                        rows={3}
                                        cols={40}
                                        className='resize-none border-b-2 focus:border-[#7653E3] border-black focus:outline-0 w-full px-2 py-4 text-black bg-transparent focus:placeholder:text-black placeholder:text-black'
                                        placeholder={placeholder}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                </section>
                            );
                        case 'select':
                            return (
                                <section className='flex flex-col gap-4 mb-6'>
                                    <p className='text-black text-lg'>I'm intereseted in...</p>
                                    <div className='flex justify-center md:justify-start gap-4 flex-wrap'>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChangeBoxes} type="checkbox" name="interest" id="web-design" value='web-design' className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-design" className='text-black'>Web Design</label>
                                        </div>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChangeBoxes} type="checkbox" name="interest" id="web-development" value="web-development" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-development" className='text-black'>Web Development</label>
                                        </div>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChangeBoxes} type="checkbox" name="interest" id="graphic-design" value="graphic-design" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-development" className='text-black'>Graphic Design</label>
                                        </div>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChangeBoxes} type="checkbox" name="interest" id="branding" value="branding" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-development" className='text-black'>Branding</label>
                                        </div>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChangeBoxes} type="checkbox" name="interest" id="social-media" value='social-media' className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-development" className='text-black'>Social Media</label>
                                        </div>
                                    </div>
                                </section>
                            )
                        default:
                            return (
                                <section className='mb-4'>
                                    <label className={'contact-label'}>{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        id={name}
                                        className={'border-b-2 focus:border-[#7653E3] border-black focus:outline-0 w-full px-2 py-4 text-black bg-transparent focus:placeholder:text-black placeholder:text-black'}
                                        onChange={handleChange}
                                        value={values[name]}
                                        placeholder={placeholder}
                                        required={field.required}
                                    />
                                </section>
                            )
                    }
                })
            }
            {renderSentMessage()}
            <div className={`${messageSent === 'succeed' ? "hidden" : "" }flex items-center justify-between`}>
                <button
                    disabled={isAPILoading}
                    value={submitButtonLabel ? submitButtonLabel : 'Send'}
                    type="submit"
                    className={` ${isAPILoading ? 'opacity-50' : ''} group bg-black/30 hover:bg-black/50 hover:text-cyan duration-500 w-2/3 md:w-72 tracking-[0.3em] py-3 px-5 text-left flex justify-between items-center text-sm mt-2`}
                >
                    {submitButtonLabel}
                    <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='group-hover:rotate-180 duration-500'>
                        <path d="M1.25 20H38.75" stroke="#70FFE5" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                    </svg>
                </button>
                <div className='p-1'>
                    <Link href={'https://wa.link/j3oqk4'} target='_blank' className='flex gap-4 items-center w-8 text'>
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h20v20H0z"/><path d="M16.8 5.7C14.4 2 9.5.9 5.7 3.2 2 5.5.8 10.5 3.2 14.2l.2.3-.8 3 3-.8.3.2c1.3.7 2.7 1.1 4.1 1.1 1.5 0 3-.4 4.3-1.2 3.7-2.4 4.8-7.3 2.5-11.1zm-2.1 7.7c-.4.6-.9 1-1.6 1.1-.4 0-.9.2-2.9-.6-1.7-.8-3.1-2.1-4.1-3.6-.6-.7-.9-1.6-1-2.5 0-.8.3-1.5.8-2 .2-.2.4-.3.6-.3H7c.2 0 .4 0 .5.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4.1.2 0 .4-.1.5-.1.1-.2.3-.3.4-.2.1-.3.3-.2.5.4.6.9 1.2 1.4 1.7.6.5 1.2.9 1.9 1.2.2.1.4.1.5-.1s.6-.7.8-.9c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.5.3.1.3.1.7-.1 1z"/></svg>
                    </Link>
                </div>
            </div>
        </form>
    )
};

export default MyCustomForm
