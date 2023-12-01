import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import color from '../../../config/colorConfig';
import { FormHelperText, Grid } from '@mui/material';
import InputEdit from '../TextField/InputEdit';
import { MdMyLocation } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProvinces, fetchDistricts, fetchWards, setStatus } from '../../../redux/slices/addressSlice';
import SelectEditAddress from '../Select/SelectAddress';
import ButtonNormal from '../Button/ButtonNormal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: color.backgroundColorSub.dark,
    p: 4,
    borderRadius: '14px',
};

export default function ModalAddress({ openModal, handleClose, onFinalAddress }) {
    const defaultAddress = [{ id: 1, name: 'Trống' }];
    const [detailAddress, setDetailAddress] = React.useState('');
    const [detailErrorAddress, setDetailErrorAddress] = React.useState('');
    const [errorHandle, setErrorHandle] = React.useState('');

    const dispatch = useDispatch();
    const provinces = useSelector((state) => state.address.provinces);
    const districts = useSelector((state) => state.address.districts);
    const wards = useSelector((state) => state.address.wards);
    const status = useSelector((state) => state.address.status);
    // Use openModal directly instead of local state
    const [provincesList, setProvinces] = React.useState(defaultAddress);
    const [districtsList, setDistricts] = React.useState(defaultAddress);
    const [wardsList, setWards] = React.useState(defaultAddress);

    const [selectDistrict, setSelectDistricts] = React.useState('');
    const [selectProvince, setSelectProvince] = React.useState('');
    const [selectWard, setSelectWard] = React.useState('');
    const [loadDataAddress, setLoadDataProvince] = React.useState(false);
    const [loadDistrics, setLoadDistrics] = React.useState(false);
    const [loadWards, setLoadWards] = React.useState(false);

    // fetch dữ liệu về địa chỉ

    React.useEffect(() => {
        if (!loadDataAddress) {
            dispatch(fetchAllProvinces());
            setLoadDataProvince(true);
        }
    }, [dispatch, loadDataAddress]);
    React.useEffect(() => {
        if (status === 'provinces already' && provinces !== undefined) {
            setProvinces(provinces);
            dispatch(setStatus('idle'));
        }
    }, [provinces, status]);

    React.useEffect(() => {
        if (selectProvince) {
            dispatch(fetchDistricts(selectProvince));
        }
    }, [selectProvince]);

    React.useEffect(() => {
        if (status === 'districts already' && districts !== undefined) {
            setSelectDistricts('');
            setDistricts(districts);
            setLoadDistrics(true);
            dispatch(setStatus('idle'));
        }
    }, [districts, status]);
    React.useEffect(() => {
        if (selectDistrict && selectDistrict != '') {
            dispatch(fetchWards(selectDistrict));
        }
    }, [selectDistrict]);

    React.useEffect(() => {
        if (status === 'wards already' && wards !== undefined) {
            setSelectWard('');
            setWards(wards);
            setLoadWards(true);
            dispatch(setStatus('idle'));
        }
    }, [wards, status]);

    // xử lý đóng mở modal

    const [open, setOpen] = React.useState(openModal);
    React.useEffect(() => {
        setOpen(openModal);
    }, [openModal]);

    // xử lí địa chỉ chi tiết 
    const handleCheckError = (value) => {
        if (value == '') {
            setDetailErrorAddress('Địa chỉ chi tiết không được để trống!')
        }
        if (value.length < 4) {
            setDetailErrorAddress('Địa chỉ chi tiết không được dưới 4 kí tự!')
        }
        else {
            setDetailErrorAddress('')
        }
    };
    const handleAddress = () => {
        if (selectWard != '' && detailAddress != '') {
            setErrorHandle('');
            const dataReturn = {
                ward_id: selectWard,
                street: detailAddress
            };
            onFinalAddress(dataReturn);
            setOpen(false);
        }
        else {
            setErrorHandle('Vui lòng nhập đầy đủ thông tin!');
        }
    }
    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" sx={{ color: color.textColor.dark, marginBottom: '32px' }} component="h2">
                        Chỉnh sửa địa chỉ
                    </Typography>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <SelectEditAddress
                                    label={'Tỉnh/ Thành Phố'}
                                    loading={loadDataAddress}
                                    id={'provinces'}
                                    data={provincesList}
                                    onChange={(e) => {
                                        setSelectProvince(e.target.value)
                                        setLoadDistrics(false)
                                        setSelectDistricts('')
                                        setSelectWard('')
                                        setWards(defaultAddress)
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <SelectEditAddress
                                    id={'district'}
                                    label={'Huyện/ Quận'}
                                    loading={loadDistrics}
                                    data={districtsList}
                                    onChange={(e) => {
                                        setSelectDistricts(e.target.value)
                                        setLoadWards(false)
                                        setWards(defaultAddress)
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <SelectEditAddress
                                    label={'Xã/ Phường'}
                                    id={'wards'}
                                    value={selectWard}
                                    loading={loadWards}
                                    data={wardsList}
                                    onChange={(e) => {
                                        setSelectWard(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <InputEdit
                                    disabled={selectWard == '' ? true : false}
                                    label={'Chi tiết'}
                                    icon={<MdMyLocation />}
                                    error={detailErrorAddress != '' ? true : false}
                                    helperText={detailErrorAddress}
                                    onBlur={(e) => {
                                        setDetailAddress(e.target.value)
                                        handleCheckError(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <ButtonNormal
                                    label='Lưu địa chỉ'
                                    bg='true'
                                    onClick={(e) => handleAddress()}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <FormHelperText
                                    sx={{
                                        color: color.textColor.error,
                                    }}
                                >{errorHandle}</FormHelperText>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
