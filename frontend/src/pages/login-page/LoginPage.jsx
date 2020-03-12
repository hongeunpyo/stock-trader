import React from 'react';

import CardPage from '../templates/CardPage';
import PasswordInput from '../../components/password-input/PasswordInput';
import EmailInput from '../../components/email-input/EmailInput';

const LoginPage = () => (
    <CardPage title="Sign In">
        <EmailInput />
        <PasswordInput />
    </CardPage>
);

export default LoginPage;
