import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CategoryService from "../../services/category.service";

export const fetchCategoriesAsync = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await CategoryService.getAllCategories();
      // Extracting only the necessary data from the response
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      throw error;
    }
  }
);
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchCategoryById",
  async (categoryId, thunkAPI) => {
    try {
      const res = await CategoryService.getCategoryById(categoryId);
      return res.data; // Assuming res.data contains the category details
    } catch (error) {
      throw error;
    }
  }
);
export const createCategoryAsync = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, thunkAPI) => {
    try {
      const res = await CategoryService.createCategory(categoryData);
      console.log(res.data);
      return res.data; // Đảm bảo res.data chứa thông tin category mới
    } catch (error) {
      throw error;
    }
  }
);
export const setStatus = createAction('address/setStatus');

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
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCategory = action.payload; // Storing the details of a specific category
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Cập nhật trạng thái hoặc dữ liệu cần thiết từ action.payload
        state.newCategory = action.payload.newCategoryData;
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default categoriesSlice.reducer;
