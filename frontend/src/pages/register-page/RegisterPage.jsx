import React from 'react';

import CardPage from '../templates/CardPage';
import PasswordInput from '../../components/password-input/PasswordInput';
import GenericInput from '../../components/generic-input/GenericInput';
import EmailInput from '../../components/email-input/EmailInput';
import { useUserContext, UserActions } from '../../context/user-context/UserContext';
import { useFormContext } from '../../context/form-context/FormContext';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
    const [, userDispatch] = useUserContext();
    const [formState] = useFormContext();
    const history = useHistory();

    const handleSubmit = async () => {  
        const data = JSON.stringify(formState.values);

        const response = await fetch('http://ec2-3-21-232-246.us-east-2.compute.amazonaws.com:8000/register', {
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
            userDispatch({
                type: UserActions.SIGN_IN,
                payload: {
                    token: body.token,
                    email: body.user.email,
                    fullName: body.user.fullName,
                    loggedIn: true,
                }
            });
    
            // redirect to home page on successful login, buffer login time to give DB time to write user data
            setTimeout(() => {
                history.push('/');
            }, 500)
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
