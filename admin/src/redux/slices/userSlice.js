// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/user.service";

// Async thunk for fetching all users
export const fetchAllUsers = createAsyncThunk(
    "users/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserService.getAllUser();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Async thunk for fetching a single user by id
export const fetchUserById = createAsyncThunk(
    "users/fetchById",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await UserService.getUser(userId);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    users: [],
    selectedUser: null,
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
            });
    },
});

export default userSlice.reducer;