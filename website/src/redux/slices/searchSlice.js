import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SearchService from "@/services/search.service";

export const fetchSearch = createAsyncThunk(
    "search/fetchSearch",
    async (searchValue, { rejectWithValue }) => {
        try {
            const response = await SearchService.searchWithKeyword(searchValue);
            return response;
        } catch (err) {
            return rejectWithValue(
                err.response ? err.response.data : "An error occurred"
            );
        }
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        results: [],
        selected: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.results = action.payload;
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default searchSlice.reducer;
