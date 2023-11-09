import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ButtonBackFullW from '../../../components/common/Button/ButtonBackFullW';
import HeaderUser from '../../../components/common/HeaderPage/HeaderUser';
import { InputNormal } from '../../../components/common/TextField/InputNormal';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';
import { fetchUserById } from "~/redux/slices/userSlice";
import ButtonNormal from '../../../components/common/Button/ButtonNormal';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/common/Loading/Loading';

const CustomGrid = styled(Grid)(({ theme }) => ({
    '& MuiGrid-root>.MuiGrid-item': {
        padding: '0px !important',
    }
}));
const EditUserPage = () => {
    const { id } = useParams();
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [loadData, setLoadData] = useState(false);

    function handleSetValue(funcSet, value) {
        funcSet(value);
        console.log(value);
    }
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users.data);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);
    useEffect(() => {
        if (!loadData) {
            dispatch(fetchUserById(id));
            if (status !== 'idle') {
                setLoadData(true);
            }
        }
    }, [loadData, dispatch, id, status]);

    if (status === "loading") {
        return <div><Loading /></div>;
    }

    if (status === "failed") {
        return <div>Error:</div>;
    }
    if (status === "succeeded") {
        return (
            <Box sx={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <ButtonBackFullW label={'Trở lại'} />
                <HeaderUser nameUser={'test'} />
                <Box sx={{
                    flexGrow: 1,
                    padding: '32px',
                    marginTop: '32px',
                    backgroundColor:
                        color.backgroundColorSub.dark,
                    borderRadius: '14px'
                }} >
                    <Grid container spacing={4}>
                        <Grid item sm={12} md={6}>
                            <InputNormal
                                label={'test'}
                                value={inputValue1}
                                onChange={(e) => handleSetValue(setInputValue1, e.target.value)}
                            />
                        </Grid>

                        <Grid item sm={12} md={6}>
                            <InputNormal
                                label={'test'}
                                value={inputValue2}
                                onChange={(e) => handleSetValue(setInputValue2, e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputNormal label={'test'} />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputNormal label={'test'} />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputNormal label={'test'} />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputNormal label={'test'} />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputNormal label={'test'} />
                        </Grid>
                    </Grid>
                    <Box sx={{
                        flexGrow: 1,
                        marginTop: '32px',
                        backgroundColor:
                            color.backgroundColorSub.dark,
                        borderRadius: '14px'
                    }} >
                        <ButtonNormal label={'Cập nhật'} bg='true' />
                        <ButtonNormal label={'Hủy'} />
                    </Box>
                </Box>


            </Box>
        )
    }
}

export default EditUserPage