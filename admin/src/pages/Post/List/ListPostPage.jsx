import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "~/redux/slices/postSlice"; // Replace with your post slice import
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import './style.css';
import { Grid } from "@mui/material";
import CardPost from "../../../components/common/Card/CardPost";
const ListPostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts.data); // Update the selector for posts
    const status = useSelector((state) => state.posts.status); // Update the selector for posts
    const error = useSelector((state) => state.posts.error); // Update the selector for posts
    return (
        <>
            <HeaderPage
                namePage={'Bài viết'}
                Breadcrumb={['Bài viết', 'Danh sách']}
                ButtonLink='/post/create'
            />
            <Grid sx={{ marginTop: '32px' }} container spacing={8}>
                <Grid item xs={12} sm={6}>
                    <CardPost />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <HeaderPage
                        namePage={'Bài viết'}
                        Breadcrumb={['Bài viết', 'Danh sách']}
                        ButtonLink='/post/create'
                    />
                </Grid>
                <Grid item xs={6}>
                    <HeaderPage
                        namePage={'Bài viết'}
                        Breadcrumb={['Bài viết', 'Danh sách']}
                        ButtonLink='/post/create'
                    />
                </Grid>
            </Grid>
        </>

    );
    // }
};

export default ListPostPage;
