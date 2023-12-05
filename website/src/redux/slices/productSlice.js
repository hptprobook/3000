import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "@/services/product.service";

export const fetchAllProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ProductService.getAllProducts();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await ProductService.getProductById(productId);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchRecommendedProducts = createAsyncThunk(
    "products/fetchRecommendedProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ProductService.getRecommendedProduct();
            return response;
        } catch (err) {
            return rejectWithValue(err.response);
        }
    }
);

const initialState = {
    products: [],
    selectedProduct: null,
    recommendedProducts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchRecommendedProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRecommendedProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.recommendedProducts = action.payload;
            });
    },
});

export default productSlice.reducer;
