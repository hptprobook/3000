import * as React from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';
import { FormHelperText } from '@mui/material';

const FormControlEdit = styled(FormControl)(({ theme, error }) => ({
  margin: 0,
  width: '100%',
  '& .MuiInputBase-root.MuiFilledInput-root': {
    borderRadius: '14px',
    border: `2px solid ${error ? color.textColor.error : color.colorHover.hoverGray}`,
    transition: 'border .4s linear',
    color: color.textColor.dark
  },
  '& .MuiInputBase-root.MuiFilledInput-root.Mui-focused': {
    border: `2px solid ${color.focusedColor.dark}`,
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
    color: error ? color.textColor.error : color.textColor.dark,
  },
  '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
    color: color.focusedColor.dark,
  },
  '& svg': {
    color: color.textColor.dark
  }
}));

export default function InputEdit({ label, icon, value, onChange, type, error, helperText, onBlur, id, note, disabled, name }) {
  return (
    <FormControlEdit error={error} fullWidth sx={{ m: 1 }} variant="filled">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <FilledInput
        disabled={disabled}
        defaultValue={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type || 'text'}
        name={name}
        id={id}
        startAdornment={<InputAdornment position="start">{icon}</InputAdornment>}
      />
      <FormHelperText id="component-error-text">{error ? helperText : ''}</FormHelperText>
      <FormHelperText sx={{
        color: color.textColor.dark
      }}>{note ? note : ''}</FormHelperText>
    </FormControlEdit>
  );
}
