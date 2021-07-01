import React, {useContext, useEffect} from 'react';
import { AlertContext } from './context/AlertProvider';
import { AlertType } from './@types/alerts';
import Alert from '@material-ui/lab/Alert';

type Props = {
    data: AlertType;
};

export default function AlertComponent({
    data
}: Props) {
    const { removeAlert } = useContext(AlertContext);

    setTimeout(() => {
        removeAlert(data.id);
    }, data.timeLimit*1000);

    return (
        <Alert variant="filled" severity={data.alertType as any}>
            {data.text} - {data.id}
        </Alert>
    );
}
