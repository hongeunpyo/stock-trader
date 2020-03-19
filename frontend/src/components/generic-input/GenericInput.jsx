import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input/Input';
import useGenericInput from './InputHook';

const GenericInput = ({ id, title, placeholder, formKey }) => {
    const [value, handleChange] = useGenericInput();

    return (
        <div className="generic-input-container full-width">
            <Input
                id={id}
                title={title}
                type="text"
                formKey={formKey}
                value={value}
                placeholder={placeholder}
                handleChange={handleChange}
            />
        </div>
    );
};

GenericInput.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default GenericInput;
