import * as React from 'react';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';

export default function InputLogin({ type, id, label }) {
    const ValidationTextField = styled(TextField)({
        '& label': {
            color: '#B2BAC2',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#B2BAC2',
        },
        '& .MuiOutlinedInput-root': {
            color: '#B2BAC2',
            '& fieldset': {
                border: '2px solid #1a222f',
            },
            '&:hover fieldset': {
                borderColor: '#1127c4',
            },
            '&:hover': {
                backgroundColor: '#1a222f',
            },
        },
    });

    return (
        <ValidationTextField
            fullWidth
            sx={{
                m: 1,
            }}
            type={type}
            required
            id={id}
            label={label}
        />
    );
}