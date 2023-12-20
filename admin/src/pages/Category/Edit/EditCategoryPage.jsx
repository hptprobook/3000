import { Box, FormHelperText, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonBackFullW from '~/components/common/Button/ButtonBackFullW';
import styled from '@emotion/styled';
import color from '~/config/colorConfig';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/common/Loading/Loading';
import InputEdit from '~/components/common/TextField/InputEdit';
import ButtonNormal from '~/components/common/Button/ButtonNormal';
import { fetchCategoryById } from "~/redux/slices/categoriesSlice";
import ModalAddress from '../../../components/common/Modal/ModalAddress';
import HeaderPage from '../../../components/common/HeaderPage/HeaderPage';
import InfoBox from '../../../components/common/Box/InforBox';
import SelectEdit from '../../../components/common/Select/SelectEdit';
import ButtonUploadImg from '../../../components/common/Button/ButtonUploadImg';
import { fetchCategoriesAsync, updateCategoryByID } from '../../../redux/slices/categoriesSlice';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storageFirebase } from '../../../config/firebaseConfig';
import { v4 } from 'uuid';
import BasicAlertl from '../../../components/common/Alert/BasicAlertl';
import LinearIndeterminate from '../../../components/common/Loading/LoadingLine';

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));

const EditCategoryPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [parent_id, setParentId] = useState('');
    const error = useSelector((state) => state.categories.errorCreate);
    
    const [errorName, setErrorName] = useState('');

    
    const categories = useSelector((state) => state.categories.data);
    const status = useSelector((state) => state.categories.status);
    const statusUpdate = useSelector((state) => state.categories.statusUpdate);
    const [success, setSuccess] = useState(false);
//Xuat
useEffect(() => {
    if (status == 'idle') {
        dispatch(fetchCategoriesAsync());
    }
    if (status == 'succeeded') {
        const data = categories.filter((category) => category.id == id);
        console.log(data);
        setName(data[0].name);
        setParentId(data[0].parent_id);
        setThumbnailPreview(data[0].icon_url)
    }
}, [status, id])
useEffect(() => {
    if (statusUpdate == 'loading') {
        setLoadingUpload(true);
    }
    if (statusUpdate == 'success') {
        setLoadingUpload(false);
    }

}, [statusUpdate])
useEffect(() => {
    if (error === 'The name has already been taken.' && status === 'failed') {
        setErrorName('Tên phân loại đã tồn tại');
        setSuccess(false);
    }

}, [error, status])
useEffect(() => {
    if (statusUpdate === 'success') {
        setSuccess(true);
    }
    if (statusUpdate === 'loading') {
        setSuccess(false);
    }
}, [statusUpdate]);
//UPLOAD 
const [thumbnail, setThumbnail] = useState('');
const [thumbnailPreview, setThumbnailPreview] = useState('');
const [loadingUpload, setLoadingUpload] = useState(false);
const [successUpload, setSuccessUpload] = useState(false);

const [errorUpload, setErrorUpload] = useState(false);

const handleUploadThumnail = (name) => {
    const thumbnailRef = ref(storageFirebase, `categories/${name}/${v4()}`);
    const uploadTask = uploadBytesResumable(thumbnailRef, thumbnail);
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    setLoadingUpload(true);
                    setSuccessUpload(false);
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setLoadingUpload(false);
                const data = {
                    name: name,
                    parent_id: parent_id ? parent_id : null,
                    icon_url: downloadURL
                }
                dispatch(updateCategoryByID({ id, data }));
                setSuccessUpload(true);
            });
        }
    );
};
const handleUploadFile = (file) => {
    setThumbnail(file);
    const imageUrl = URL.createObjectURL(file);
    setThumbnailPreview(imageUrl);
}

const handleUpdateCategory = () => {
    if (handleCheckError('name', name) && thumbnail !== '') {
        handleUploadThumnail(name);
        setErrorUpload(false);
    }
    else {
        setLoadingUpload(false);
        const data = {
            name: name,
            parent_id: parent_id ? parent_id : null,
            icon_url: thumbnailPreview
        }
        dispatch(updateCategoryByID({ id, data }));
    }
}

    
    const handleCloseModal = () => {
        // Đóng modal nếu cần
    };

    const handleCheckError = (field, value) => {
        switch (field) {
            case 'name': {
                if (value === '') {
                    setErrorName('Thể loại không được để trống!');
                    return false;
                }
                else if (value.length > 128) {
                    setErrorName('Thể loại không được quá 128 kí tự!');
                    return false;
                }
                else if (categories.find((category) => category.id != id && category.name.toLowerCase() === value.trim().toLowerCase())) {
                    setErrorName('Thể loại không được trùng!');
                    return false;
                }
                else {
                    setErrorName('');
                    return true;
                }
            }
                break;

            default:
                return false; // Default to no error
        }
    };
    if (status === 'succeeded' && name != '' ) {

        return (
            <Box>
                {successUpload && statusUpdate != 'success' ? <BasicAlertl label={'Tải ảnh lên thành công'} severity={'success'} /> : null}
                {statusUpdate == 'success' ? <BasicAlertl label={'Thay đổi đã lưu'} severity={'success'} /> : null}
                {loadingUpload ? <LinearIndeterminate /> : null}
                <HeaderPage
                    namePage={"Chỉnh sửa"}
                    Breadcrumb={["Phân loại", "Chỉnh sửa"]}
                />
                <Box sx={{
                    marginTop: '32px'
                }}>
                    <InfoBox title="Thông tin">
                        <DivMargin>
                            <InputEdit
                                id={'name'}
                                onBlur={(event) => {
                                    setName(event.target.value);
                                    handleCheckError('name', event.target.value)
                                }}
                                value={name}
                                label={'Phân loại'}
                                error={errorName ? true : false}
                                helperText={errorName}
                            />

                        </DivMargin>
                        <DivMargin>
                            <SelectEdit
                                label={'Phân loại cha'}
                                data={categories}
                                value={parent_id}
                                onChange={(e) => {
                                    setParentId(e.target.value)
                                }}
                                nullData={true}
                            />
                        </DivMargin>
                        <DivMargin>
                            <DivMargin>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <ButtonUploadImg handleOnChange={handleUploadFile} />
                                    </Grid>
                                    <Grid item xs={9}>
                                        {thumbnailPreview ? <img src={thumbnailPreview} alt="Selected" style={{ maxWidth: '100%' }} /> : null}
                                        <FormHelperText sx={{
                                            color: color.textColor.error
                                        }}>{errorUpload ? errorUpload : null}</FormHelperText>
                                    </Grid>
                                </Grid>
                            </DivMargin>

                        </DivMargin>
                        <DivMargin>
                            <ButtonNormal bg={'true'} label={'Lưu'} onClick={handleUpdateCategory} />
                        </DivMargin>
                    </InfoBox>
                </Box>
            </Box>
        );
    }
}

export default EditCategoryPage;
