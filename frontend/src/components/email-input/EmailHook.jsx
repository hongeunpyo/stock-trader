import { useState } from 'react';

const EMAIL_REGEX = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

const useEmailValidation = () => {
    const [errors, setErrors] = useState([]);
    const [text, setText] = useState();

    const validateEmail = (email) => {
        const errorMessages = [];
        if (email.length === 0) {
            setErrors([]);
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            errorMessages.push(['email', 'Email is not valid']);
        }
        setErrors(errorMessages);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        validateEmail(value);
        setText(value);
    };

    return [text, handleChange, errors];
};

export default useEmailValidation;
