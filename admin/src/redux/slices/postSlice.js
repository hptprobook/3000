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
            const response = await PostService.getPost(postId); // Use your post service to fetch a post
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
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
                state.status = "succeeded";
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
                state.status = "succeeded";
                state.selectedPost = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default postSlice.reducer;
