import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    height: '100%',
    fontSize: 14,
    padding: '10px 18px',
    lineHeight: 1.5,
    borderRadius: '10px',
    backgroundColor: 'rgb(99, 102, 241)',
    '&:hover': {
        backgroundColor: '#4338ca',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
});
export default function ButtonAdd({ link }) {
    return (
        <NavLink to={link}> <BootstrapButton variant="contained" startIcon={<AddIcon />}>Thêm mới</BootstrapButton></NavLink>
    )
}
