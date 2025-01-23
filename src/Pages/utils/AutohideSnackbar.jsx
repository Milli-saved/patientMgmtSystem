import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';

const AutohideSnackbar = ({ message }) => {
    console.log('reach heereee', message, openIt);
    return (
        <div>
            <Snackbar
                open="true"
                autoHideDuration={5000}
                // onClose={handleClose}
                message={message}
            // action={action}
            />
        </div>
    );
}

export default AutohideSnackbar;