import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BrandsService from '../../services/brand.service';
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
// export const fetchOneBrands = createAsyncThunk(
//   'brands/fetchBrand',
//   async ({ id }, thunkAPI) => {
//     try {
//       const res = await BrandsService.getOneBrand(id);
//       return res.data; // Assuming res.data contains the categories array
//     } catch (error) {
//       throw error;
//     }
//   }
// );
export const createCoupon = createAsyncThunk(
  'coupons/createCoupons',
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await CouponsService.createCoupon(data);
      return res.data; // Assuming res.data contains the categories array
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.errors);

    }
  }
);
// export const deleteBrandByID = createAsyncThunk(
//   "brands/deleteBrandByID",
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const response = await BrandsService.deleteBrandByID(id);
//       return response;
//     } catch (err) {
//       return rejectWithValue(err.response.data.errors);
//     }
//   }
// );
// export const updateBrandByID = createAsyncThunk(
//   "brands/updateBrandByID",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await BrandsService.updateBrandByID(id, data);
//       return response;
//     } catch (err) {
//       return rejectWithValue(err.response.data.errors);
//     }
//   }
// );
const initialState = { data: [], status: 'idle', error: null, statusCreate: 'idle', dataCreate: null, errorCreate: null };

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
      ;
  },
});
export const { resetState } = couponsSlice.actions;
export default couponsSlice.reducer;
