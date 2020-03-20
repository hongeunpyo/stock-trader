import React from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';

const SplitPage = ({ title, renderLeft, renderRight }) => (
    <div className="full-width flex flex-center">
        <div className="full-width full-height flex flex-vertical-center flex-column">
            <div className="split-page-header-container">
                <header className="split-page-header">{ title }</header>
                <div className="split-page-header-underline" />
            </div>
            <div className="split-page-container full-width flex flex-horizontal-center">
                    <section className="split-page-left-section flex flex-column flex-vertical-center">
                        <SimpleBar style={{height: "100%", width: "100%"}}>
                            {renderLeft}
                        </SimpleBar>
                    </section>
                {renderRight &&
                    <>
                        <div className="split-page-divider" />
                        <section className="split-page-right-section flex flex-column">
                            {renderRight}
                        </section>
                    </>
                }
            </div>
        </div>
    </div>
);

SplitPage.propTypes = {
    title: PropTypes.string.isRequired,
    renderLeft: PropTypes.element,
    renderRight: PropTypes.element,
};

SplitPage.defaultProps = {
    renderLeft: null,
    renderRight: null,
}

export default SplitPage;
