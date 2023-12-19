import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';
import { dark } from '@mui/material/styles/createPalette';
import { FormHelperText } from '@mui/material';
const StyledInputVariant = styled(TextField)(({ theme }) => ({
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

    '& .MuiOutlinedInput-input': {
        color: '#edf2f7',
    },
    'svg': {
        color: '#edf2f7',
    },
    '.MuiButtonBase-root .MuiChip-root': {

        border: '1px solid ' + color.textGray,
    },
    '.MuiChip-label': {
        color: color.textColor.dark,
    },
    '&  .MuiChip-deleteIcon ': {
        color: color.textGray
    },
    '&:hover .MuiChip-deleteIcon ': {
        color: color.colorHover.hoverGray
    }
}));
export default function AutoVariant({ label, data, handleChange, error, helperText }) {
    const handleOptionChange = (event, value) => {
        handleChange(value) // Giá trị của option được chọn
    };
    return (
        <>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={data.map((option) => option.name)}
                onChange={handleOptionChange}
                renderInput={(params) => (
                    <StyledInputVariant
                        {...params}
                        label={label}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        onBlur={(e) => handleChange(e.target.value)}
                    />
                )}
            />
            <FormHelperText sx={{ color: color.textColor.error }} id="component-error-text">{error ? helperText : ''}</FormHelperText>
        </>
    );
}