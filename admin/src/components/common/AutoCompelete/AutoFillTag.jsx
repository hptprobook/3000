import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styled from '@emotion/styled';

const options = ['Option 1', 'Option 2'];

const StyledTextAuto = styled(TextField)(({ theme }) => ({
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
    },
    'svg': {
        color: '#edf2f7',
    }
}));

export default function AutoFillTag() {
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    return (
        <div>
            <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <br />
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                renderInput={(params) => <StyledTextAuto {...params} label="Controllable" />}
            />
        </div>
    );
}
