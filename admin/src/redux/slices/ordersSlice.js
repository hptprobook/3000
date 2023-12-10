import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrdersService from '../../services/orders.service';

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    try {
      const res = await OrdersService.getAllOrders();
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      throw error;
    }
  }
);
export const fetchOneOrder = createAsyncThunk(
  'orders/fetchOrder',
  async ({ id }, thunkAPI) => {
    try {
      const res = await OrdersService.getOneOrder(id);
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      throw error;
    }
  }
);
const ordersSlice = createSlice({
  name: 'orders',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'orders already';
        state.data = action.payload; // Storing only the orders array
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed fetching orders';
        state.error = action.error.message;
      })
      .addCase(fetchOneOrder.pending, (state) => {
        state.statusFetchOne = 'loading';
      })
      .addCase(fetchOneOrder.fulfilled, (state, action) => {
        state.statusFetchOne = 'success';
        state.order = action.payload; // Storing only the orders array
      })
      .addCase(fetchOneOrder.rejected, (state, action) => {
        state.statusFetchOne = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
