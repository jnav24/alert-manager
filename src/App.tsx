import React, { useContext, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AlertContext } from './context/AlertProvider';
import AlertComponent from './Alert';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const { addAlert, alertList } = useContext(AlertContext);

    const addRandomAlert = () => {
        const types = ['error', 'warning', 'info', 'success'];
        addAlert({
            alertType: types[Math.floor(Math.random() * types.length)],
            id: uuidv4(),
            link: '',
            text: 'This is a sample alert',
            timeLimit: Math.ceil(Math.random() * 10),
        });
    };

    return (
        <Container>
            <div style={{ marginBottom: '1rem' }}>
                <Typography variant="h3" component="h2">
                    Dashboard
                </Typography>

                <Button color="primary" variant="contained" onClick={addRandomAlert}>
                    Add Alert
                </Button>
            </div>

            {alertList.map(alert => (
                <div style={{ marginBottom: '1rem' }} key={alert.id}>
                    <AlertComponent data={alert} />
                </div>
            ))}
        </Container>
    )
}

export default App
