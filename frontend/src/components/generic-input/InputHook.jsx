import { useState } from 'react';

const useGenericText = () => {
    const [text, setText] = useState();

    const handleChange = (e) => {
        const { value } = e.target;
        setText(value);
    };

    return [text, handleChange];
};

export default useGenericText;
