import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ReviewService from "@/services/review.service";

const initialState = {
    reviews: [],
    status: "idle",
    error: null,
};

export const addReview = createAsyncThunk(
    "reviews/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await ReviewService.addReview(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const addressSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addReview.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reviews = action.payload;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default addressSlice.reducer;
