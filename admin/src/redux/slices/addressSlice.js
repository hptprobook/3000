// src/redux/userSlice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import AddressService from "../../services/address.service";

export const fetchAllProvinces = createAsyncThunk(
    "provinces",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AddressService.getProvinces();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchDistricts = createAsyncThunk(
    "provinces/fetchDistricts",
    async (provincesId, { rejectWithValue }) => {
        try {
            const response = await AddressService.getDistricts(provincesId);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const fetchWards = createAsyncThunk(
    "provinces/fetchWards",
    async (districtId, { rejectWithValue }) => {
        try {
            const response = await AddressService.getWards(districtId);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const setStatus = createAction("address/setStatus");
const initialState = {
    address: [],
    selected: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const addressSlice = createSlice({
    name: "provinces",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProvinces.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProvinces.fulfilled, (state, action) => {
                state.status = "provinces already";
                state.provinces = action.payload;
            })
            .addCase(fetchAllProvinces.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchDistricts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDistricts.fulfilled, (state, action) => {
                state.status = "districts already";
                state.districts = action.payload;
            })
            .addCase(fetchDistricts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchWards.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWards.fulfilled, (state, action) => {
                state.status = "wards already";
                state.wards = action.payload;
            })
            .addCase(fetchWards.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(setStatus, (state, action) => {
                state.status = action.payload;
            });
    },
});

export default addressSlice.reducer;
