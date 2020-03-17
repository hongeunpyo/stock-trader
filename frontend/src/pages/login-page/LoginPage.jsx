import React from 'react';

import CardPage from '../templates/CardPage';
import PasswordInput from '../../components/password-input/PasswordInput';
import EmailInput from '../../components/email-input/EmailInput';
import { useFormContext } from '../../context/form-context/FormContext';
import { useAuthContext, AuthActions } from '../../context/auth-context/AuthContext';

const LoginPage = () => {
    const [authState, authDispatch] = useAuthContext();
    const [formState] = useFormContext();
    const handleSubmit = async () => {  
        const data = JSON.stringify(formState.values);
        const response = await fetch('http://localhost:8000/signin', {
            method: 'POST',
            credentials: "same-origin",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });
        const body = await response.json();

        authDispatch({
            type: AuthActions.SIGN_IN,
            payload: {
                token: body.token,
                email: body.user.email,
                fullName: body.user.fullName,
            }
        })
    }

    const testAuth = async () => {
        const response = await fetch('http://localhost:8000/test', {
            method: 'GET',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${authState.token}`
            }
        });
        console.log(response);
    }
    return (
        <CardPage title="Sign In" handleSubmit={handleSubmit}>
            <button onClick={testAuth}/>
            <EmailInput />
            <PasswordInput />
        </CardPage>
    );
}

export default LoginPage;
