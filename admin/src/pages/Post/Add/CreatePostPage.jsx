import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CardContent, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import { uploadFileToServer } from '../../../services/uploadFileToServer'; // Adjust the import path
import { uploadFailure, uploadStart, uploadSuccess } from '../../../redux/slices/uploadSlice';
import color from '../../../config/colorConfig';
import InputEdit from '../../../components/common/TextField/InputEdit';
import ButtonNormal from '~/components/common/Button/ButtonNormal';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.upload.uploading);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        setCoverImage(file);
    };
    console.log(coverImage)
    const handleUpload = async () => {
        if (!coverImage || !title || !description) return;

        try {
            // Perform cover image upload
            dispatch(uploadStart());
            const uploadedCoverImage = await uploadFileToServer(coverImage);
            dispatch(uploadSuccess(uploadedCoverImage));

            // Reset state and show success message
            setCoverImage(null);
            setTitle('');
            setDescription('');

            // Display a success message or redirect to a success page.
        } catch (error) {
            dispatch(uploadFailure(error.message));
        }
    };

    return (
        <>
            <HeaderPage
                namePage={"Tạo bài viết"}
                Breadcrumb={["Bài viết", "Tạo bài viết"]}
                ButtonLink="/post/create"
            />
            <Paper variant="elevation" sx={{ maxWidth: '100%', marginTop: '50px', background: color.backgroundColorSub.dark, }}>
                <CardContent>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={8} md={6}>
                            <Typography sx={{
                                padding: '20px',
                                fontSize: '20px',
                                color: color.textColor.dark
                            }}>
                                Chi tiết cơ bản
                            </Typography>
                        </Grid>
                        <Grid item xs={6} xl={2}>
                            <Grid>
                                <InputEdit
                                    id="title-input"
                                    label="Tiêu đề"
                                    type="text"
                                    variant="outlined"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </Grid>
                            <Grid>
                                <InputEdit
                                    id="description-input"
                                    label="Mô tả ngắn"
                                    type="text"
                                    variant="outlined"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={8} md={6}>
                            <Typography
                                sx={{
                                    padding: '20px',
                                    fontSize: '20px',
                                    color: color.textColor.dark
                                }}
                            >
                                Bìa ảnh bài viết
                            </Typography>
                        </Grid>
                        <Grid item xs={6} xl={2}>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    marginTop: '32px',
                                    backgroundColor: color.backgroundColorSub.dark,
                                    borderRadius: '14px'
                                }} >
                                <ButtonNormal
                                    variant="contained" 
                                    label={'Đăng bìa ảnh'}
                                    bg='true'   
                                    onClick={handleButtonClick}>
                                    Đăng bìa ảnh
                                </ButtonNormal>
                                <VisuallyHiddenInput
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverImageChange}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
                {coverImage && (
                    <CardContent sx={{
                    width: '900px',
                    height: '400px',
                    }}>
                        <Typography variant="subtitle1">Ảnh bìa:</Typography>
                        <img 
                        src={URL.createObjectURL(coverImage)} 
                        alt="Cover" 
                        style={{ maxWidth: '100%' }}
                         />
                    </CardContent>
                )}
                
            </Paper >
        </>
    );
}
