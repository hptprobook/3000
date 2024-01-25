import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/auth.service";

const initialState = {
    loading: false,
    error: "",
    user: null,
    changedPassword: null,
    registerData: null,
    forgotPassword: null,
    access_token: null,
    verifyToken: null,
    resetPassword: null,
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

export const forgotPassword = createAsyncThunk(
    "auth/password/forgot",
    async (email, thunkAPI) => {
        try {
            const response = await AuthService.forgotPassword(email);
            if (response.error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.changePassword(data);
            if (response.error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const verifyToken = createAsyncThunk(
    "auth/verifyToken",
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.verifyToken(data);
            if (response.error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.resetPassword(data);
            if (response.error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearRegisterData: (state) => {
            state.registerData = null;
        },
    },
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
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.error = false;
                state.loading = false;
                state.changedPassword = action.payload;
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
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.forgotPassword = action.payload;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.error = false;
                state.loading = false;
                state.user = null;
                state.access_token = null;
            })
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.verifyToken = action.payload;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.resetPassword = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearRegisterData } = authSlice.actions;
export default authSlice.reducer;
