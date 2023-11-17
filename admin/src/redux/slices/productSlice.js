// categoriesSlice.js (Redux slice for categories)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsService from "../../services/product.service";
export const fetchAllCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ProductsService.getAllCategories();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


const productsSlice = createSlice({
    name: "categories",
    initialState: { data: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.status = "Category already";
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
