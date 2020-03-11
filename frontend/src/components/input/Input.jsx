import React from 'react';

const Input = ({ title, id, placeholder, type, value, handleChange }) => {
    return (
        <label htmlFor={id} className="input-container full-width flex flex-column">
            <span className='input-title'>{title}</span>
            <input
                id={id}
                placeholder={placeholder}
                className='input-field'
                type={type}
                value={value}
                onChange={handleChange}
            />
        </label>
    )
}

export default Input;