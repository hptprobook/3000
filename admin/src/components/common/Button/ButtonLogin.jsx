import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function ButtonLogin({ fullW = true, colorText, background, hover, label }) {
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
            type='submit'
            size='large'
            fullWidth={fullW}
            variant='contained'
        >
            {label}
        </ColorButton>
    );
}
