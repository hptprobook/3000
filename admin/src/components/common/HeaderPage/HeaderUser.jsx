import { Avatar, Box, Chip, Typography } from '@mui/material';
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
                    <Chip
                        sx={{
                            marginLeft: '12px',
                            backgroundColor: propCustom.role == 'USER' ? '#162f34' : '#183343',
                            color: propCustom.role == 'USER' ? '#10b981' : '#d32f2f',
                            textTransform: 'uppercase',
                            fontWeight: '600'
                        }}
                        label={propCustom.role}
                    />
                    {/* <Breadcrumb link={propCustom.Breadcrumb} /> */}
                </div>
            </div>
        </Box>
    )
}

export default HeaderUser
