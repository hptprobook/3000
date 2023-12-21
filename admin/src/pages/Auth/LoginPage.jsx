import * as React from 'react';
import Box from '@mui/material/Box';
import './style.css';
import InputEdit from '../../components/common/TextField/InputEdit';
import ButtonLogin from '~/components/common/Button/ButtonLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { AuthLogin, resetState } from "../../redux/slices/authSlice";
import * as Yup from "yup";
import { useFormik } from 'formik';
import LinearIndeterminate from '../../components/common/Loading/LoadingLine';
import BasicAlertl from '../../components/common/Alert/BasicAlertl';
const loginSchema = Yup.object().shape({
    login: Yup.string()
        .required('Tên đăng nhập không được để trống!')
        .min(4, 'Tên đăng tối thiểu 4 kí tự')
        .max(123, 'Tên đăng nhập không quá 128 kí tự'),
    password: Yup.string()
        .required('Mật khẩu bắt buộc')
        .max(1000, 'Mật khẩu không quá 1000 kí tự'),
})
export default function LoginPage() {

    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.status);
    const error = useSelector((state) => state.auth.error);
    const data = useSelector((state) => state.auth.data);

    const [loginError, setLoginError] = React.useState('');
    const [loginSuccess, setLoginSuccess] = React.useState(false);

    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const status = searchParams.get('status');
        if (status === 'logged_out') {
            // Xử lý tình huống khi status là 'logged_out'
            console.log('User is logged out');
        }

    }, [location.search]);
    useEffect(() => {
        if (status == 'success') {
            if (data.error) {
                if (data.error == 'Password is incorrect.') {
                    setLoginError('Mật khẩu không trùng!');
                }
                if (data.error == 'Email or phone does not exist.') {
                    setLoginError('Tài khoản không tồn tại');
                }
            }
            else {
                if (data.user.status !== 'active') {
                    setLoginError('Tài khoản bị khóa!');
                }
                else if (data.user.role !== 'ADMIN') {
                    setLoginError('Bạn không phải ADMIN!');
                }
                else {
                    setLoginSuccess(true);
                    console.log(data.token)
                    localStorage.setItem('access_token', data.token);
                    const navLogin = async () => {
                        try {
                            // Dispatch resetState and wait for it to complete
                            await dispatch(resetState());

                            // Navigate after resetState is complete
                            await navigate('/');

                            setLoginSuccess(true);
                        } catch (error) {
                            console.error('Error during login navigation:', error);
                        }
                    };
                    setLoginSuccess(true);
                    setTimeout(() => {
                        navLogin();
                    }, 2000);
                }
            }
        }
    }, [status])
    const formik = useFormik({
        initialValues: {
            login: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            setLoginError('');
            dispatch(resetState());
            dispatch(AuthLogin({ data: values }));
        },
    });
    return (
        <Box className='login-page' sx={{ flexGrow: 1 }}>
            {status == 'loading' ? <LinearIndeterminate /> : ''}
            {loginError != '' ? <BasicAlertl label={loginError} severity={'error'} /> : ''}
            {loginSuccess != '' ? <BasicAlertl label={'Đăng nhập thành công'} severity={'success'} /> : ''}

            <div className='context-login pad64px'>
                <h1 className='title-login'>
                    Chào mừng đến với trang quản trị 3000
                </h1>
                <p className='content-login'>
                    Đăng nhập để sử dụng các tính năng quản trị viên
                </p>
            </div>
            <div className='form-login pad64px'>
                <div className="logo-login">
                    <img src="../src/assets/img/logo_white.png" alt="" />
                </div>
                <div className='form'>
                    <form onSubmit={formik.handleSubmit}>
                        <div style={{ margin: '12px 0' }}>
                            <InputEdit
                                id="username"
                                label="Tên đăng nhập / Email"
                                name={'login'}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.login &&
                                    Boolean(formik.errors.login)
                                }
                                helperText={
                                    formik.touched.login && formik.errors.login
                                }
                            />
                        </div>
                        <div style={{ margin: '12px 0' }}>
                            <InputEdit
                                id="password"
                                label="Mật khẩu"
                                type="password"
                                name={'password'}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password && formik.errors.password
                                }
                            />
                        </div>
                        <ButtonLogin

                            colorText={'#fff'}
                            label={'Đăng nhập'}
                            background={'rgb(99, 102, 241)'}
                            hover={'rgb(67, 56, 202)'}
                        />
                    </form>
                </div>
            </div >
        </Box >
    );
}