import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input/Input';
import usePasswordValidation from './PasswordHook';

const PasswordInput = ({ disableValidation }) => {
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
                errorOutline={!disableValidation && errors.length !== 0}
            />
            {!disableValidation &&
                <ul className="validation-error-container">
                    {renderErrors()}
                </ul>
            }
        </div>
    );
};

PasswordInput.propTypes = {
    disableValidation: PropTypes.bool,
}

PasswordInput.defaultProps = {
    disableValidation: false,
}

export default PasswordInput;
