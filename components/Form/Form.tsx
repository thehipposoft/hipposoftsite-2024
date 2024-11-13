"use client";
import React, { useState } from 'react';
import axios from 'axios';

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
                <h2 className={'mb-2 text-2xl text-black'}>Thanks! </h2>
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
                                        className='resize-none border-b-2 focus:border-[#7653E3] border-[#9042C04D] focus:outline-0 w-full px-2 py-4 text-black bg-transparent focus:placeholder:text-black placeholder:text-[#9042c0a8]'
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
                                            <input onChange={handleChange} type="checkbox" name="interest" id="web-design" value='web-design' className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-design" className='text-black'>Web Design</label>
                                        </div>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChange} type="checkbox" name="interest" id="web-development" value="web-development" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-development" className='text-black'>Web Development</label>
                                        </div>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChange} type="checkbox" name="interest" id="graphic-design" value="graphic-design" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-development" className='text-black'>Graphic Design</label>
                                        </div>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChange} type="checkbox" name="interest" id="branding" value="branding" className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
                                            <label htmlFor="web-development" className='text-black'>Branding</label>
                                        </div>
                                        <div className='relative py-4 px-2 flex justify-center items-center w-44 hover:shadow-lg duration-500'>
                                            <input onChange={handleChange} type="checkbox" name="interest" id="social-media" value='social-media' className='cursor-pointer appearance-none w-full h-full border-2 checked:border-[#7653E3] absolute rounded duration-500' />
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
                                        className={'border-b-2 focus:border-[#7653E3] border-[#9042C04D] focus:outline-0 w-full px-2 py-4 text-black bg-transparent focus:placeholder:text-black placeholder:text-[#9042c0a8]'}
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
            <div className='flex'>
                <button
                    disabled={isAPILoading}
                    value={submitButtonLabel ? submitButtonLabel : 'Send'}
                    type="submit"
                    className={` ${isAPILoading ? 'opacity-50' : ''} group bg-black/30 hover:bg-black/50 hover:text-cyan duration-500 w-72 tracking-[0.3em] py-5 px-5 text-left flex justify-between items-center text-sm mt-2`}
                >
                    {submitButtonLabel}
                    <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='group-hover:rotate-180 duration-500'>
                        <path d="M1.25 20H38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                        <path d="M20 1.25V38.75" stroke="#70FFE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3"/>
                    </svg>
                </button>
            </div>
        </form>
    )
};

export default MyCustomForm
