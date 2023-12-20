import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "~/redux/slices/postSlice"; // Replace with your post slice import
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import { Box, Grid, Typography } from "@mui/material";
import Loading from "../../../components/common/Loading/Loading";
import { deletePostByID, fetchPostById, updatePostByID } from "../../../redux/slices/postSlice";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import { useParams } from "react-router-dom";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import TinyEditor from "../../../components/common/TinyEditor/TinyEditor";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import * as Yup from "yup";
import BasicAlertl from "../../../components/common/Alert/BasicAlertl";
import color from "../../../config/colorConfig";
const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
const productSchema = Yup.object().shape({
    title: Yup.string()
        .required("Tiêu đề không được để trống")
        .min(20, "Tiêu đề không được dưới 20 ký tự")
        .max(255, "Tiêu đề không vượt quá 255 ký tự"),
});
const EditPostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.selectedPost); // Update the selector for posts
    //set data
    const [successFetch, setSuccessFetch] = useState(false);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [createErrorHelp, setCreateErrorHelp] = useState('');
    //status
    const statusFetch = useSelector((state) => state.posts.statusFetchById);// Update the selector for posts
    const [content, setContent] = useState('');
    const statusUpdate = useSelector((state) => state.posts.statusUpdate);


    useEffect(() => {
       dispatch(fetchPostById(id));
    }, [id, dispatch]);
    useEffect(() => {
        if (statusFetch === 'featch one id') {
            setSuccessFetch(true);
            
            formik.setValues({
                title: post.title,
                content: post.content,
            });
            setContent(post.content);
            console.log(post.content);
        }
    }, [statusFetch, dispatch]);
    useEffect(() => {
        if (statusUpdate == 'Update successfully') {
            setSuccessUpdate(true);
        }
    }, [statusUpdate])
    //formik
    const formik = useFormik({
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
            dispatch(updatePostByID({ id: id, data: values }));
        },
    });
    // Content
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
    if (!successFetch) {
        return <div><Loading /></div>;
    }
    if (successFetch) {
        return (
            <>
                {successUpdate ? <BasicAlertl label={'Chỉnh sửa bài viết thành công'} severity={'success'} /> : null}
                {statusUpdate == 'loading' ? <LinearIndeterminate /> : null}
                {createError ? <BasicAlertl label={createErrorHelp} severity={'error'} /> : null}
                <HeaderPage
                    namePage={"Chỉnh sửa"}
                    Breadcrumb={["Bài viết", "Chỉnh sửa"]}
                />
                <Box>
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
                                    defaultValue={post.content}
                                    handleChange={handleContent} />
                            </DivMargin>
                            <DivMargin>
                                <ButtonNormal label={'Cập nhật'} type={'submit'} bg={'true'} />
                            </DivMargin>
                        </InfoBox>
                    </form>
                </Box>
            </>
        );
    }
};

export default EditPostPage;
