import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CheckoutService from "@/services/checkout.service";

export const createVNPCheckout = createAsyncThunk(
    "order/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CheckoutService.createVNPCheckout(data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const returnVNPCheckout = createAsyncThunk(
    "order/returnVNPCheckout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await CheckoutService.returnVNPCheckout();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    checkoutData: null,
    deleted: false,
    status: "idle",
    error: null,
    return: null,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        clearCheckoutData: (state) => {
            state.checkoutData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createVNPCheckout.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createVNPCheckout.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.checkoutData = action.payload;
            })
            .addCase(createVNPCheckout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(returnVNPCheckout.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(returnVNPCheckout.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.return = action.payload;
            })
            .addCase(returnVNPCheckout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { clearCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
