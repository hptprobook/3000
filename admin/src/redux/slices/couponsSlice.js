import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CouponsService from '../../services/coupons.service';

export const fetchAllCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const res = await CouponsService.getAllCoupons();
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCouponById = createAsyncThunk(
  'brands/fetchBrand',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await CouponsService.getCoupon(id);
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);
export const createCoupon = createAsyncThunk(
  'coupons/createCoupon',
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await CouponsService.createCoupon(data);
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);
export const deleteCouponById = createAsyncThunk(
  "coupons/deleteCouponById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await CouponsService.deleteCouponByID(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);
export const updateCouponByID = createAsyncThunk(
  "coupons/updateCouponByID",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await CouponsService.updateCouponByID(id, data);
      return response;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data.errors);
    }
  }
);
const initialState = { data: [], status: 'idle', error: null, statusCreate: 'idle', dataCreate: null, errorCreate: null, statusDelete: 'idle', statusUpdate: 'idle', statusFetch: 'idle' };

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload; // Storing only the brands array
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCoupon.pending, (state) => {
        state.statusCreate = 'loading';
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.statusCreate = 'success';
        state.dataCreate = action.payload; // Storing only the brands array
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.statusCreate = 'failed';
        state.error = action.payload;
      })
      .addCase(updateCouponByID.pending, (state) => {
        state.statusUpdate = 'loading';
      })
      .addCase(updateCouponByID.fulfilled, (state, action) => {
        state.statusUpdate = 'success';
        state.dataUpdate = action.payload; // Storing only the brands array
      })
      .addCase(updateCouponByID.rejected, (state, action) => {
        state.statusUpdate = 'failed';
        state.errorUpdate = action.payload;
      })
      .addCase(fetchCouponById.pending, (state) => {
        state.statusFetch = 'loading';
      })
      .addCase(fetchCouponById.fulfilled, (state, action) => {
        state.statusFetch = 'success';
        state.dataFetch = action.payload; // Storing only the brands array
      })
      .addCase(fetchCouponById.rejected, (state, action) => {
        state.statusFetch = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCouponById.pending, (state) => {
        state.statusDelete = 'loading';
      })
      .addCase(deleteCouponById.fulfilled, (state, action) => {
        state.statusDelete = 'success';
        state.dataDelete = action.payload; // Storing only the brands array
      })
      .addCase(deleteCouponById.rejected, (state, action) => {
        state.statusDelete = 'failed';
        state.error = action.payload;
      })
      ;
  },
});
export const { resetState } = couponsSlice.actions;
export default couponsSlice.reducer;
