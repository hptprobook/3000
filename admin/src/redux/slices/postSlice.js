// src/redux/postSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../services/post.service"; // Import your post service

export const fetchAllPosts = createAsyncThunk(
    "posts", // Change the name to "posts"
    async (_, { rejectWithValue }) => {
        try {
            const response = await PostService.getAllPosts(); // Use your post service to fetch posts
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchPostById = createAsyncThunk(
    "posts/fetchById", // Change the name to "posts/fetchById"
    async (postId, { rejectWithValue }) => {
        try {
            const response = await PostService.getPostByID(postId); // Use your post service to fetch a post
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const createPost = createAsyncThunk(
    "posts/createPost",
    async ({ data }, thunkAPI) => {
        try {
            const res = await PostService.createPost(data);
            console.log(res);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    posts: [], // Change "users" to "posts"
    selectedPost: null, // Change "selectedUser" to "selectedPost"
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const postSlice = createSlice({
    name: "posts", // Change "users" to "posts"
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = "featch all posts";
                state.posts = action.payload;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchPostById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.status = "featch one id";
                state.selectedPost = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.statusCreate = "loading";
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.statusCreate = "created post successfully";
                state.newPost = action.payload; // Update based on the actual structure
            })
            .addCase(createPost.rejected, (state, action) => {
                state.statusCreate = "failed";
                state.error = action.error.message;
            });
    },
});

export default postSlice.reducer;
