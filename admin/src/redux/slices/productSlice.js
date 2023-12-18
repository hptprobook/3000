// categoriesSlice.js (Redux slice for categories)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsService from "../../services/product.service";
export const fetchAllProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ProductsService.getAllProducts();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const createProduct = createAsyncThunk(
    "products/createProduct",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await ProductsService.createProduct(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);



const productsSlice = createSlice({
    name: "products",
    initialState: { data: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.status = "products already";
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.statusCreate = "loading";
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.statusCreate = "success";
                state.dataCreate = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.statusCreate = "failed";
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
