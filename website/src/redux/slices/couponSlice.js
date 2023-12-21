import CouponService from "@/services/coupon.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCoupon = createAsyncThunk(
    "coupon/addCoupon",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CouponService.addCoupon(data);
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const checkCoupon = createAsyncThunk(
    "coupon/addCoupon",
    async (data, { rejectWithValue }) => {
        try {
            const response = await CouponService.checkCoupon(data);
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllCoupons = createAsyncThunk(
    "coupon/getAllCoupons",
    async (_, { rejectWithValue }) => {
        try {
            const response = await CouponService.getAllCoupons();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    couponUsage: null,
    coupons: [],
    checkCoupon: null,
    status: "idle",
    error: null,
};

const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {
        clearCouponUsage: (state) => {
            state.checkCoupon = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(addCoupon.pending, (state) => {
            //     state.status = "loading";
            //     state.error = null;
            // })
            // .addCase(addCoupon.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.couponUsage = action.payload;
            // })
            // .addCase(addCoupon.rejected, (state, action) => {
            //     state.status = "failed";
            //     state.error = action.payload;
            // })
            .addCase(getAllCoupons.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAllCoupons.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.coupons = action.payload;
            })
            .addCase(getAllCoupons.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(checkCoupon.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(checkCoupon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.checkCoupon = action.payload;
            })
            .addCase(checkCoupon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { clearCouponUsage } = couponSlice.actions;
export default couponSlice.reducer;
