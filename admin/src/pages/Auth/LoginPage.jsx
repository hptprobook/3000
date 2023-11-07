import * as React from 'react';
import Box from '@mui/material/Box';
import './style.css';
import InputLogin from '../../components/common/TextField/InputLogin';
import ButtonLogin from '~/components/common/Button/ButtonLogin';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FormHelperText } from '@mui/material';
// import { useHistory } from 'react-router-dom';


export default function LoginPage() {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [usernameHelperText, setUsernameHelperText] = React.useState('');
    const [passwordHelperText, setPasswordHelperText] = React.useState('');
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [navigate, token]);
    function Login() {
        let login = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        event.preventDefault();
        // Validate username
        if (login.length < 8) {
            setUsernameError(true);
            setUsernameHelperText('Tên đăng nhập / Email phải chứa ít nhất 8 ký tự');
            return;
        } else {
            setUsernameError(false);
            setUsernameHelperText('');
        }

        // Validate password
        if (password.length < 8) {
            setPasswordError(true);
            setPasswordHelperText('Mật khẩu phải chứa ít nhất 8 ký tự');
            return;
        } else {
            setPasswordError(false);
            setPasswordHelperText('');
        }
      

        AuthService.login({ login, password })
            .then(response => {
                if (response.error) {
                    console.log(response);
                } else {
                    // localStorage.setItem('access_token', response.data.token);
                    // navigate('/');
                    console.log(response);
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
                        error={usernameError}
                        helperText={usernameHelperText}
                    />
                    <InputLogin
                        id="password"
                        label="Mật khẩu"
                        type="password"
                        error={passwordError}
                        helperText={passwordHelperText}
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