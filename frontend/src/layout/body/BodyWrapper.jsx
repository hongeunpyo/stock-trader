import React from 'react';

const BodyWrapper = ({ children }) => (
    <div id="body-wrapper" className="flex full-width full-height flex-grow">
        <div id="body-flair" />
        {children}
    </div>
);

export default BodyWrapper;
