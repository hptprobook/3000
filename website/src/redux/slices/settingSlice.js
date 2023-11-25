import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SettingService from "@/services/setting.service";

export const fetchAllSettings = createAsyncThunk(
    "setting/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await SettingService.getData();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    settings: [],
    loading: false,
    error: null,
};

const settingSlice = createSlice({
    name: "setting",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.settings = action.payload;
            });
    },
});

export default settingSlice.reducer;
