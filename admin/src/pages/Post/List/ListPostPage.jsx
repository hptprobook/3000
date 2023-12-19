import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "~/redux/slices/postSlice"; // Replace with your post slice import
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import "./style.css";
import { Grid } from "@mui/material";
import CardPost from "../../../components/common/Card/CardPost";
import ChipPostTag from "../../../components/common/Chip/ChipPostTag";
import Loading from "../../../components/common/Loading/Loading";



const ListPostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.data); // Update the selector for posts
    const statusPost = useSelector((state) => state.posts.status); // Update the selector for posts
    const error = useSelector((state) => state.posts.error); // Update the selector for posts
    const [loadData, setLoadData] = useState(false);
    const [selectedFilters, setSelectedFilters] = React.useState([]);
    const [postsStatusList, setPostStatusList] = React.useState([]);
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
        if (statusPost == 'success') {
            setPostStatusList(orders);
            setLoadData(true);
        }
    }, [statusPost]);
    useEffect(() => {
        if (statusPost == 'success') {
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
    if (statusPost === 'success') {
    return (
        <>
            <HeaderPage
                namePage={"Bài viết"}
                Breadcrumb={["Bài viết", "Danh sách"]}
                ButtonLink="/post/create"
            />
            <Grid sx={{ marginTop: "32px" }} container spacing={8}>
                    <Grid item xs={12} sm={6}>
                        <CardPost  />
                    </Grid>
               
            </Grid>
        </>
        );
    }

};

export default ListPostPage;
