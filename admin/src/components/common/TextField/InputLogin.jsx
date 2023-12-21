import * as React from 'react';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { ThemeProvider, createTheme } from '@mui/material';

export default function InputLogin({ type, id, label, error, helperText, onBlur, onChange }) {
    const theme = createTheme({
        overrides: {
            MuiOutlinedInput: {
                input: {
                    backgroundColor: 'transparent',
                },
            },
        },
    });
    const ValidationTextField = styled(TextField)({
        '& label': {
            color: '#B2BAC2',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#B2BAC2',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
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
        <ThemeProvider theme={theme}>
            <ValidationTextField
                autoComplete='off'
                error={error}
                // {...(error ? 'error': null)}
                fullWidth
                sx={{
                    m: 1,
                }}
                type={type}
                required
                id={id}
                label={label}
                helperText={helperText}
                onChange={onChange}
                onBlur={onBlur}
            />

        </ThemeProvider>
    );
}