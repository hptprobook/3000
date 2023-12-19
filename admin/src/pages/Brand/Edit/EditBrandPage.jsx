import React, { useEffect, useState } from "react";
import { Box, FormHelperText, Grid } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import styled from "@emotion/styled";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import { useDispatch, useSelector } from "react-redux";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { createTag, setStatus } from "../../../redux/slices/tagsSlice";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import SuccessAlert from "../../../components/common/Alert/SuccessAlert";
import { createBrand, fetchAllBrands, updateBrandByID } from "../../../redux/slices/brandsSlice";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import ButtonUploadImg from "../../../components/common/Button/ButtonUploadImg";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageFirebase } from "../../../config/firebaseConfig";
import { v4 } from "uuid";
import color from "../../../config/colorConfig";
import BasicAlertl from "../../../components/common/Alert/BasicAlertl";
import { useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading/Loading";

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
export default function EditBrandPage() {
    const { id } = useParams();
    // khai báo các hàm liên quan đến fecth data 
    const dispatch = useDispatch();
    const error = useSelector((state) => state.brands.errorCreate);
    const brands = useSelector((state) => state.brands.data);
    const status = useSelector((state) => state.brands.status);
    const statusUpdate = useSelector((state) => state.brands.statusUpdate);
    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');

    const [parent_id, setParentId] = useState('');

    const [success, setSuccess] = useState(false);
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [successUpload, setSuccessUpload] = useState(false);

    const [errorUpload, setErrorUpload] = useState(false);

    useEffect(() => {
        if (status == 'idle') {
            dispatch(fetchAllBrands());
        }
        if (status == 'brands is ready') {
            const data = brands.filter((brand) => brand.id == id);
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
            setErrorName('Nhãn sản phẩm đã tồn tại');
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

    const handleUploadThumnail = (name) => {
        const thumbnailRef = ref(storageFirebase, `brands/${name}/${v4()}`);
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
                    dispatch(updateBrandByID({ id, data }));
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
    const handleUpdateBrand = () => {
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
            dispatch(updateBrandByID({ id, data }));
        }
    }
    const handleCheckError = (field, value) => {
        switch (field) {
            case 'name': {
                if (value === '') {
                    setErrorName('Thương hiệu không được để trống!');
                    return false;
                }
                else if (value.length > 128) {
                    setErrorName('Thương hiệu không được quá 128 kí tự!');
                    return false;
                }
                else if (brands.find((brand) => brand.id != id && brand.name.toLowerCase() === value.trim().toLowerCase())) {
                    setErrorName('Thương hiệu không được trùng!');
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
    if (status === 'loading') {
        return (
            <Loading />
        )
    }
    if (status === 'brands is ready' && name != '' && parent_id != '') {

        return (
            <Box>
                {successUpload && statusUpdate != 'success' ? <BasicAlertl label={'Tải ảnh lên thành công'} severity={'success'} /> : null}
                {statusUpdate == 'success' ? <BasicAlertl label={'Thay đổi đã lưu'} severity={'success'} /> : null}
                {loadingUpload ? <LinearIndeterminate /> : null}
                <HeaderPage
                    namePage={"Chỉnh sửa"}
                    Breadcrumb={["Nhãn sản phẩm", "Chỉnh sửa"]}
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
                                label={'Thương hiệu'}
                                error={errorName ? true : false}
                                helperText={errorName}
                            />

                        </DivMargin>
                        <DivMargin>
                            <SelectEdit
                                label={'Thương hiệu cha'}
                                data={brands}
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
                            <ButtonNormal bg={'true'} label={'Lưu'} onClick={handleUpdateBrand} />
                        </DivMargin>
                    </InfoBox>
                </Box>
            </Box>
        );
    }
}

