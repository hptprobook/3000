import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import ButtonAdd from '../Button/ButtonAdd';
import ButtonExport from '../Button/ButtonExport';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './style.css';
const HeaderUser = (propCustom) => {
    return (
        <Box sx={{ width: '100%', paddingTop: '32px' }}>
            <div className='headerPage-user'>
                <Avatar
                    alt="Remy Sharp"
                    src="../../src/assets/img/logo.jfif"
                    sx={{ width: 56, height: 56 }}
                />
                <div className='headerPage-user__content'>
                    <Typography variant="h4" sx={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif !important',
                        fontWeight: 600,
                        fontSize: '32px'
                    }} gutterBottom>
                        {propCustom.nameUser}
                    </Typography>
                    <Typography variant="h6" sx={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif !important',
                        fontWeight: 600,
                        fontSize: '14px'
                    }} gutterBottom>
                        {propCustom.nameUser}
                    </Typography>
                    {/* <Breadcrumb link={propCustom.Breadcrumb} /> */}
                </div>
            </div>
        </Box>
    )
}

export default HeaderUser
