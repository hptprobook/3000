import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DeliveryService from "@/services/delivery.service";

const initialState = {
    districts: [],
    wards: [],
    fee: null,
    services: [],
    status: "idle",
    error: null,
};

export const getDistrictList = createAsyncThunk(
    "delivery/getDistricts",
    async (province_id, { rejectWithValue }) => {
        try {
            const response = await DeliveryService.getDistricts(province_id);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getWardList = createAsyncThunk(
    "delivery/getWards",
    async (district_id, { rejectWithValue }) => {
        try {
            const response = await DeliveryService.getWards(district_id);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getFee = createAsyncThunk(
    "delivery/getFee",
    async (data, { rejectWithValue }) => {
        try {
            const response = await DeliveryService.getFee(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getService = createAsyncThunk(
    "delivery/getService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await DeliveryService.getService(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const addressSlice = createSlice({
    name: "deliveries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDistrictList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDistrictList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.districts = action.payload;
            })
            .addCase(getDistrictList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getWardList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getWardList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.wards = action.payload;
            })
            .addCase(getWardList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getFee.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getFee.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.fee = action.payload;
            })
            .addCase(getFee.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getService.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getService.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.services = action.payload;
            })
            .addCase(getService.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default addressSlice.reducer;
