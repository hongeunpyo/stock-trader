import React, { useReducer } from 'react';

const initialState = {values: {}};

const FormState = React.createContext({initialState});

const FormDispatch = React.createContext();

export const FormActions = {
    ADD_FORM_DATA: 'ADD_FORM_DATA',
}

const { ADD_FORM_DATA } = FormActions

const FormReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_FORM_DATA:
            return {
                ... state,
                values: {
                    ...state.values,
                    ...payload.values
                }
            }
    }
}

export const FormStateProvider = () => {
    const [state, dispatch] = useReducer(FormReducer)
}