import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './layout/header/Header';
import BodyWrapper from './layout/body/BodyWrapper';
import Footer from './layout/footer/Footer';
import RegisterPage from './pages/register-page/RegisterPage';
import LoginPage from './pages/login-page/LoginPage';
import PortfolioPage from './pages/portfolio-page/PortfolioPage';
import { FormContextProvider } from './context/form-context/FormContext';
import ProtectedRoute from './pages/ProtectedRoute';
import { useAuthContext } from './context/auth-context/AuthContext';

const App = () => {
    const [{ loggedIn }] = useAuthContext();

    return (
        <div className="app flex flex-column flex-1">
            <Header />
            <BodyWrapper>
                <Switch>
                    <Route path='/' exact>
                        <FormContextProvider>
                            <PortfolioPage />
                        </FormContextProvider>
                    </Route>
                    <ProtectedRoute path="/transactions">
                        <div>placehodler</div>
                    </ProtectedRoute>
                    {!loggedIn &&
                        <>
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
                        </>
                    }
                </Switch>
            </BodyWrapper>
            <Footer />
        </div>
    );
}

export default App;
