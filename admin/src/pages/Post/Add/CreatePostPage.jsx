import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardContent, Grid, Paper, TextField, ImageList, ImageListItem, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import { uploadFileToServer } from '../../../services/uploadFileToServer'; // Adjust the import path
import { uploadFailure, uploadStart, uploadSuccess } from '../../../redux/slices/uploadSlice';

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

const StyledTextField = styled(TextField)({
    width: '100%',
    marginBottom: '20px',
});

const DetailText = styled('div')({
    padding: '20px',
    fontSize: '20px',
});

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [backupImages, setBackupImages] = useState([]);
    const [backupFileNames, setBackupFileNames] = useState([]);

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

    const handleBackupImageChange = (e) => {
        const files = e.target.files;
        const newBackupImages = [...backupImages];
        const newBackupFileNames = [...backupFileNames];

        for (let i = 0; i < files.length; i++) {
            newBackupImages.push(files[i]);
            newBackupFileNames.push(files[i].name);
        }

        setBackupImages(newBackupImages);
        setBackupFileNames(newBackupFileNames);
    };

    const handleRemoveBackupImage = (index) => {
        const newBackupImages = [...backupImages];
        const newBackupFileNames = [...backupFileNames];
        newBackupImages.splice(index, 1);
        newBackupFileNames.splice(index, 1);
        setBackupImages(newBackupImages);
        setBackupFileNames(newBackupFileNames);
    };

    const handleUpload = async () => {
        if (!coverImage || !title || !description) return;

        try {
            // Perform cover image upload
            dispatch(uploadStart());
            const uploadedCoverImage = await uploadFileToServer(coverImage);
            dispatch(uploadSuccess(uploadedCoverImage));

            // Perform backup image uploads
            for (let i = 0; i < backupImages.length; i++) {
                const uploadedBackupImage = await uploadFileToServer(backupImages[i]);
                // You can dispatch an action here to handle the uploaded backup image if needed.
            }

            // Reset state and show success message
            setCoverImage(null);
            setTitle('');
            setDescription('');
            setBackupImages([]);
            setBackupFileNames([]);

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
            <Paper variant="elevation" sx={{ maxWidth: '100%', marginTop: '50px' }}>
                <CardContent>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={8} md={6}>
                            <DetailText>
                                Chi tiết cơ bản
                            </DetailText>
                        </Grid>
                        <Grid item xs={6} xl={2}>
                            <StyledTextField
                                id="title-input"
                                label="Tiêu đề"
                                type="text"
                                variant="outlined"
                                value={title}
                                onChange={handleTitleChange}
                            />
                            <StyledTextField
                                id="description-input"
                                label="Mô tả ngắn"
                                type="text"
                                variant="outlined"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={8} md={6}>
                            <DetailText>
                                Bìa ảnh bài viết
                            </DetailText>
                        </Grid>
                        <Grid item xs={6} xl={2}>
                            <Button component="label" variant="contained">
                                Upload cover image
                                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleCoverImageChange} />
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={8} md={6}>
                            <DetailText>
                                Hình ảnh phụ (backup)
                            </DetailText>
                        </Grid>
                        <Grid item xs={6} xl={2}>
                            <Button component="label" variant="contained">
                                Upload backup images
                                <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={handleBackupImageChange} />
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
                {coverImage && (
                    <CardContent>
                        <Typography variant="subtitle1">Cover Image:</Typography>
                        <img src={URL.createObjectURL(coverImage)} alt="Cover" style={{ maxWidth: '100%' }} />
                    </CardContent>
                )}
                {backupImages.length > 0 && (
                    <CardContent>
                        <Typography variant="subtitle1">Backup Images:</Typography>
                        <ImageList rowHeight={160} cols={3}>
                            {backupImages.map((image, index) => (
                                <ImageListItem key={index}>
                                    <img src={URL.createObjectURL(image)} alt={`Backup ${index + 1}`} />
                                    <Button variant="contained" onClick={() => handleRemoveBackupImage(index)}>
                                        Remove
                                    </Button>
                                    <Typography variant="body2" color="textSecondary">{backupFileNames[index]}</Typography>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </CardContent>
                )}
                <CardContent>
                    <Button variant="contained" onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </CardContent>
            </Paper>
        </>
    );
}
