import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';

const AutohideSnackbar = ({message}) => {
    console.log('reach heereee', message);
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div>
             <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={message}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <GridCloseIcon fontSize="small" />
                </IconButton>
            }
        />
        </div>
    );
}

export default AutohideSnackbar;