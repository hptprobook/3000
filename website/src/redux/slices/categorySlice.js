import CategoryService from "@/services/category.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchParentCategory = createAsyncThunk(
    "categories/fetchAllParent",
    async (_, { rejectWithValue }) => {
        try {
            const response = await CategoryService.getParentCategory();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchBestSellerCategory = createAsyncThunk(
    "categories/fetchBestSeller",
    async (_, { rejectWithValue }) => {
        try {
            const response = await CategoryService.getBestSellerCategory();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchRecommendedCategory = createAsyncThunk(
    "categories/fetchRecommended",
    async (_, { rejectWithValue }) => {
        try {
            const res = await CategoryService.getRecommendedCategory();
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getProductByCatId = createAsyncThunk(
    "categories/getProductByCatId",
    async (id, { rejectWithValue }) => {
        try {
            const res = await CategoryService.getProductByCatId(id);
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    categories: [],
    parentCategories: [],
    productByCatId: [],
    recommended: [],
    bestSeller: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchParentCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchParentCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchParentCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.parentCategories = action.payload;
            })
            .addCase(fetchBestSellerCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBestSellerCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBestSellerCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.bestSeller = action.payload;
            })
            .addCase(fetchRecommendedCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecommendedCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRecommendedCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.recommended = action.payload;
            })
            .addCase(getProductByCatId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductByCatId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductByCatId.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.productByCatId = action.payload;
            });
    },
});

export default categorySlice.reducer;
