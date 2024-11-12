'use server'
const required = (value:any) => value ? undefined : 'Required';


const email = (value:any) => {
    if (!value) {
        return 'Requerid';
    }
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Email is incorrect' : undefined;
};

export {
    required,
    email,
}