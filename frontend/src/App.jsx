import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './layout/header/Header';
import BodyWrapper from './layout/body/BodyWrapper';
import Footer from './layout/footer/Footer';
import RegisterPage from './pages/register-page/RegisterPage';
import LoginPage from './pages/login-page/LoginPage';

const App = () => (
    <div className="app flex flex-column flex-1">
        <Header />
        <BodyWrapper>
            <Switch>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
            </Switch>
        </BodyWrapper>
        <Footer />
    </div>
);

export default App;
