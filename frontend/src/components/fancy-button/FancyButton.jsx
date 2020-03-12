import React from 'react';
import PropTypes from 'prop-types';

const FancyButton = ({ clickHandler, text }) => (
    <button className="fancy-button-container" type="submit" onClick={clickHandler}>
        <span className="fancy-button-text">
            {text}
        </span>
    </button>
);

FancyButton.propTypes = {
    clickHandler: PropTypes.func,
    text: PropTypes.string,
};

FancyButton.defaultProps = {
    clickHandler: null,
    text: '',
};

export default FancyButton;
