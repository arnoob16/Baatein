import { FormField } from 'components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { defaultValues, validationSchema } from './formikConfig';
import { fb } from 'service';

export const SignUp = () => {
    const history = useHistory();
    const [serverError, setServerError] = useState('');

    const signup = ({ email, userName, password }, { setSubmitting }) => {
        fb.auth
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                if (res?.user?.uid) {
                    fetch('/api/createUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userName,
                            userId: res.user.uid,
                        }),
                    }).then(() => {
                        fb.firestore
                            .collection('chatUsers')
                            .doc(res.user.uid)
                            .set({ userName, avatar: '' });
                    });
                } else {
                    setServerError(
                        "We're having trouble signing you up, please try again.",
                    );
                }
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setServerError('An account with this email already exists');
                } else {
                    setServerError(
                        "We're having trouble signing you up, please try again.",
                    );
                }
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="auth-form">
            <h1>SignUp to Baatein</h1>
            <Formik
                onSubmit={signup}
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
            >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <FormField
                            name="userName"
                            type="text"
                            label="User Name"
                        />
                        <FormField name="email" label="Email" type="email" />
                        <FormField
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <FormField
                            name="verifyPassword"
                            label="Confirm Password"
                            type="password"
                        />

                        <div className="auth-link-container">
                            Already have an account?{' '}
                            <span
                                className="auth-link"
                                onClick={() => history.push('login')}
                            >
                                Log In!
                            </span>
                        </div>

                        <button
                            disabled={isSubmitting || !isValid}
                            type="submit"
                        >
                            SignUp
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
