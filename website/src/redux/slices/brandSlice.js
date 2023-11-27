import BrandService from "@/services/brand.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopBrand = createAsyncThunk(
    "brands/fetchTopBrand",
    async (_, { rejectWithValue }) => {
        try {
            const response = await BrandService.getTopBrand();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    brands: [],
    topBrand: [],
    loading: false,
    error: null,
};

const brandSlice = createSlice({
    name: "brands",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTopBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.topBrand = action.payload;
            });
    },
});

export default brandSlice.reducer;
