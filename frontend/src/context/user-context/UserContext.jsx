import React, { useContext, useEffect, useReducer } from 'react';

const initialState = {
    userId: '',
    token: '',
    email: '',
    fullName: '',
    userTotal: 0,
    loggedIn: false,
};

const UserState = React.createContext(initialState);

const UserDispatch = React.createContext();

export const UserActions = {
    UPDATE_TOKEN: 'UPDATE_TOKEN',
    UPDATE_LOG_IN_STATUS: 'UPDATE_LOG_IN_STATUS',
    SIGN_IN: 'SIGN_IN',
    UPDATE_TOTAL: 'UPDATE_TOTAL'
};

const { UPDATE_TOKEN, SIGN_IN, UPDATE_TOTAL } = UserActions

const UserReducer = (state, action) => {
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
            });
        case UPDATE_TOTAL:
            return ({
                ...state,
                ...payload,
            });
        default:
            return state;
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

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
        <UserState.Provider value={state}>
            <UserDispatch.Provider value={dispatch}>
                {children}
            </UserDispatch.Provider>
        </UserState.Provider>
    );
};

export const useUserContext = () => {
    const state = useContext(UserState);
    const dispatch = useContext(UserDispatch);

    return [state, dispatch];
};
