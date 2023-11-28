import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';

const ButtonOpenSelectCustom = styled(Button)(({ theme, custom }) => ({
    borderRadius: '14px',
    padding: custom ? '16px' : '10px 14px',
    border: custom ? '1px solid ' + color.colorHover.hoverGray : 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    margin: custom ? '0' : '8px',
    width: custom ? '100%' : 'auto',
    display: 'flex',
    justifyContent: 'space-between',
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

export default function ButtonOpenSelect({ id, onClick, label, custom }) {
    return (
        <ButtonOpenSelectCustom custom={custom} variant="contained" aria-describedby={id} endIcon={<KeyboardArrowDownIcon />} onClick={onClick}>
            {label}
        </ButtonOpenSelectCustom>
    );
}
