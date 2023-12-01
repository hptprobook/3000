import { Box, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ButtonBackFullW from '~/components/common/Button/ButtonBackFullW';
import HeaderUser from '~/components/common/HeaderPage/HeaderUser';
import styled from '@emotion/styled';
import color from '~/config/colorConfig';
import { fetchUserById } from "~/redux/slices/userSlice";
import ButtonNormal from '~/components/common/Button/ButtonNormal';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/common/Loading/Loading';
import InputEdit from '~/components/common/TextField/InputEdit';
import { BiUser } from 'react-icons/bi';
import { MdDateRange, MdEdit, MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import SelectEdit from '~/components/common/Select/SelectEdit';
import ModalAddress from '../../../components/common/Modal/ModalAddress';

const ButtonEdit = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: color.backgroundColorSub2.dark,
    '& svg': {
        color: color.textColor.dark
    }
}))
const EditUserPage = () => {
    // lấy id từ url
    const { id } = useParams();

    const [loadData, setLoadData] = useState(false);
    const [openModal, setIsModalOpen] = React.useState(false);
    const [finalAddress, setFinalAddress] = useState(null);
    function handleSetValue(funcSet, value) {
        funcSet(value);
        console.log(value);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.selectedUser);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [gender, setGender] = useState('');
    const [genderError, setGenderError] = useState('');

    useEffect(() => {
        if (!loadData) {
            dispatch(fetchUserById(id));
            if (status !== 'idle') {
                setLoadData(true);
                if (loadData) {
                    setName(user.name);
                    setGender(user.gender);
                }
            }

        }
    }, [loadData, dispatch, id, status]);

    const handleFinalAddress = (addressData) => {
        setFinalAddress(addressData);
        console.log(finalAddress);
    };

    const handleEditError = (feild, value) => {
        switch (feild) {
            case 'name': {
                if (value == '') {
                    setNameError('Họ tên không được để trống!');
                    break;
                }
            }
                break;
        }
    }
    function handleEditUser() {
        console.log(user);
    }
    if (status === "loading") {
        return <div><Loading /></div>;
    }

    if (status === "failed") {
        return <div>Error:</div>;
    }

    if (loadData) {
        console.log(user)
        return (
            <Box sx={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <ModalAddress openModal={openModal} handleClose={handleCloseModal} onFinalAddress={handleFinalAddress} />
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
                            <InputEdit
                                label={'Họ và tên'}
                                value={user.name}
                                icon={<BiUser />}
                                onBlur={(e) => {
                                    setName(e.target.value)
                                    handleEditError('name', e.target.value)
                                }}
                                error={nameError != '' ? true : false}

                            />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <InputEdit
                                label={'Ngày sinh'}
                                // value={user.name}
                                type={'date'}
                                icon={<MdDateRange />}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} lg={2}>
                            <SelectEdit
                                label={'Giới tính'}
                                data={[
                                    { id: 'male', name: 'Nam' },
                                    { id: 'female', name: 'Nữ' },
                                    { id: 'other', name: 'Khác' },
                                ]}
                                value={user.gender}
                            // onChange={ }
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputEdit
                                label={'Email'}
                                value={user.email}
                                type={'email'}
                                icon={<MdEmail />}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputEdit
                                label={'Số điện thoại'}
                                value={user.phone_number}
                                type={'phone'}
                                icon={<MdPhone />}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ position: 'relative' }}>
                                <InputEdit
                                    label={'Địa chỉ'}
                                    value={user}
                                    icon={<MdLocationOn />}
                                />
                                <ButtonEdit aria-label="Chỉnh sửa" size="lagre" onClick={() => setIsModalOpen(true)}>
                                    <MdEdit />
                                </ButtonEdit>

                            </div>
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