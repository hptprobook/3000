import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import VariantService from '../../services/variant.service';

export const fetchVariant = createAsyncThunk(
  'variant/fetchVariant',
  async (_, { rejectWithValue }) => {
    try {
      const res = await VariantService.getAllVariant();
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      throw error;
    }
  }
);

export const resetState = createAction('orders/resetState');

const variantSlice = createSlice({
  name: 'variant',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    // ... (other reducers)
    resetState: (state) => {
      state.statusUpdate = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVariant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVariant.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload; // Storing only the orders array
      })
      .addCase(fetchVariant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default variantSlice.reducer;
