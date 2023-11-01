import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';

export default function LoginForm() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const ValidationTextField = styled(TextField)({
        '& label': {
            color: '#B2BAC2',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#B2BAC2',
        },
        '& .MuiOutlinedInput-root': {
            color: '#B2BAC2',
            '& fieldset': {
                borderColor: '#E0E3E7',
            },
            '&:hover fieldset': {
                borderColor: '#B2BAC2',
            },
        },
    });
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className='input-login'>
                <ValidationTextField
                    fullWidth
                    sx={{
                        m: 1,
                    }}
                    required
                    id="outlined-required"
                    label="Email / Tên đăng nhập "
                />
            </div>
            <div className='input-login'>
                <ValidationTextField
                    fullWidth
                    sx={{
                        m: 1,
                    }}
                    type='password'
                    required
                    id="outlined-required"
                    label="Email / Tên đăng nhập "
                />
            </div>
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </Box>
    );
}
