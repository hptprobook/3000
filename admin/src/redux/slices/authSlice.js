import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';

export const AuthLogin = createAsyncThunk(
    'auth/AuthLogin',
    async ({ data }, thunkAPI) => {
        try {
            const res = await AuthService.login(data);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
);

export const resetAuthState = createSlice({
    name: 'auth',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {
        resetState: (state) => {
            state.data = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(AuthLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(AuthLogin.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(AuthLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Extract the resetState reducer
export const { resetState } = resetAuthState.actions;

// Export the combined reducer
export default resetAuthState.reducer;
