import React from 'react';

import Input from '../input/Input';
import usePasswordValidation from './PasswordHook';

const PasswordInput = () => {
    const [value, handleChange, errors] = usePasswordValidation();

    const renderErrors = () => errors.map((error) => <li key={error[0]} className="validation-error">{error[1]}</li>);

    return (
        <div className="validation-input-container full-width">
            <Input
                id="password-input"
                title="Password"
                type="password"
                formKey="password"
                placeholder="Enter Password"
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

export default PasswordInput;
