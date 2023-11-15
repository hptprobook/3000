import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SearchService from "@/services/search.service";

export const fetchSearch = createAsyncThunk(
    "search/fetchData",
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await SearchService.searchWithKeyword(searchTerm);
            return response;
        } catch (err) {
            return rejectWithValue(
                err.response ? err.response.data : "An error occurred"
            );
        }
    }
);

const initialState = {
    searchResults: [],
    selectedSearch: null,
    status: "idle",
    error: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.status = "loading";
                state.error = null; // Clear error state on pending
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.searchResults = action.payload;
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default searchSlice.reducer;
