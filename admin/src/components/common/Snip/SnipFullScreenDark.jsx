import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function SnipFullScreenDark() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#111927' , height: '100vh'  }}>
      <CircularProgress />
    </Box>
  );
}
