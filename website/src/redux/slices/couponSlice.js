import CouponService from "@/services/coupon.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCoupon = createAsyncThunk(
    "coupon/addCoupon",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CouponService.addCoupon(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    couponUsage: null,
    status: "idle",
    error: null,
};

const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCoupon.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addCoupon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.couponUsage = action.payload;
            })
            .addCase(addCoupon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default couponSlice.reducer;
