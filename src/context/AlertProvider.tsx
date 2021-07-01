import React, { createContext, useReducer } from 'react';
import { AlertType } from '../@types/alerts';

enum AlertEnum {
    ADD_ALERT = 'ADD_ALERT',
    REMOVE_ALERT = 'REMOVE_ALERT',
};

export const AlertContext = createContext<{
    addAlert: (alert: AlertType) => void;
    alertList: Array<AlertType>;
    removeAlert: (id: string) => void;
}>(null);

type Props = {
    children: React.ReactNode;
};

type AlertAction = {
    type: AlertEnum;
    payload: any;
};

type AlertState = {
    list: Array<AlertType>,
};

function reducer(state: AlertState, action: AlertAction) {
    switch (action.type) {
        case AlertEnum.ADD_ALERT:
            return {
                list: [
                    ...state.list,
                    action.payload,
                ],
            };
        case AlertEnum.REMOVE_ALERT:
            return {
                list: state.list.filter(list => list.id !== action.payload),
            };
        default:
            return state;
    }
}

export default function AlertProvider({ children }: Props) {
    const [alert, dispatch] = useReducer(reducer, { list: [] });

    const addAlert = (alert: AlertType) => {
        dispatch({ type: AlertEnum.ADD_ALERT, payload: alert });
    };

    const removeAlert = (id: string) => {
        dispatch({ type: AlertEnum.REMOVE_ALERT, payload: id });
    };

    return (
        <AlertContext.Provider
            value={{
                addAlert,
                alertList: alert.list,
                removeAlert
            }}
        >
            {children}
        </AlertContext.Provider>
    );
}
