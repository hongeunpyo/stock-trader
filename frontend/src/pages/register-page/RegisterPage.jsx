import React from 'react';

import CardPage from '../templates/CardPage';
import PasswordInput from '../../components/password-input/PasswordInput';
import GenericInput from '../../components/generic-input/GenericInput';
import EmailInput from '../../components/email-input/EmailInput';

const RegisterPage = () => (
    <CardPage title="Register">
        <GenericInput title="Full Name" id="name-input" />
        <EmailInput />
        <PasswordInput />
    </CardPage>
);

export default RegisterPage;