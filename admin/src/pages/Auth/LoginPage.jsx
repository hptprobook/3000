import * as React from 'react';
import Box from '@mui/material/Box';
import './style.css';
import InputLogin from '../../components/common/TextField/InputLogin';
import ButtonLogin from '~/components/common/Button/ButtonLogin';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';


export default function LoginPage() {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [navigate, token]);
    function Login() {
        let login = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        AuthService.login({ login, password })
            .then(response => {
                if (response.error) {
                    console.log(response);
                } else {
                    localStorage.setItem('access_token', response.token);
                    navigate('/');
                }
            });
    }
    return (
        <Box className='login-page' sx={{ flexGrow: 1 }}>
            <div className='context-login pad64px'>
                <h1 className='title-login'>
                    Welcome to Devias Kit PRO
                </h1>
                <p className='content-login'>
                    A professional kit that comes with ready-to-use MUI components developed with one common goal in mind, help you build faster & beautiful applications.
                </p>
            </div>
            <div className='form-login pad64px'>
                <div className="logo-login">
                    <img src="../src/assets/img/logo_white.png" alt="" />
                </div>
                <div className='form'>
                    <InputLogin
                        id="username"
                        label="Tên đăng nhập / Email"
                        type="text"
                    />
                    <InputLogin
                        id="password"
                        label="Mật khẩu"
                        type="password"
                    />
                    <ButtonLogin
                        funcustom={Login}
                        colorText={'#fff'}
                        label={'Đăng nhập'}
                        background={'rgb(99, 102, 241)'}
                        hover={'rgb(67, 56, 202)'}
                    />
                </div>
            </div>
        </Box>
    );
}