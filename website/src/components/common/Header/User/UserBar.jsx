import React from 'react'
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import PrimaryBtn from '../../Button/PrimaryButton/PrimaryBtn';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CameraIcon from '@mui/icons-material/Camera';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import './style.css';
import CountBtn from '../../Button/CountButton/CountButton';

const UserBarContainer = styled('div')(() => ({

}));

const UserBarTop = styled('div')(() => ({
    display: 'flex',
}));

const UserBarLink = styled('div')(() => ({
    display: 'flex',
    padding: '0 16px',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '2px',
        height: '20px',
        backgroundColor: '#e3e3e3',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
    }
}));

const UserBarAddress = styled('div')(() => ({
    marginTop: '14px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    height: '100%'
}));

export default function UserBar() {
    return (
        <UserBarContainer>
            <UserBarTop>
                <UserBarLink>
                    <Link href={("/")}>
                        <PrimaryBtn icon={<HomeRoundedIcon />} text='Trang chủ' isActive={true} />
                    </Link>
                    <Link href={("/")}>
                        <PrimaryBtn icon={<CameraIcon />} text='Astra' isActive={false} />
                    </Link>
                    <Link href={("/")}>
                        <PrimaryBtn icon={<SentimentSatisfiedAltIcon />} text='Tài khoản' isActive={false} />
                    </Link>
                </UserBarLink>

                <div style={{ paddingLeft: '16px' }}>
                    <CountBtn icon={<ShoppingCartRoundedIcon />} count={3} />
                </div>
            </UserBarTop>

            <UserBarAddress>
                <span style={{ fontWeight: '400', color: "#8d8d95", display: 'flex', alignItems: 'center' }}>
                    <LocationOnOutlinedIcon sx={{ fontSize: '22px' }} /> Giao đến:
                </span>
                &nbsp;
                <Link style={{ textDecoration: 'underline' }} href={("/")}>
                    45/19 Nguyễn Viết Xuân
                </Link>
            </UserBarAddress>


        </UserBarContainer>
    )
}
