import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CardContent, Grid, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import { uploadFileToServer } from '../../../services/uploadFileToServer'; // Adjust the import path
import { uploadFailure, uploadStart, uploadSuccess } from '../../../redux/slices/uploadSlice';
import InputEdit from '../../../components/common/TextField/InputEdit';
import InfoBox from '../../../components/common/Box/InforBox';
import { createPost, fetchAllPosts } from '../../../redux/slices/postSlice';
import ButtonNormal from '../../../components/common/Button/ButtonNormal';
import color from '../../../config/colorConfig';
import TinyEditor from '../../../components/common/TinyEditor/TinyEditor';
import { useFormik } from 'formik';
import * as Yup from "yup";
import BasicAlertl from '../../../components/common/Alert/BasicAlertl';
import Loading from '../../../components/common/Loading/Loading';
import LinearIndeterminate from '../../../components/common/Loading/LoadingLine';
const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
const productSchema = Yup.object().shape({
    title: Yup.string()
        .required("Tiêu đề không được để trống")
        .min(20, "Tiêu đề không được dưới 20 ký tự")
        .max(255, "Tiêu đề không vượt quá 255 ký tự"),
});
export default function CreatePostPage() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.posts.status);
    const statusCreate = useSelector((state) => state.posts.statusCreate);
    // Access posts from Redux store
    const [successCreate, setSuccessCreate] = useState(false);
    const [createErrorHelp, setCreateErrorHelp] = useState('');
    //editor
    const [content, setContent] = useState('');
    const [createError, setCreateError] = useState(false);

    useEffect(() => {
        if (statusCreate == 'created post successfully') {
            setSuccessCreate(true);
        }
        else {
            setSuccessCreate(false);
        }
    }, [statusCreate])

    //formik
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
        },
        validationSchema: productSchema,        
        onSubmit: (values) => {
            setCreateError(false);
            if (content == '') {
                setCreateError(true);
                setCreateErrorHelp('Vui lòng nhập nội dung');
            }
            else {
                
                setCreateError(false);
                values['content'] = content;                  
            }
            console.log("Form values:", values);
            dispatch(createPost({data: values}));
        },
    });

    //ADD 
    //check editor
    const handleContent = (value) => {
        setCreateError(false);
        if (value.length < 12) {
            setCreateError(true);
            setCreateErrorHelp('Nội dung không ít hơn 12 kí tự');
        }
        else {
            setCreateError(false);
            setContent(value);
        }
    }
    if (status ==="loading") {
        return <div><Loading/> </div>
        
    }
    return (
        <>
            <Box>
                {successCreate ? <BasicAlertl label={'Tạo bài viết thành công'} severity={'success'} /> : null}
                {createError ? <BasicAlertl label={createErrorHelp} severity={'error'} /> : null}
                {statusCreate == 'loading' ? <LinearIndeterminate /> : null}
                <HeaderPage
                    namePage={"Tạo bài viết"}
                    Breadcrumb={["Bài viết", "Tạo bài viết"]}
                />
                <Box sx={{
                    marginTop: '32px'
                }}>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <InfoBox title="Thông tin">
                        <DivMargin>
                            <InputEdit
                                id={'title'}
                                label={'Tiêu đề'}
                                name={'title'}
                                value={formik.values.title}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.title &&
                                    Boolean(formik.errors.title)
                                }
                                helperText={
                                    formik.touched.title && formik.errors.title
                                }
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
                                defaultValue={content}
                                handleChange={handleContent} />
                        </DivMargin>
                        <DivMargin>
                            <ButtonNormal label={'Tạo'} type={'submit'} bg={'true'} />
                        </DivMargin>
                    </InfoBox>
                </form>
            </Box>

        </>
    );
}





