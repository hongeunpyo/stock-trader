import { useState } from 'react';

const PASSWORD_REGEX_LOWERCASE = RegExp('^(?=.*[a-z])');
const PASSWORD_REGEX_UPPERCASE = RegExp('^(?=.*[A-Z])');
const PASSWORD_REGEX_NUMERIC = RegExp('^(?=.*[0-9])');
const PASSWORD_LENGTH = 6;

const usePasswordValidation = () => {
    const [errors, setErrors] = useState([]);
    const [text, setText] = useState();

    const validatePassword = (password) => {
        const errorMessages = [];
        if (password.length === 0) {
            setErrors([]);
            return;
        }
        if (!PASSWORD_REGEX_LOWERCASE.test(password)) {
            errorMessages.push(['lowercase', 'Passwords must contain at least 1 lowercase alphabetical character']);
        }
        if (!PASSWORD_REGEX_UPPERCASE.test(password)) {
            errorMessages.push(['uppercase', 'Passwords must contain at least 1 uppercase alphabetical character']);
        }
        if (!PASSWORD_REGEX_NUMERIC.test(password)) {
            errorMessages.push(['numeric', 'Passwords must contain at least 1 numeric character']);
        }
        if (password.length < PASSWORD_LENGTH) {
            errorMessages.push(['length', `Passwords must contain at least ${PASSWORD_LENGTH} characters`]);
        }
        setErrors(errorMessages);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        validatePassword(value);
        setText(value);
    };

    return [text, handleChange, errors];
};

export default usePasswordValidation;
