import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from 'react';
import styled from '@emotion/styled';


const StyledFormControl = styled(FormControl)`
  && {
    width: 100%;
    color: #fff;
  }
`;

const StyledInputLabel = styled(InputLabel)`
  && {
    color: #fff;
  }
`;

const StyledOutlinedInput = styled(OutlinedInput)`
  && {
    color: #fff;

    & fieldset {
    //   border-color: white; /* Change border color */
    }
  }
`;

// Your component
export default function InputPassword() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
       <div>
         <StyledFormControl variant="outlined">
            <StyledInputLabel htmlFor="outlined-adornment-password">Mật khẩu</StyledInputLabel>
            <StyledOutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </StyledFormControl>
       </div>
    );
}
