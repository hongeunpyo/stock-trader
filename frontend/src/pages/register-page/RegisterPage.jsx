import React from 'react';
import CardPage from '../templates/CardPage';
import Input from '../../components/input/Input';
import useGenericText from '../../components/input/InputHook';

const RegisterPage = () => {
    const [value, handleChange] = useGenericText();

    return (
        <CardPage title="Register">
            <Input id="test-input" title="Test" type="text" value={value} handleChange={handleChange}/>
        </CardPage>
    );
}

export default RegisterPage;