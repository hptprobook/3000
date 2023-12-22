// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/user.service";

export const fetchAllUsers = createAsyncThunk(
    "users",
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserService.getAllUser();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchUserById = createAsyncThunk(
    "users/fetchById",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await UserService.getUser(userId);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    "users/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserService.getCurrentUser();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateCurrentUser = createAsyncThunk(
    "users/updateCurrentUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await UserService.updateCurrentUser(user);
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    users: [],
    updateUser: {},
    selectedUser: null,
    currentUser: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateCurrentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.updateUser = action.payload;
            })
            .addCase(updateCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
