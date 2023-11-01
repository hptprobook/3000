import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './style.css';
import LoginForm from '../../components/common/Form/LoginForm';
import InputPassword from '../../components/common/TextField/InputPassword';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function LoginPage() {
    return (
        <Box className='login-page' sx={{ flexGrow: 1 }}>
            <div className='context-login'>

            </div>
            <div className='form-login'>
                <div className="logo-login">
                    <img src="../src/assets/img/logo_white.png" alt="" />
                </div>
                <div className='form'>
                    <LoginForm />
                    
                </div>
            </div>
        </Box>
    );
}