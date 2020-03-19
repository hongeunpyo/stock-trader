import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input/Input';
import useEmailValidation from './EmailHook';

const EmailInput = ({ disableValidation }) => {
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

EmailInput.propTypes = {
    disableValidation: PropTypes.bool,
}

EmailInput.defaultProps = {
    disableValidation: false,
}

export default EmailInput;
