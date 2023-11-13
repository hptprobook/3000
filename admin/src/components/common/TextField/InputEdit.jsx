import * as React from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import styled from '@emotion/styled';


const FormControlEdit = styled(FormControl)`
  width: 100%;
  margin: 8px; 
`;

const InputLabelEdit = styled(InputLabel)`
  /* Add any styles you need for the InputLabel */
`;

const FilledInputEdit = styled(FilledInput)`
  /* Add any styles you need for the FilledInput */
`;
export default function InputEdit() {


    return (
        <FormControlEdit fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <FilledInput
                id="filled-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        </FormControlEdit>
    );
}