import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';

const AutohideSnackbar = ({ message, openIt }) => {
    console.log('reach heereee', message, openIt);
    
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <GridCloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <div>
            <Snackbar
                open={openIt}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    );
}

export default AutohideSnackbar;