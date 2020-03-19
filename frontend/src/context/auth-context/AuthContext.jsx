import React, { useContext, useEffect, useReducer } from 'react';

const initialState = {
    token: '',
    email: '',
    fullName: '',
    loggedIn: false,
};

const AuthState = React.createContext(initialState);

const AuthDispatch = React.createContext();

export const AuthActions = {
    UPDATE_TOKEN: 'UPDATE_TOKEN',
    UPDATE_LOG_IN_STATUS: 'UPDATE_LOG_IN_STATUS',
    SIGN_IN: 'SIGN_IN'
};

const { UPDATE_TOKEN, SIGN_IN } = AuthActions

const AuthReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_TOKEN:
            return ({
                ...state,
                ...payload
                });
        case SIGN_IN:
            return ({
                ...state,
                ...payload,
            })

        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // fetch user data
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (state.token) {
            localStorage.setItem('token', state.token);
        };
    }, [state.token]);

    return (
        <AuthState.Provider value={state}>
            <AuthDispatch.Provider value={dispatch}>
                {children}
            </AuthDispatch.Provider>
        </AuthState.Provider>
    );
};

export const useAuthContext = () => {
    const state = useContext(AuthState);
    const dispatch = useContext(AuthDispatch);

    return [state, dispatch];
};
