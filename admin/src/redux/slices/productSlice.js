// categoriesSlice.js (Redux slice for categories)

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await ProductsService.getProductById(id);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const deleteProductById = createAsyncThunk(
    "products/deleteProductById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await ProductsService.deleteProductById(id);
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
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await ProductsService.updateProduct(id, data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const resetState = createAction('products/resetState');

const productsSlice = createSlice({
    name: "products",
    initialState: { data: [], status: "idle", error: null },
    reducers: {
        resetState: (state) => {
            state.error = null;
            // Reset the state to its initial values
            state.status = "idle";
            state.statusFetchById = "idle";  // Add this line if 'statusFetchById' is part of your state
            state.statusCreate = "idle";
            state.statusUpdate = "idle";
            state.statusDelete = "idle";// Add this line if 'statusCreate' is part of your state
            // Add this line if 'statusCreate' is part of your state
        },
    },
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
            .addCase(fetchProductById.pending, (state) => {
                state.statusFetchById = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.statusFetchById = "success";
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.statusFetchById = "failed";
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
            })
            .addCase(deleteProductById.pending, (state) => {
                state.statusDelete = "loading";
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.statusDelete = "success";
                state.deleteReturn = action.payload;
            })
            .addCase(deleteProductById.rejected, (state, action) => {
                state.statusDelete = "failed";
                state.error = action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.statusUpdate = "loading";
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.statusUpdate = "success";
                state.dataUpdateReturn = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.statusUpdate = "failed";
                state.error = action.error.message;
            });
    },
});
export const { resetState: resetStateAction } = productsSlice.actions;
export default productsSlice.reducer;
