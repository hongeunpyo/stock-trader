import React from 'react';

const CardPage = ({ title, children }) => {
    return (
        <div className='full-width flex flex-center'>
            <section className='card-page-container flex flex-vertical-center flex-column'>
                <header className='card-page-header'>{title}</header>
                <div className='card-page-content flex flex-center flex-column full-height'>
                    {children}
                </div>
            </section>
        </div>
    )
}

export default CardPage;
