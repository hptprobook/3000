import React, { useState } from "react";
import { Box, Grid, Typography, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import TinyEditor from "../../../components/common/TinyEditor/TinyEditor";
import TinyEditorMini from "../../../components/common/TinyEditor/TinyEditorMini";
import { storageFirebase } from "../../../config/firebaseConfig";
import styled from "@emotion/styled";
import color from "../../../config/colorConfig";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import SelectCategoryCreate from "../../../components/common/Select/SelectCategoryCreate";
import { v4 } from 'uuid';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageDropZone from "../../../components/common/DropZoneUpload/DropZoneImage";

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
export default function CreateProductPage() {
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [creatError, setCreateError] = useState(true);

    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [errorQuantity, setErrorQuantity] = useState('');
    const [description, setDescription] = useState('');

    // hande check error input
    const handleCheckError = (field, value) => {
        switch (field) {
            case 'name': {
                if (value === '') {
                    setErrorName('Tên sản phẩm không được để trống!');
                }
                else if (value.length > 254) {
                    setErrorName('Tên sản phẩm không được quá 255 kí tự!');
                }
                else {
                    setErrorName('');
                }
            }
            // Add more cases for other fields if needed

            default:
                return false; // Default to no error
        }
    };


    console.log(name)
    // upload ảnh
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
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setThumbnailUrl(downloadURL);
                });
            }
        );
    };

    return (
        <Box>
            <HeaderPage
                namePage={"Tạo mới"}
                Breadcrumb={["Sản phẩm", "Tạo"]}
            />
            <Box sx={{
                marginTop: '32px'
            }}>
                <InfoBox title="Thông tin cơ bản">
                    <DivMargin>
                        <InputEdit
                            // onBlur={(e) => setName(e.target.value)}
                            onBlur={(event) => {
                                setName(event.target.value);
                                handleCheckError('name', event.target.value)
                            }}
                            label={'Tên sản phẩm'}
                            error={errorName ? true : false}
                            helperText={errorName}
                        />

                    </DivMargin>
                    <DivMargin>
                        <InputEdit
                            label={'Số lượng'}
                            type='number'
                        />
                    </DivMargin>
                    <DivMargin>
                        <InputEdit
                            label={'Giá tiền'}
                            type='number'
                        />
                    </DivMargin>
                    <DivMargin>
                        <InputEdit
                            label={'Discount'}
                            type='number'
                        />
                    </DivMargin>
                </InfoBox>
                <InfoBox title="Phân loại">
                    <DivMargin>
                        <SelectEdit
                            label={'Phân loại'}
                            data={[
                                { id: 'male', name: 'Nam' },
                                { id: 'female', name: 'Nữ' },
                                { id: 'other', name: 'Khác' },
                            ]}
                            value={'male'}
                        />
                    </DivMargin>
                    <DivMargin>
                        <SelectEdit
                            label={'Nhãn hàng'}
                            data={[
                                { id: 'male', name: 'Nam' },
                                { id: 'female', name: 'Nữ' },
                                { id: 'other', name: 'Khác' },
                            ]}
                            value={'male'}
                        />
                    </DivMargin>
                    <DivMargin>
                        <SelectCategoryCreate />
                    </DivMargin>
                </InfoBox>
                <InfoBox title="Hình ảnh">
                    <DivMargin>
                        {/* {thumbnail ? <img src={thumbnailUrl} alt="Thumbnail" /> : <p>No thumbnail available</p>}
                        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} /> */}
                        <ImageDropZone />
                    </DivMargin>
                </InfoBox>
                <InfoBox title="Mô tả">
                    <DivMargin
                        style={{
                            marginTop: '12px'
                        }}
                    >
                        <Typography
                            variant="p"
                            component="p"
                            sx={{
                                marginBottom: '12px',
                                color: color.textGray
                            }}
                        >
                            Mô tả ngắn
                        </Typography>
                        <TinyEditorMini />
                    </DivMargin>
                    <div
                        style={{
                            marginTop: '12px'
                        }}
                    >
                        <Typography
                            variant="p"
                            component="p"
                            sx={{
                                marginBottom: '12px',
                                color: color.textGray
                            }}
                        >
                            Chi tiết
                        </Typography>
                        <TinyEditor />
                    </div>
                </InfoBox>
            </Box>
        </Box>
    );
}
