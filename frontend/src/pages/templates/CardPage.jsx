import React from 'react';
import PropTypes from 'prop-types';
import FancyButton from '../../components/fancy-button/FancyButton';

const CardPage = ({ title, children }) => (
    <div className="full-width flex flex-center">
        <section className="card-page-container flex flex-vertical-center flex-column">
            <header className="card-page-header">{title}</header>
            <div className="card-page-content flex flex-center flex-column full-height">
                {children}
            </div>
            <footer className="card-page-footer flex">
                <FancyButton text="SUBMIT" />
            </footer>
        </section>
    </div>
);

CardPage.propTypes = {
    title: PropTypes.string.isRequired,
};

export default CardPage;
