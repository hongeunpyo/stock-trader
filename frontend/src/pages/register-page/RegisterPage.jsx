import React from 'react';

import CardPage from '../templates/CardPage';
import PasswordInput from '../../components/password-input/PasswordInput';
import GenericInput from '../../components/generic-input/GenericInput';
import EmailInput from '../../components/email-input/EmailInput';
import { useAuthContext, AuthActions } from '../../context/auth-context/AuthContext';
import { useFormContext } from '../../context/form-context/FormContext';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
    const [, authDispatch] = useAuthContext();
    const [formState] = useFormContext();
    const history = useHistory();

    const handleSubmit = async () => {  
        const data = JSON.stringify(formState.values);

        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            credentials: "same-origin",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });
        const body = await response.json();
        console.log(body);
        if (body.token) {
            authDispatch({
                type: AuthActions.SIGN_IN,
                payload: {
                    token: body.token,
                    email: body.user.email,
                    fullName: body.user.fullName,
                    loggedIn: true,
                }
            });
    
            // redirect to home page on successful login
            history.push('/');
        }
    }

    return (
        <CardPage title="Register" handleSubmit={handleSubmit}>
            <GenericInput title="Full Name" id="name-input" placeholder="Enter your name" formKey="fullName"/>
            <EmailInput />
            <PasswordInput />
        </CardPage>
    );
} 

export default RegisterPage;
