import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate() {
    return (
        <Box sx={{
            zIndex: '99999',
            width: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            bottom: '0',
        }}>
            <LinearProgress />
        </Box>
    );
}
