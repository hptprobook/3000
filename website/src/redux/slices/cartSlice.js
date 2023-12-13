import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "@/services/cart.service";

const initialState = {
    carts: {},
    cartList: [],
    cartWithIds: [],
    status: "idle",
    error: null,
};

export const addToCart = createAsyncThunk(
    "carts/addToCart",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await CartService.addToCart(cartData);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchAllCart = createAsyncThunk(
    "carts/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await CartService.fetchAllCart();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchWithIds = createAsyncThunk(
    "carts/fetchWithIds",
    async (data, { rejectWithValue }) => {
        try {
            const res = await CartService.fetchWithIds(data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.carts = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchAllCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cartList = action.payload;
            })
            .addCase(fetchAllCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchWithIds.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWithIds.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cartWithIds = action.payload;
            })
            .addCase(fetchWithIds.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
