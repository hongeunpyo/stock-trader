import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useUserContext } from '../context/user-context/UserContext';

const ProtectedRoute = ({ path, children, exact }) => {
    const [{loggedIn}] = useUserContext();

    return (
        <Route path={path} exact={exact}>
            {loggedIn ? children : <Redirect to='/login' />}
        </Route>
    );
};

ProtectedRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
    exact: false,
};

export default ProtectedRoute;
