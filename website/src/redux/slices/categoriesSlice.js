// categoriesSlice.js (Redux slice for categories)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        try {
            console.log("Fetching categories...");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/categories"
            );

            console.log("Categories response:", response);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: { data: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                console.log("Categories fetched successfully:", action.payload);
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                console.error(
                    "Error fetching categories:",
                    action.error.message
                );
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default categoriesSlice.reducer;
