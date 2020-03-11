import React from 'react';

const BodyWrapper = ({ children }) => {
    return (
        <div id='body-wrapper' className='flex full-width full-height flex-grow'>
            {children}
        </div>
    )
}

export default BodyWrapper;
