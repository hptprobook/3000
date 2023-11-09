import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import color from '~/config/colorConfig';
import './style.css';
function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb({ link }) {
    const breadcrumbs = [
        <NavLink key='1' to='/' className='breadcrumb-link' style={{
            color: color.textColor.dark,
            textDecoration: 'none',
        }}>
            Tổng quan
        </NavLink>
        ,
        <Typography key="2" sx={{
            color: color.textColor.dark,
        }}>
            {link[0]}
        </Typography>,
        <Typography key="3" sx={{
            color: color.textGray,
        }}>
            {link[1]}
        </Typography>,
    ];

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon sx={{ color: color.textColor.dark }} fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
