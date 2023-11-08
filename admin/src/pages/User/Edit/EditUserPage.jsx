import { Box } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import ButtonBackFullW from '../../../components/common/Button/ButtonBackFullW';

const EditUserPage = () => {
    const { id } = useParams();

    return (
        <Box>
            <ButtonBackFullW label={'Danh sách'} />
        </Box>
    )
}

export default EditUserPage