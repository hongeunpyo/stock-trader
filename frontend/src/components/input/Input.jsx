import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
    title, id, placeholder, type, value, handleChange, errorOutline,
}) => (
    <label htmlFor={id} className={`${errorOutline ? 'input-error' : ''} input-container flex flex-column`}>
        <span className="input-title">{title}</span>
        <input
            id={id}
            placeholder={placeholder}
            className="input-field"
            type={type}
            value={value}
            onChange={handleChange}
        />
    </label>
);

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
