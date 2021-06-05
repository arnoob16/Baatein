import { Formik, Form } from 'formik';
import { FormField } from 'components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { defaultValues, validationSchema } from './formikConfig';
import { fb } from 'service';
export const Login = () => {
    const login = ({ email, password }, { setSubmitting }) => {
        fb.auth
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                if (!res.user) {
                    setServerError(
                        "We're having trouble having logging you in. Please try again.",
                    );
                }
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    setServerError('Invalid Credentials');
                } else if (error.code === 'auth/user-not-found') {
                    setServerError('No account for this email');
                } else {
                    setServerError('Something went wrong :(');
                }
            })
            .finally(() => setSubmitting(false));
    };

    const history = useHistory();
    const [serverError, setServerError] = useState('');
    return (
        <div className="auth-form">
            <h1>Login</h1>
            <Formik
                onSubmit={login}
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
            >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <FormField name="email" label="Email" type="email" />
                        <FormField
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <div className="auth-link-container">
                            New to Baatein?{' '}
                            <span
                                className="auth-link"
                                onClick={() => history.push('signup')}
                            >
                                Sign Up!
                            </span>
                        </div>

                        <button
                            disabled={isSubmitting || !isValid}
                            type="submit"
                        >
                            LogIn
                        </button>
                    </Form>
                )}
            </Formik>
            {!!serverError && (
                <div className="error">{setServerError('Error')}</div>
            )}
        </div>
    );
};
