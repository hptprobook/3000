import { Box, Typography } from '@mui/material'
import React from 'react'
import ButtonHeader from '../Button/ButtonHeader'
import { FaArrowPointer } from "react-icons/fa6";
import { FaFlag } from 'react-icons/fa';
const HeaderDashBoard = () => {
    return (
        <Box sx={{ width: '100%', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <Typography variant="h4" sx={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif !important',
                    fontWeight: 600,
                    fontSize: '30px'
                }} gutterBottom>
                    Tổng quan
                </Typography>
            </div>
            <ButtonHeader label={'Đi tới nhiệm vụ'} icon={<FaFlag />} />
        </Box>
    )
}

export default HeaderDashBoard
