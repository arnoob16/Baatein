import * as Yup from 'yup';
export const defaultValues = {
    email: '',
    password: '',
    userName: '',
    verifyPassword: '',
};

export const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email Address').required('Required'),
    password: Yup.string()
        .required('Required')
        .min(8, 'Must be at-leeast 8 characters'),
    verifyPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], "Password don't match"),
    userName: Yup.string()
        .required('Required')
        .matches(/^S*$/, 'No Spaces')
        .min(3, 'Must contain at-least 3 characters'),
});
