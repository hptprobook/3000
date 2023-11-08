import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "~/redux/slices/postSlice"; // Replace with your post slice import
import TablePost from "../../../components/common/Table/TablePost"; // Create or import the Table component for posts
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import Loading from "../../../components/common/Loading/Loading";

const ListPostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts.data); // Update the selector for posts
    const status = useSelector((state) => state.posts.status); // Update the selector for posts
    const error = useSelector((state) => state.posts.error); // Update the selector for posts

    // useEffect(() => {
    //     if (status === "idle") {
    //         dispatch(fetchAllPosts()); // Replace with the action creator for fetching posts
    //     }
    // }, [status, dispatch]);

    // if (status === "loading") {
    //     return <div><Loading /></div>;
    // }

    // if (status === "failed") {
    //     return <div>Error: {error}</div>;
    // }

    // if (status === "succeeded") {
        return (
            <div>
                <HeaderPage namePage={'Bài viết'} />
                <TablePost data={posts} /> {/* Use the Table component for posts */}
            </div>
        );
    // }
};

export default ListPostPage;
