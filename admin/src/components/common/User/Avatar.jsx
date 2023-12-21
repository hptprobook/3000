// AvatarUser.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import BasicAlertl from '../Alert/BasicAlertl';

// Create a styled Menu component
const AvatarMenu = styled(Menu)(({ theme, custombg }) => ({
    '& .MuiPaper-root': {
        padding: '0 8px',
        borderRadius: 12,
        backgroundColor: custombg,
    },
}));
const CustomListIcon = styled(ListItemIcon)(({ customcolor }) => ({
    color: customcolor,
}));
export default function AvatarUser({ customBg, customColor, customColor2, mode }) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [logout, setLogout] = React.useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    }

    return (
        <React.Fragment>
            <Tooltip title="Tài khoản">
                {logout ? <BasicAlertl label={'Đăng xuất thành công'} /> : ''}
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2, }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    cursor="pointer"
                >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
            </Tooltip>
            <AvatarMenu custombg={customBg}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: customBg,
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Typography variant="p" sx={{ padding: '8px 16px', color: customColor }} component="p">
                    Nguyễn Văn Tín
                </Typography>
                <Typography variant="p" sx={{ padding: '8px 16px', color: customColor2 }} component="p">
                    bguyt46@gmail.com
                </Typography>
                <hr style={{ margin: 0, color: customColor }} />
                <Divider />
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        borderRadius: 3,
                        p: 1,
                        m: 1,
                        '&:hover': {
                            backgroundColor: mode == 'dark' ? '#1a222f' : '#f6f6f7', // Change this to your desired hover color
                        },
                    }}
                >
                    <CustomListIcon customcolor={customColor2}>
                        <PersonAdd fontSize="small" />
                    </CustomListIcon>
                    <Typography variant="p" sx={{ color: customColor }} component="p">
                        Tài khoản
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        borderRadius: 3,
                        p: 1,
                        m: 1,
                        '&:hover': {
                            backgroundColor: mode == 'dark' ? '#1a222f' : '#f6f6f7', // Change this to your desired hover color
                        },
                    }}
                >
                    <CustomListIcon customcolor={customColor2}>
                        <Settings fontSize="small" />
                    </CustomListIcon>
                    <Typography variant="p" sx={{ color: customColor }} component="p">
                        Cài đặt
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        borderRadius: 3,
                        p: 1,
                        m: 1,
                        '&:hover': {
                            backgroundColor: mode == 'dark' ? '#1a222f' : '#f6f6f7', // Change this to your desired hover color
                        },
                    }}
                >
                    <CustomListIcon customcolor={customColor2}>
                        <Logout fontSize="small" />
                    </CustomListIcon>
                    <Typography variant="p" sx={{ color: customColor }} component="p" onClick={handleLogout}>
                        Đăng xuất
                    </Typography>
                </MenuItem>
            </AvatarMenu>
        </React.Fragment>
    );
}
