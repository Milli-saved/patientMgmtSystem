import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function AutohideSnackbar({ header, message }) {
    return (
        <div>
            <Button onClick={handleClick}>{header}</Button>
            <Snackbar
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
            />
        </div>
    );
}
