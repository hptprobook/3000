// categoriesSlice.js (Redux slice for categories)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  try {
    console.log('Fetching categories...');
    //no token
    const response = await axios.get("http://127.0.0.1:8000/api/categories");
    //has token
    // const response = await axios.get("http://127.0.0.1:8000/api/categories", {
    //   headers: {
    //     'Authorization': `Bearer ${access_token} `
    //   }
    // });
    // console.log(access_token);
    console.log('Categories response:', response);

    return response.data;
  } catch (error) {
    throw error;
  }
});

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
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
