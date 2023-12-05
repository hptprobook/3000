import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import styled from "@emotion/styled";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import { useDispatch, useSelector } from "react-redux";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { createTag, setStatus } from "../../../redux/slices/tagsSlice";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import SuccessAlert from "../../../components/common/Alert/SuccessAlert";
import { fetchAllBrands } from "../../../redux/slices/brandsSlice";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import ButtonUploadImg from "../../../components/common/Button/ButtonUploadImg";

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
export default function CreateBrandPage() {

    // khai báo các hàm liên quan đến fecth data 
    const dispatch = useDispatch();

    const error = useSelector((state) => state.brands.errorCreate);
    const brands = useSelector((state) => state.brands.data);
    const status = useSelector((state) => state.brands.status);

    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');

    const [parent_id, setParentId] = useState('');

    const [description, setDescription] = useState('');
    const [errorDescription, setErrorDescription] = useState('');

    const [success, setSeccess] = useState(false);
    const [thumbnail, setThumbnail] = useState('');
    useEffect(() => {
        if (status == 'idle') {
            dispatch(fetchAllBrands());
        }

    }, [status])

    useEffect(() => {
        if (error === 'The name has already been taken.' && status === 'failed') {
            setErrorName('Nhãn sản phẩm đã tồn tại');
            setSeccess(false);
        }

    }, [error, status])
    useEffect(() => {
        if (status === 'created successfully') {
            setSeccess(true);
        }
        if (status === 'loading') {
            setSeccess(false);
        }
    }, [status])
    const handleCreateTags = () => {
        if (name !== '' && description !== '') {
            const data = {
                name: name,
                description: description
            }
            // console.log(data);
            dispatch(createTag({ data: data }));
        }
        else {
            if (name === '') {
                setErrorName('Nhãn sản phẩm không được để trống!');
            }
            else {
                setErrorDescription('Mô tả nhãn không được để trống!');
            }
        }
    }
    const handleCheckError = (field, value) => {
        switch (field) {
            case 'name': {
                if (value === '') {
                    setErrorName('Thương hiệu không được để trống!');
                }
                else if (value.length > 128) {
                    setErrorName('Thương hiệu không được quá 128 kí tự!');
                }
                else {
                    setErrorName('');
                }
            }
                break;
            case 'description': {
                if (value === '') {
                    setErrorDescription('Mô tả nhãn không được để trống!');
                }
                else if (value.length > 128) {
                    setErrorDescription('Mô tả nhãn không được quá 128 kí tự!');
                }
                else {
                    setErrorDescription('');
                }
            }
                break;

            default:
                return false; // Default to no error
        }
    };
    const handleUploadThumnail = () => {
        const thumbnailRef = ref(storageFirebase, `product_image/${v4()}`);
        const uploadTask = uploadBytesResumable(thumbnailRef, thumbnail);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setThumbnailUrl(downloadURL);
                });
            }
        );
    };

    if (status === 'brands is ready') {
        return (
            <Box>
                {success ? <SuccessAlert label={'Tạo nhãn sản phẩm thành công'} /> : null}
                {status === 'loading' ? <LinearIndeterminate /> : null}
                <HeaderPage
                    namePage={"Tạo mới"}
                    Breadcrumb={["Nhãn sản phẩm", "Tạo"]}
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
                                label={'Thương hiệu'}
                                error={errorName ? true : false}
                                helperText={errorName}
                            />

                        </DivMargin>
                        <DivMargin>
                            <SelectEdit
                                label={'Thương hiệu cha'}
                                data={brands}
                                value={''}
                                onChange={(e) => {
                                    setParentId(e.target.value)
                                }}
                            />
                        </DivMargin>
                        <DivMargin>
                            <DivMargin>
                                <ButtonUploadImg />
                            </DivMargin>

                        </DivMargin>
                        <DivMargin>
                            <ButtonNormal bg={'true'} label={'Thêm'} onClick={handleCreateTags} />

                        </DivMargin>
                    </InfoBox>
                </Box>
            </Box>
        );
    }
}

