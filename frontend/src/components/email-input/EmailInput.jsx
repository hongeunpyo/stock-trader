import React from 'react';

import Input from '../input/Input';
import useEmailValidation from './EmailHook';

const EmailInput = () => {
    const [value, handleChange, errors] = useEmailValidation();

    const renderErrors = () => errors.map((error) => <li key={error[0]} className="validation-error">{error[1]}</li>);

    return (
        <div className="validation-input-container full-width">
            <Input
                id="email-input"
                title="Email"
                type="email"
                formKey="email"
                placeholder="Enter Email"
                value={value}
                handleChange={handleChange}
                errorOutline={errors.length !== 0}
            />
            <ul className="validation-error-container">
                {renderErrors()}
            </ul>
        </div>
    );
};

export default EmailInput;
