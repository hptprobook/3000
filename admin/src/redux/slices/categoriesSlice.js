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
  async ({ data }, thunkAPI) => {
    try {
      const res = await CategoryService.createCategory(data);
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      throw error;
    }
  }
);
export const deleteCategoryByID = createAsyncThunk(
  "categories/deleteCategoryByID",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await CategoryService.deleteCategoryByID(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);
export const updateCategoryByID = createAsyncThunk(
  "categories/updateCategoryByID",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await CategoryService.updateCategoryByID(id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
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
        state.statusCreate = 'loading';
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.statusCreate = 'created successfully';
        state.newCategory = action.payload; // Update based on the actual structure
      })      
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.statusCreate = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCategoryByID.pending, (state) => {
        state.statusDelete = 'loading delete';
      })
      .addCase(deleteCategoryByID.fulfilled, (state, action) => {
        state.statusDelete = 'delete success';
        state.dataDelete = action.payload; // Storing only the categories array
      })
      .addCase(deleteCategoryByID.rejected, (state, action) => {
        state.statusDelete = 'delete failed';
        state.error = action.error.message;
      })
      .addCase(updateCategoryByID.pending, (state) => {
        state.statusUpdate = 'loading';
      })
      .addCase(updateCategoryByID.fulfilled, (state, action) => {
        state.statusUpdate = 'success';
        state.dataUpdate = action.payload; // Storing only the brands array
      })
      .addCase(updateCategoryByID.rejected, (state, action) => {
        state.statusUpdate = 'failed';
        state.error = action.error.message;
      })
  },
});

export default categoriesSlice.reducer;
