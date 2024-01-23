import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AddressService from "@/services/address.service";

const initialState = {
    addresses: [],
    address: {},
    addressGHN: [],
    addressById: {},
    deleted: false,
    status: "idle",
    error: null,
};

export const getAddresses = createAsyncThunk(
    "address/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AddressService.getAddress();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAddressGHN = createAsyncThunk(
    "address/getGHN",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AddressService.getProvinceGHN();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAddressById = createAsyncThunk(
    "address/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await AddressService.getAddressById(id);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addAddresses = createAsyncThunk(
    "address/addAddress",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AddressService.postAddress(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateAddress = createAsyncThunk(
    "address/updateAddress",
    async ({ data, id }, { rejectWithValue }) => {
        try {
            const response = await AddressService.updateAddress(data, id);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async (id, { rejectWithValue }) => {
        try {
            const response = await AddressService.deleteAddress(id);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const addressSlice = createSlice({
    name: "addresses",
    initialState,
    reducers: {
        clearAddress: (state) => {
            state.address = {};
        },
        resetDeleted: (state) => {
            state.deleted = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAddresses.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.addresses = action.payload;
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addAddresses.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addAddresses.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.address = action.payload;
            })
            .addCase(addAddresses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.address = action.payload;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getAddressById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAddressById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.addressById = action.payload;
            })
            .addCase(getAddressById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getAddressGHN.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAddressGHN.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.addressGHN = action.payload;
            })
            .addCase(getAddressGHN.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAddress.fulfilled, (state) => {
                state.status = "succeeded";
                state.deleted = true;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { clearAddress, resetDeleted } = addressSlice.actions;
export default addressSlice.reducer;
