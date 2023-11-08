import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "~/redux/slices/postSlice"; // Replace with your post slice import
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";

const ListPostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts.data); // Update the selector for posts
    const status = useSelector((state) => state.posts.status); // Update the selector for posts
    const error = useSelector((state) => state.posts.error); // Update the selector for posts
    return (
        <div>
            <HeaderPage namePage={'Bài viết'} />
        </div>
    );
    // }
};

export default ListPostPage;
