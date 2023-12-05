import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BrandsService from '../../services/brand.service';

export const fetchAllBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, thunkAPI) => {
    try {
      const res = await BrandsService.getAllBrand();
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      throw error;
    }
  }
);
export const deleteBrandByID = createAsyncThunk(
  "brands/deleteBrandByID",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await BrandsService.deleteBrandByID(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);
const brandsSlice = createSlice({
  name: 'brands',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.status = 'brands is ready';
        state.data = action.payload; // Storing only the brands array
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.status = 'failed fetching brands';
        state.error = action.error.message;
      })
      .addCase(deleteBrandByID.pending, (state) => {
        state.statusDelete = 'loading delete';
      })
      .addCase(deleteBrandByID.fulfilled, (state, action) => {
        state.statusDelete = 'delete success';
        state.dataDelete = action.payload; // Storing only the brands array
      })
      .addCase(deleteBrandByID.rejected, (state, action) => {
        state.statusDelete = 'delete failed';
        state.error = action.error.message;
      })
      ;
  },
});

export default brandsSlice.reducer;
