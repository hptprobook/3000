import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "@/services/cart.service";

const initialState = {
    carts: {},
    cartList: [],
    cartWithIds: [],
    updateCart: [],
    deleted: false,
    status: "idle",
    error: null,
};

export const addToCart = createAsyncThunk(
    "carts/addToCart",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await CartService.addToCart(cartData);
            if (response.error) {
                return rejectWithValue(response.message);
            }
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

export const deleteCartById = createAsyncThunk(
    "carts/deleteCart",
    async (id, { rejectWithValue }) => {
        try {
            const res = await CartService.deleteCart(id);
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateCartByIds = createAsyncThunk(
    "carts/updateCartByIds",
    async (data, { rejectWithValue }) => {
        try {
            const res = await CartService.updateCart(data);
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
            })
            .addCase(deleteCartById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteCartById.fulfilled, (state) => {
                state.status = "succeeded";
                state.deleted = true;
            })
            .addCase(deleteCartById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateCartByIds.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCartByIds.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.updateCart = action.payload;
            })
            .addCase(updateCartByIds.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
