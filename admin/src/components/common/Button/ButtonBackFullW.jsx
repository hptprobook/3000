import React from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Link from '@mui/material/Link';
import { IconButton } from '@mui/material';
const ButtonBackFullW = ({ label }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };
    return (
        <div className='ButtonBackFullW'>

            <IconButton
                onClick={handleGoBack}
                size='small' aria-label="delete">
                <BiArrowBack
                    style={{
                        color: 'rgb(237, 242, 247)',
                    }} />
            </IconButton>
            <Link
                onClick={handleGoBack}
                sx={{
                    fontSize: '14px',
                    color: 'rgb(237, 242, 247)',
                    cursor: 'pointer'
                }}
                className='ButtonBackLink'
                underline="hover">
                {label}
            </Link>
        </div>
    )
}

export default ButtonBackFullW