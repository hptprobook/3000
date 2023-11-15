import styled from '@emotion/styled';
import { TextField, colors } from '@mui/material'
import React from 'react'
import color from '../../../config/colorConfig';
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
    '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(243, 244, 246, 0.04)',
    },
    '&:hover fieldset': {
        backgroundColor: 'rgba(243, 244, 246, 0.04)',
    },
    '& .MuiOutlinedInput-input': {
        color: '#edf2f7',
    }
}));
export const InputNormal = ({ label, value, onChange, type }) => {
    return (
        <StyledTextField
            autoComplete='false'
            id="outlined-read-only-input"
            label={label}
            defaultValue={value}
            onChange={onChange}
            type={type || 'text'}
        />
    )
}
