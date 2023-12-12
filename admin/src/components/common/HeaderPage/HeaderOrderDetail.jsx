import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import './style.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatDateTime from '../Function/FormatDate';
import ButtonNormal from '../Button/ButtonNormal';
const HeaderOrderDetail = ({ label, create_at, onClick }) => {
    return (
        <Box sx={{ width: '100%', paddingTop: '32px' }}>
            <div className='headerPage-orderDetail'>
                <div className='headerPage-orderDetail__content'>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h4" sx={{
                            fontFamily: 'Plus Jakarta Sans, sans-serif !important',
                            fontWeight: 600,
                            fontSize: '32px',
                            padding: '0 !important',
                        }} gutterBottom>
                            {label}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="p" sx={{
                                fontFamily: ' Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important',
                                fontSize: '14px',
                                color: 'rgb(160, 174, 192)',
                            }} gutterBottom>
                                Ngày tạo:
                            </Typography>
                            <CalendarMonthIcon fontSize="small" sx={{ color: 'rgb(160, 174, 192)' }} />
                            <Typography variant="p" sx={{
                                fontFamily: ' Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important',
                                fontSize: '14px'
                            }} gutterBottom>
                                {FormatDateTime(create_at)}
                            </Typography>
                        </Stack>
                    </Stack>

                </div>
            </div>
        </Box>
    )
}

export default HeaderOrderDetail
