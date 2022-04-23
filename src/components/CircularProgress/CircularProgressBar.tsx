import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';

function CircularProgressBar() {

    return (
        <div>
            <div style={{position: 'fixed', textAlign: 'center', top: '30%', width: '100%'}}>
                <CircularProgress />
                </div>
            <div>
                <ErrorSnackbar />
            </div>
        </div>
    )
}

export default CircularProgressBar;