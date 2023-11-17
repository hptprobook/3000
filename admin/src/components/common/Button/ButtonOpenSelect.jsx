import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';

const ButtonOpenSelectCustom = styled(Button)(({ theme }) => ({
    borderRadius: '14px',
    padding: '10px 14px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    margin: '8px',
    '&:hover': {
        backgroundColor: color.background.button.hoverNoBg,
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#005cbf',
    },
}))

export default function ButtonOpenSelect({ id, onClick, label }) {
    return (
        <ButtonOpenSelectCustom variant="contained" aria-describedby={id} endIcon={<KeyboardArrowDownIcon />} onClick={onClick}>
            {label}
        </ButtonOpenSelectCustom>
    );
}
