import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header id="header-container" className="flex full-width">
        <div id="header-right-side" className="flex">
            <Link to="/">
                <div id="header-logo-container" className="flex">
                    <img id="header-logo" alt="application logo" src="TradeAide.png" />
                    <div id="header-logo-text-container" className="flex flex-column">
                        <span id="header-title">TradeAide</span>
                        <span id="header-sub-title">trading simplified</span>
                    </div>
                </div>
            </Link>
        </div>
        <div id="header-left-side" className="flex">
            <div id="header-link-container" className="flex flex-center">
                <Link to="/register">
                    <span className="header-link">Register</span>
                </Link>
                <span id="header-separator">|</span>
                <Link to="/login">
                    <span className="header-link">Sign in</span>
                </Link>
            </div>
        </div>
    </header>
);

export default Header;
