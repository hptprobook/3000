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
import { setStatus, updateUserByID } from '../../../redux/slices/userSlice';

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
const EditOrderPage = () => {
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
    const statusUpdate = useSelector((state) => state.users.status);

    const error = useSelector((state) => state.users.error);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [gender, setGender] = useState('');
    const [genderError, setGenderError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [addressRender, setAddressRender] = useState('');
    const [addressRenderError, setAddressRenderError] = useState('');

    const [phone_number, setPhone_number] = useState('');
    const [phone_numberError, setPhone_numberError] = useState('');

    const [birth_date, setBirth_date] = useState('');
    const [birth_dateError, setBirth_dateError] = useState('');

    useEffect(() => {
        if (!loadData) {
            dispatch(fetchUserById(id));
            if (status == 'user already') {
                setLoadData(true);
                setName(user.name);
                setGender(user.gender);
                setEmail(user.email);
                setPhone_number(user.phone_number);
                setBirth_date(user.birth_date);
                if (user.addresses[0] != null) {
                    setAddressRender(user.addresses[0].address_info + ', ' + user.addresses[0].ward.path_with_type);
                }
                dispatch(setStatus('idle'));
            }
        }
    }, [loadData, dispatch, id, status]);
    useEffect(() => {
        if (statusUpdate === '') {
            alert('Uploading successful');
            setStatus('idle');
        }
    }, [statusUpdate]);
    const handleFinalAddress = (addressData) => {
        setFinalAddress(addressData);
    };

    const handleEditError = (feild, value) => {
        switch (feild) {
            case 'name': {
                if (value == '') {
                    setNameError('Họ tên không được để trống!');
                    break;
                }
                if (value.length > 254) {
                    setNameError('Họ tên không được quá 255 kí tự!');
                    break;
                }
                setNameError('')
            }
                break;
            case 'birth_date': {
                if (value == '') {
                    setBirth_dateError('Ngày sinh không được để trống!');
                    break;
                }
                else {
                    setBirth_dateError('')

                }
            }
                break;
            case 'phone': {
                if (value == '') {
                    setPhone_numberError('Số điện thoại không được để trống!');
                    break;
                }
                else if (isNaN(value)) {
                    setPhone_numberError('Số điện thoại không đúng định dạng!')
                }
                else if (value.length != 10) {
                    setPhone_numberError('Số điện thoại phải gồm 10 chữ số!')
                }
                else {
                    setPhone_numberError('');
                }

            }
                break;
            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value == '') {
                    setEmailError('Email không được để trống!');
                    break;
                }
                if (!emailRegex.test(value)) {
                    setEmailError('Email không đúng định dạng!')
                }
                else if (value.length > 254) {
                    setEmailError('Email không được lớn hơn 255 kí tự!')
                }
                else {
                    setEmailError('');
                }

            }
                break;
        }
    }
    function formatDate(inputDate) {
        const parts = inputDate.split('-');
        if (parts.length === 3) {
            // Assuming inputDate is in the format 'y-m-d'
            const [year, month, day] = parts;
            const formattedDate = `${year}/${month}/${day}`;
            return formattedDate;
        } else {
            // Handle invalid input
            console.error('Invalid date format:', inputDate);
            return inputDate;
        }
    }

    function handleEditUser() {
        if (finalAddress == null) {
            if (user.addresses[0] == null) {
                setAddressRenderError('Địa chỉ không được để trống');
            }
            else {
                setAddressRenderError('');
                const dataUpdate = {
                    name: name,
                    email: email,
                    role: "USER",
                    phone_number: phone_number,
                    ward_id: user.addresses[0].ward.id,
                    gender: gender,
                    birth_date: formatDate(birth_date),
                    street: user.addresses[0].address_info,
                }
                console.log(dataUpdate)
                dispatch(updateUserByID({ userId: id, data: dataUpdate }));
            }
        }
        else {
            setAddressRenderError('');
            const dataUpdate = {
                name: name,
                email: email,
                role: "USER",
                phone_number: phone_number,
                ward_id: finalAddress.ward_id,
                gender: gender,
                birth_date: formatDate(birth_date),
                street: finalAddress.street,
            }
            console.log(dataUpdate)
            dispatch(updateUserByID({ userId: id, data: dataUpdate }));
        }
    }
    if (status === "loading") {
        return <div><Loading /></div>;
    }

    if (status === "failed") {
        return <div>Error:</div>;
    }

    if (loadData) {
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
                                value={name}
                                icon={<BiUser />}
                                onBlur={(e) => {
                                    setName(e.target.value)
                                    handleEditError('name', e.target.value)
                                }}
                                error={nameError != '' ? true : false}
                                helperText={nameError}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <InputEdit
                                label={'Ngày sinh'}
                                value={user.birth_date}
                                type={'date'}
                                icon={<MdDateRange />}
                                onBlur={(e) => {
                                    setBirth_date(e.target.value)
                                    handleEditError('birth_date', e.target.value)
                                }}
                                error={birth_dateError != '' ? true : false}
                                helperText={birth_dateError}
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
                                value={gender}
                                onChange={(e) => {
                                    setGender(e.target.value)
                                }}
                                error={genderError != '' ? true : false}
                                helperText={genderError}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputEdit
                                label={'Email'}
                                value={email}
                                type={'email'}
                                icon={<MdEmail />}
                                onBlur={(e) => {
                                    setEmail(e.target.value)
                                    handleEditError('email', e.target.value)
                                }}
                                error={emailError != '' ? true : false}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <InputEdit
                                label={'Số điện thoại'}
                                value={phone_number}
                                type={'phone'}
                                icon={<MdPhone />}
                                onBlur={(e) => {
                                    setPhone_number(e.target.value)
                                    handleEditError('phone', e.target.value)
                                }}
                                error={phone_numberError != '' ? true : false}
                                helperText={phone_numberError}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <div style={{ position: 'relative' }}>
                                <InputEdit
                                    label={'Địa chỉ'}
                                    value={addressRender}
                                    icon={<MdLocationOn />}
                                    error={addressRenderError != '' ? true : false}
                                    helperText={addressRenderError}
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

export default EditOrderPage;