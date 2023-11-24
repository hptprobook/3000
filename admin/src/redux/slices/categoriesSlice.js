import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from '../../services/category.service';

export const fetchCategoriesAsync = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching categories...');
      const res = await CategoryService.getAllCategories();
      // Extracting only the necessary data from the response
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      throw error;
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // Storing only the categories array
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
