// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ReportService from "../../services/report.service";

export const getBasicReport = createAsyncThunk(
    "report",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ReportService.getBasicReport();
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getOrderReportToChart = createAsyncThunk(
    "report/getOrderReportToChart",
    async (data, { rejectWithValue }) => {
        try {
            const response = await ReportService.getOrderReportToChart(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAmountReportToChart = createAsyncThunk(
    "report/getAmountReportToChart",
    async (data, { rejectWithValue }) => {
        try {
            const response = await ReportService.getAmountReportToChart(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    reports: null,
    orderReports: null,
    amountReports: null,
    status: "idle",
    error: null,
};

const reportSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBasicReport.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getBasicReport.fulfilled, (state, action) => {
                state.status = "succecced";
                state.reports = action.payload;
            })
            .addCase(getBasicReport.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getOrderReportToChart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getOrderReportToChart.fulfilled, (state, action) => {
                state.status = "succecced";
                state.orderReports = action.payload;
            })
            .addCase(getOrderReportToChart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getAmountReportToChart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAmountReportToChart.fulfilled, (state, action) => {
                state.status = "succecced";
                state.amountReports = action.payload;
            })
            .addCase(getAmountReportToChart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default reportSlice.reducer;
