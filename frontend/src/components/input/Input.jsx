import React from 'react';
import PropTypes from 'prop-types';
import { FormActions, useFormContext } from '../../context/form-context/FormContext';

const Input = ({
    title, formKey, id, placeholder, type, value, handleChange, errorOutline,
}) => {
    const [, dispatch] = useFormContext();

    // extendedHandler extends the passed down handleChange function 
    // to send a dispatch that updates the form data to be submitted
    const extendedHandler = (e, key) => {
        dispatch({
            type: FormActions.ADD_FORM_DATA,
            payload: {[key]: e.target.value}
        });
        handleChange(e);
    };

    return (
        <label htmlFor={id} className={`${errorOutline ? 'input-error' : ''} input-container flex flex-column`}>
            <span className="input-title">{title}</span>
            <input
                id={id}
                placeholder={placeholder}
                className="input-field"
                type={type}
                value={value}
                onChange={(e) => {extendedHandler(e, formKey)}}
            />
        </label>
    );
}

Input.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    errorOutline: PropTypes.bool,
};

Input.defaultProps = {
    placeholder: '',
    type: 'text',
    value: '',
    handleChange: null,
    errorOutline: false,
};

export default Input;
