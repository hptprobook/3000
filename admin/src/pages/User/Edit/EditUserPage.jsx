import { Box, Grid, Typography } from '@mui/material';
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
    const [loadData, setLoadData] = useState(false);

    function handleSetValue(funcSet, value) {
        funcSet(value);
        console.log(value);
    }
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.selectedUser);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);
    const [name, setName] = useState('');

    useEffect(() => {
        if (!loadData) {
            dispatch(fetchUserById(id));
            if (status !== 'idle') {
                if (status === 'succeeded') {
                    setName(user.name);
                }
                setLoadData(true);
            }

        }
    }, [loadData, dispatch, id, status]);
    function handleEditUser() {
        console.log(name);
    }
    if (status === "loading") {
        return <div><Loading /></div>;
    }

    if (status === "failed") {
        return <div>Error:</div>;
    }

    if (status === "succeeded") {

        console.log(user)

        return (
            <Box sx={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <ButtonBackFullW label={'Trở lại'} />
                <HeaderUser nameUser={user.name} role={user.role} />
                <Box sx={{
                    flexGrow: 1,
                    padding: '32px',
                    marginTop: '32px',
                    backgroundColor:
                        color.backgroundColorSub.dark,
                    borderRadius: '14px'
                }} >
                    <Typography sx={{ color: color.textColor.dark, fontSize: '16px' }}>
                        Chỉnh sửa
                    </Typography>
                    <Grid container spacing={4} sx={{ paddingTop: '32px' }}>
                        <Grid item sm={12} md={6}>
                            <InputNormal
                                label={'Họ và tên'}
                                value={user.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        {/* <Grid item sm={12} md={6}>
                            <InputNormal
                                label={'Email'}
                                value={user.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid> */}
                        {/* <Grid item sm={12} md={6}>
                            <InputNormal
                                label={'Số điện thoại'}
                                value={user.phone__number}
                                onChange={(e) => setPhone(e.target.value)}
                                type={'phone'}
                            />
                        </Grid> */}
                        {/* <Grid item sm={12} md={6}>
                            <InputNormal
                                label={'Giới tính'}
                                value={user.phone__number}
                                onChange={(e) => setPhone(e.target.value)}
                                type={'phone'}
                            />
                        </Grid> */}
                        <Grid item sm={12} md={6}>
                            <InputNormal
                                label={'Ngày sinh'}
                                value={user.birth_date || '0001-01-01'}
                                onChange={(e) => setPhone(e.target.value)}
                                type={'date'}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{
                        flexGrow: 1,
                        marginTop: '32px',
                        backgroundColor:
                            color.backgroundColorSub.dark,
                        borderRadius: '14px'
                    }} >
                        <ButtonNormal label={'Cập nhật'} bg='true' onClick={handleEditUser} />
                        <ButtonNormal label={'Hủy'} />
                    </Box>
                </Box>


            </Box>
        )
    }
}

export default EditUserPage