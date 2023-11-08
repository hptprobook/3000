import styled from '@emotion/styled';
import { TextField } from '@mui/material'
import React from 'react'
const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiFormLabel-root': {
        color: '#edf2f7',

    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgb(99, 102, 241) !important',
        transition: 'border 0.4s linear',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        transition: 'border .4s linear',
    },
    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        color: 'rgb(99, 102, 241)',
    },
    '& fieldset': {
        borderColor: 'rgba(243, 244, 246, 0.04)',
        borderRadius: '12px'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
    '&:hover fieldset': {
        backgroundColor: 'rgba(243, 244, 246, 0.04)',
    },
    '& .MuiOutlinedInput-input': {
        color: '#edf2f7',
    }
}));
export const ReadOnly = ({ label, value }) => {
    return (
        <StyledTextField
            id="outlined-read-only-input"
            label={label}
            defaultValue={value}
            InputProps={{
                readOnly: true,
            }}
        />
    )
}
