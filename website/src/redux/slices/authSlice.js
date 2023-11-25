import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/auth.service";

const initialState = {
    loading: false,
    error: "",
    user: null,
    registerData: null,
    access_token: null,
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, thunkAPI) => {
        const response = await AuthService.login(userData);
        if (response.error) {
            return thunkAPI.rejectWithValue(response.message);
        }
        localStorage.setItem("access_token", response.data.token);
        return response.data;
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const response = await AuthService.register(userData);
            if (response.error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logout", async (thunkAPI) => {
    try {
        window.location.reload();
        localStorage.removeItem("access_token");
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.error = false;
                state.loading = false;
                state.user = action.payload.user;
                state.access_token = action.payload.access_token;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.registerData = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.error = false;
                state.loading = false;
                state.user = null;
                state.access_token = null;
            });
    },
});

export default authSlice.reducer;
