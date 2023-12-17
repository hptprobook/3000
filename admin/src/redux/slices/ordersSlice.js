import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
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
export const updateStatusOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await OrdersService.updateStatusOrder(id, data);
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      throw error;
    }
  }
);
export const resetState = createAction('orders/resetState');

const ordersSlice = createSlice({
  name: 'orders',
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
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload; // Storing only the orders array
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
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
      })
      .addCase(updateStatusOrder.pending, (state) => {
        state.statusUpdate = 'loading';
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.statusUpdate = 'success';
        state.orderUpdate = action.payload; // Storing only the orders array
      })
      .addCase(updateStatusOrder.rejected, (state, action) => {
        state.statusUpdate = 'failed';
        state.errorUpdate = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
