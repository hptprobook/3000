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
      console.log(res); // Log the received data
      return res.data; // Return the received data
    } catch (error) {
      throw error;
    }
  }
);



export const setStatus = createAction('address/setStatus');

export const fetchAllBrands = createAsyncThunk(
    "brands/fetchBrands",
    async (_, thunkAPI) => {
        try {
            const res = await CategoryService.getAllBrand();
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
        state.status = 'created successfully';
        state.newCategory = action.payload; // Update based on the actual structure
      })      
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.status = 'brands is ready';
        state.data = action.payload; // Storing only the categories array
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.status = 'failed fetching brands';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
