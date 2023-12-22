import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './style.css';
import { Box } from '@mui/material';
import DashboardRoute from '~/routes/dashboard.route';
import { useNavigate } from 'react-router-dom';
import ButtonChangeMode from '../../common/Button/ButtonChangeMode';

export default function MainLayout() {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate, token]);
    const [mode, setMode] = useState('dark');

    const changeMode = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    }

    return (
        <Box>
            <div className={`main ${mode === 'dark' ? 'dark' : 'light'}`}>
                <CssBaseline />
                <Sidebar />
                <div className='main-layout'>
                    <Header sx={{ flexGrow: 1, width: '100%' }} mode={mode} changeMode={changeMode} />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DashboardRoute />
                    </Box>
                </div>
            </div>
        </Box>
    );
}
