import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './layout/header/Header';
import BodyWrapper from './layout/body/BodyWrapper';
import Footer from './layout/footer/Footer';
import RegisterPage from './pages/register-page/RegisterPage';
import LoginPage from './pages/login-page/LoginPage';
import { FormContextProvider } from './context/form-context/FormContext';
import { useAuthContext } from './context/auth-context/AuthContext';

const App = () => {
    const [{loggedIn}] = useAuthContext();

    return (
        <div className="app flex flex-column flex-1">
            <Header />
            <BodyWrapper>
                <Switch>
                    <Route path="/" exact>
                        {loggedIn ? <Redirect to="/login" /> : ''}
                    </Route>
                    <Route path="/register">
                        <FormContextProvider>
                            <RegisterPage />
                        </FormContextProvider>
                    </Route>
                    <Route path="/login">
                        <FormContextProvider>
                            <LoginPage />
                        </FormContextProvider>
                    </Route>
                </Switch>
            </BodyWrapper>
            <Footer />
        </div>
    );
}

export default App;
