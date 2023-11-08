import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddIcon from '@mui/icons-material/Add';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    padding: '6px 12px',
    lineHeight: 1.5,
    borderRadius: '10px',
    backgroundColor: 'transparent',
    '& .MuiButtonBase-root': {
        display: 'flex',
        justifyContent: 'center',
    },
    '&:hover': {
        backgroundColor: '#161b29',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#005cbf',
    },
});
export default function ButtonExport() {
    return (
        <BootstrapButton variant="contained" startIcon={<BrowserUpdatedIcon />}>Xuất</BootstrapButton>
    )
}
