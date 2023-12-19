import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CardContent, Grid, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import { uploadFileToServer } from '../../../services/uploadFileToServer'; // Adjust the import path
import { uploadFailure, uploadStart, uploadSuccess } from '../../../redux/slices/uploadSlice';
import InputEdit from '../../../components/common/TextField/InputEdit';
import InfoBox from '../../../components/common/Box/InforBox';
import { fetchAllPosts } from '../../../redux/slices/postSlice';
import ButtonNormal from '../../../components/common/Button/ButtonNormal';
import color from '../../../config/colorConfig';
import TinyEditor from '../../../components/common/TinyEditor/TinyEditor';

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));

export default function CreatePostPage() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.data);
    const error = useSelector((state) => state.posts.error);
    const status = useSelector((state) => state.posts.status);
    const statusCreate = useSelector((state) => state.posts.statusCreate);
    // Access posts from Redux store
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState(null);

    const [errorTitle, setErrorTitle] = useState('');
    const [success, setSeccess] = useState(false);
    //editor
    const [detail, setDetail] = useState('');
    useEffect(() => {
        if (status == 'idle') {
            dispatch(fetchAllPosts());
        }

    }, [status])

    useEffect(() => {
        if (status === 'created post successfully') {
            setSeccess(true);
        }
        if (status === 'loading') {
            setSeccess(false);
        }
    }, [status]);
    //ADD 
    const handleCreatePost = () => {
        console.log(title);

    }
    //check error
    const handleCheckError = (field, value) => {
        switch (field) {
            case 'title': {
                if (value === '') {
                    setErrorTitle('Tiêu đề không được để trống!');
                    return false;
                }
                else if (value.length > 128) {
                    setErrorTitle('Tiêu đề không được quá 128 kí tự!');
                    return false;
                }
                else {
                    setErrorTitle('');
                    return true;
                }
            }
                break;

            default:
                return false; // Default to no error
        }
    };
    //check editor
    const handleDetail = (value) => {
        setDetail(value);
    }
    return (
        <>
            <HeaderPage
                namePage={"Tạo bài viết"}
                Breadcrumb={["Bài viết", "Tạo bài viết"]}
            />
            <Box sx={{
                marginTop: '32px'
            }}></Box>
            <InfoBox title="Thông tin">
                <DivMargin>
                    <InputEdit
                        id={'title'}
                        onBlur={(event) => {
                            setTitle(event.target.value);
                            handleCheckError('title', event.target.value)
                        }}
                        label={'Tiêu đề'}
                        error={errorTitle ? true : false}
                        helperText={errorTitle}
                    />
                </DivMargin>
                <DivMargin>
                    <Typography
                        variant="p"
                        component="p"
                        sx={{
                            marginBottom: '12px',
                            color: color.textGray
                        }}
                    >
                        Nội dung
                    </Typography>
                    <TinyEditor
                        handleChange={handleDetail} />
                </DivMargin>
                <DivMargin>
                    <ButtonNormal bg={'true'} label={'Thêm'} onClick={handleCreatePost} />
                </DivMargin>
            </InfoBox>
        </>
    );
}





