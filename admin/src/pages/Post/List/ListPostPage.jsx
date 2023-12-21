import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "~/redux/slices/postSlice"; // Replace with your post slice import
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import "./style.css";
import { Box, Grid } from "@mui/material";
import CardPost from "../../../components/common/Card/CardPost";
import ChipPostTag from "../../../components/common/Chip/ChipPostTag";
import Loading from "../../../components/common/Loading/Loading";
import TablePosts from "../../../components/common/Table/TablePosts";
import InputSearch from "../../../components/common/TextField/InputSearch";
import { deletePostByID } from "../../../redux/slices/postSlice";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";

const ListPostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts); // Update the selector for posts
    //status
    const statusPost = useSelector((state) => state.posts.status); // Update the selector for posts
    const error = useSelector((state) => state.posts.error); // Update the selector for posts
    const statusDelete = useSelector((state) => state.posts.statusDelete);
    const [postsStatusList, setPostStatusList] = React.useState([]);

    //search data 
    const [loadData, setLoadData] = useState(false);
    const [selectedFilters, setSelectedFilters] = React.useState([]);
    const [postList, setPostsList] = React.useState([]);

    
    const handleFilterReturn = (filters) => {
        setSelectedFilters(filters);
        // You can perform additional actions based on the selected filters if needed
    };
    useEffect(() => {
        if (loadData === false) {
            dispatch(fetchAllPosts());
        }
    }, [loadData]);
    useEffect(() => {
        if (statusPost == 'featch all posts') {
            setPostStatusList(posts);
            setLoadData(true);
        }
    }, [statusPost]);
    useEffect(() => {
        if (statusPost == 'featch all posts') {
            setPostStatusList(posts);

            if (selectedFilters.length > 0) {
                const filteredPost = posts.filter(post => selectedFilters.includes(post.status));
                setPostStatusList(filteredPost);
                setPostsList(filteredPost);
            }
            else {
                setPostStatusList(posts);
                setPostsList(posts);
            }
        }
    }, [selectedFilters, posts])
    const handleSearch = (searchValue) => {
        const regex = new RegExp(searchValue, 'i'); // 'i' để không phân biệt hoa thường
        const result = postsStatusList.filter(item => regex.test(item.name));
        setPostsList(result);
        if (searchValue === '') {
            setPostsList(postsStatusList);
        }
    };
    //delete 
    const handleDeletepPost = (value) => {
        dispatch(deletePostByID({ id: value }));
    }
    if (statusPost === 'loading') {
        return (
            <Loading />
        )
    }
    if (statusPost === 'failed') {
        return (
            <div>Error</div>
        )
    }
    if (statusPost === 'featch all posts') {
        return (
            <>
             {statusDelete === 'loading delete' ? <LinearIndeterminate /> : null}
                <HeaderPage
                    namePage={"Bài viết"}
                    Breadcrumb={["Bài viết", "Danh sách"]}
                    ButtonLink="/post/create"
                />
                <Box sx={{ padding: "32px 0 0" }}>
                    <Grid container spacing={0} sx={{ padding: '32px 0', margin: 0 }}>
                        <Grid item xs={12} sx={{ p: '0 12px' }}>
                            <InputSearch onChange={handleSearch} />
                        </Grid>
                    </Grid>
                    <TablePosts data={postList} onDeletePost={handleDeletepPost} />
                </Box>
            </>
        );
    }

};

export default ListPostPage;
