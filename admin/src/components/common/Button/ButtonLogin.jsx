import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function ButtonLogin({ fullW = true, colorText, background, hover, label, funcustom }) {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: colorText,
        backgroundColor: background,
        '&:hover': {
            backgroundColor: hover,
        },
        borderRadius: '12px'
    }));

    return (
        <ColorButton
            onClick={funcustom} // Use onClick to attach the custom function
            size='large'
            fullWidth={fullW}
            sx={{ m: 1 }}
            variant='contained'
        >
            {label}
        </ColorButton>
    );
}
