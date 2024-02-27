import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "@/services/order.service";

export const getAllOrder = createAsyncThunk(
    "orders/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await OrderService.getAllOrders();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getOrderById = createAsyncThunk(
    "orders/getOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await OrderService.getOrderById(id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addOrder = createAsyncThunk(
    "orders/addOrder",
    async (data, { rejectWithValue }) => {
        try {
            const response = await OrderService.addOrder(data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async ({ data, id }, { rejectWithValue }) => {
        try {
            const response = await OrderService.updateOrder(data, id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response = await OrderService.deleteOrder(id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    orders: [],
    order: {},
    putOrder: {},
    postOrder: {},
    deleted: false,
    status: "idle",
    error: null,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearPutOrder: (state) => {
            state.putOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = action.payload;
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getOrderById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.order = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.postOrder = action.payload;
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.putOrder = action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state) => {
                state.status = "succeeded";
                state.deleted = true;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { clearPutOrder } = orderSlice.actions;
export default orderSlice.reducer;
