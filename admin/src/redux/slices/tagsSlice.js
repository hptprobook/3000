// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TagsService from "../../services/tags.service";

export const fetchAllTags = createAsyncThunk(
  "tags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await TagsService.getAllTags();
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  tags: [],
  selectedUser: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.status = "succeeded tags";
        state.tags = action.payload;
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default tagsSlice.reducer;
