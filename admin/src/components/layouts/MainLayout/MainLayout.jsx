import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './style.css';
import { Box } from '@mui/material';
import DashboardRoute from '../../../routes/dashboard.route';
export default function MainLayout() {
    const drawerWidth = 240;

    return (
        <Box className="main">
            <CssBaseline />
            <Sidebar />
            <div className='main-layout'>
                <Header sx={{ flexGrow: 1, width: '100%' }} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DashboardRoute />
                </Box>
            </div>
        </Box>
    );
}
