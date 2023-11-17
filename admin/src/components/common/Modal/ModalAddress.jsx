import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import color from '../../../config/colorConfig';
import { Grid } from '@mui/material';
import InputEdit from '../TextField/InputEdit';
import { MdMyLocation } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProvinces, fetchDistricts, fetchWards, setStatus } from '../../../redux/slices/addressSlice';
import SelectEditAddress from '../Select/SelectAddress';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: color.backgroundColorSub.dark,
    p: 4,
    borderRadius: '14px',
};

export default function ModalAddress({ openModal, handleClose }) {
    const dispatch = useDispatch();
    const provinces = useSelector((state) => state.address.provinces);
    const districts = useSelector((state) => state.address.districts);
    const wards = useSelector((state) => state.address.wards);
    const status = useSelector((state) => state.address.status);

    // Use openModal directly instead of local state
    const [provincesList, setProvinces] = React.useState([{ id: 1, name: 'Trống' }]);
    const [districtsList, setDistricts] = React.useState([{ id: 1, name: 'Trống' }]);
    const [wardsList, setWards] = React.useState([{ id: 1, name: 'Trống' }]);

    const [selectDistrict, setSelectDistricts] = React.useState('');
    const [selectProvince, setSelectProvince] = React.useState('');
    const [selectWard, setSelectWard] = React.useState('');
    const [loadDataAddress, setLoadDataProvince] = React.useState(false);
    const [loadDistrics, setLoadDistrics] = React.useState(false);
    const [loadWards, setLoadWards] = React.useState(false);

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
    // React.useEffect(() => {
    //     if (status === 'districts already' && districtsList) {
    //         setWards([{ id: '', name: 'Trống' }]);
    //     }
    // }, [districtsList, status]);
    React.useEffect(() => {
        const fetchData = async () => {

            await dispatch(fetchDistricts(selectProvince));
            if (status == 'districts already') {
                setLoadDistrics(true);
                setDistricts(districts);
                dispatch(setStatus('idle'));
            }

        };
        if (selectProvince !== '' && !loadDistrics) {
            fetchData(); // Call the async function immediately
        }

    }, [selectProvince, loadDistrics, dispatch, status]);

    React.useEffect(() => {
        const fetchData = async () => {

            await dispatch(fetchWards(selectDistrict));
            if (status == 'wards already') {
                setLoadWards(true);
                setWards(wards);
                dispatch(setStatus('idle'));
            }

        };
        if (selectDistrict !== '' && !loadWards) {
            fetchData(); // Call the async function immediately
        }
    }, [selectDistrict, loadWards, dispatch, status]);
    // Use openModal and handleClose directly

    const [open, setOpen] = React.useState(openModal);
    React.useEffect(() => {
        setOpen(openModal);
    }, [openModal]);
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
                    <Typography id="keep-mounted-modal-title" variant="h6" sx={{ color: color.textColor.dark }} component="h2">
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
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <SelectEditAddress
                                    id={'district'}
                                    label={'Huyện/ Quận'}
                                    loading={status == 'districts already'}
                                    data={districtsList}
                                    onChange={(e) => {
                                        setSelectDistricts(e.target.value)
                                        setLoadWards(false)
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
                                        // setLoadWards(false)
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <InputEdit
                                    label={'Chi tiết'}
                                    value={''}
                                    type={'text'}
                                    icon={<MdMyLocation />}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
