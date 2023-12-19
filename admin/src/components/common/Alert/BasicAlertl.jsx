import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function BasicAlertl({ label, severity }) {
    const [open, setOpen] = React.useState(true);
    React.useEffect(() => {
        setOpen(true);
    }, [label])
    return (
        <Box sx={{
            zIndex: 100000,
            position: 'fixed',
            top: '80px',
            right: '32px',
        }}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity={severity ? severity : 'success'}
                >
                    {label}
                </Alert>
            </Collapse>
        </Box>
    );
}