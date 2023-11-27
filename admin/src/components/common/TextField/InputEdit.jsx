import * as React from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';


const FormControlEdit = styled(FormControl)(({ theme }) => ({
  margin: 0,
  width: '100%',
  '& .MuiInputBase-root.MuiFilledInput-root': {
    borderRadius: '14px',
    border: '2px solid' + color.colorHover.hoverGray,
    transition: 'border .4s linear',
    color: color.textColor.dark
  },
  '& .MuiInputBase-root.MuiFilledInput-root.Mui-focused': {
    border: '2px solid' + color.focusedColor.dark,
    transition: 'border .4s linear',
  },
  '& .MuiInputBase-root.MuiFilledInput-root::before': {
    border: 'none'
  },
  '& .MuiInputBase-root.MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
    border: 'none'
  },
  '& .MuiInputBase-root.MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error)': {
    backgroundColor: color.colorHover.hoverGray
  },
  '& .MuiInputBase-root.MuiFilledInput-root::after': {
    border: 'none'
  },
  '& .MuiFormLabel-root.MuiInputLabel-root': {
    color: color.textColor.dark,
  },
  '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
    color: color.focusedColor.dark,
  },
  '& svg': {
    color: color.textColor.dark
  }
}))

export default function InputEdit({ label, icon, value, onChange, type }) {


  return (
    <FormControlEdit fullWidth sx={{ m: 1 }} variant="filled">
      <InputLabel htmlFor="filled-adornment-amount">{label}</InputLabel>
      <FilledInput
        defaultValue={value}
        onChange={onChange}
        type={type || 'text'}
        id="filled-adornment-amount"
        startAdornment={<InputAdornment position="start">{icon}</InputAdornment>}
      />
    </FormControlEdit>
  );
}