import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import CardPage from '../templates/CardPage';
import PasswordInput from '../../components/password-input/PasswordInput';
import EmailInput from '../../components/email-input/EmailInput';
import { useFormContext } from '../../context/form-context/FormContext';
import { useUserContext, UserActions } from '../../context/user-context/UserContext';

const LoginPage = () => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [, userDispatch] = useUserContext();
    const [formState] = useFormContext();
    const history = useHistory();

    const handleSubmit = async () => {  
        try {
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
    
            console.log(body);

            const userTotal = body.user.cents / 100;

            userDispatch({
                type: UserActions.SIGN_IN,
                payload: {
                    token: body.token,
                    email: body.user.email,
                    fullName: body.user.fullName,
                    userTotal,
                    loggedIn: true,
                }
            })
    
            // redirect to home page on successful login
            history.push('/');
        } catch (err) {
            console.error(err);
            setShowErrorMessage(true);
        }
    }

    return (
        <CardPage title="Sign In" handleSubmit={handleSubmit}>
            {showErrorMessage && <span style={{color: 'red', fontSize: '16px'}}>Something went wrong. Check your e-mail and password and try again.</span>}
            <EmailInput disableValidation />
            <PasswordInput disableValidation />
        </CardPage>
    );
}

export default LoginPage;
