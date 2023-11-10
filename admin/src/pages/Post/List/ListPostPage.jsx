import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "~/redux/slices/postSlice"; // Replace with your post slice import
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import "./style.css";
import { Grid } from "@mui/material";
import CardPost from "../../../components/common/Card/CardPost";
import ChipPostTag from "../../../components/common/Chip/ChipPostTag";

const posts = [
    {
        id: 1,
        title: "Why I Still Lisp, and You Should Too",
        content:
        "Aliquam dapibus elementum nulla at malesuada. Ut mi nisl, aliquet non mollis vel, feugiat non nibh.",
        author_id: 1,
        tags: "Programming",
        img: "img1.jpg",
    },
    {
        id: 2,
        title: "Scrum Has Hit the Glass Ceiling",
        content: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        author_id: 2,
        tags: "Productivity",
        img: "img2.jpg",
    },
    {
        id: 3,
        title: "Lizard",
        content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        author_id: 3,
        tags: "Reptile",
        img: "img3.jpg",
    },
    {
        id: 4,
        title: "Scrum Has Hit the Glass Ceiling",
        content: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        author_id: 4,
        tags: "Productivity",
        img: "img4.jpg",
    },
];

const ListPostPage = () => {
    const dispatch = useDispatch();
    // const posts = useSelector((state) => state.posts.posts.data); // Update the selector for posts
    // const status = useSelector((state) => state.posts.status); // Update the selector for posts
    // const error = useSelector((state) => state.posts.error); // Update the selector for posts
    return (
        <>
            <HeaderPage
                namePage={"Bài viết"}
                Breadcrumb={["Bài viết", "Danh sách"]}
                ButtonLink="/post/create"
            />

            <Grid sx={{ marginTop: "32px" }} container spacing={8}>
                {/* Map through the posts array and render a CardPost for each post */}
                {posts.map((post) => (
                    <Grid key={post.id} item xs={12} sm={6}>
                        <CardPost post={post} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ListPostPage;
