import React from 'react';

const CardItem = ({ children }) => (
    <div className="card-item-container flex flex-vertical-center">
        <div className='flex full-width flex-vertical-center'>
            { children }
        </div>
    </div>
);

export default CardItem;
