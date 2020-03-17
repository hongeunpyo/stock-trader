import React, { useContext, useReducer } from 'react';

const initialState = {
    values: {},
};

const FormState = React.createContext(initialState);

const FormDispatch = React.createContext();

export const FormActions = {
    ADD_FORM_DATA: 'ADD_FORM_DATA',
    SUBMIT_FORM_DATA: 'SUBMIT_FORM_DATA',
};

const { ADD_FORM_DATA, SUBMIT_FORM_DATA } = FormActions

const FormReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_FORM_DATA:
            console.log(state);
            return ({
                ...state,
                values: {
                    ...state.values,
                    ...payload
                }
            });
        case SUBMIT_FORM_DATA:
            return state;
        default:
            return state;
    }
}

export const FormContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FormReducer, initialState);

    return (
        <FormState.Provider value={state}>
            <FormDispatch.Provider value={dispatch}>
                {children}
            </FormDispatch.Provider>
        </FormState.Provider>
    )
}

export const useFormContext = () => {
    const state = useContext(FormState);
    const dispatch = useContext(FormDispatch);

    return [state, dispatch];
};
