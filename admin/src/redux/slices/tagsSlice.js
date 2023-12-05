// src/redux/userSlice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import TagsService from "../../services/tags.service";

export const fetchAllTags = createAsyncThunk(
  "tags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await TagsService.getAllTags();
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const createTag = createAsyncThunk(
  "create",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await TagsService.createTag(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);
export const fetchOneById = createAsyncThunk(
  "tags/fetchOneById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await TagsService.getTagByID(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);
export const deleteTagByID = createAsyncThunk(
  "tags/deleteTagByID",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await TagsService.deleteTagByID(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);
export const updateTagByID = createAsyncThunk(
  "tags/updateTagByID",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await TagsService.updateTagByID(id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);
export const setStatus = createAction('tags/setStatus');

const initialState = {
  tags: [],
  selectedUser: null,
  status: "idle",
  error: null,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.status = "succeeded tags";
        state.tags = action.payload;
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTag.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.status = "created successfully";
        state.create = action.payload;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.status = "failed";
        state.errorCreate = action.payload;
      })
      .addCase(fetchOneById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOneById.fulfilled, (state, action) => {
        state.status = "tag already";
        state.getOne = action.payload;
      })
      .addCase(fetchOneById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteTagByID.pending, (state) => {
        state.statusDelete = "loading delete";
      })
      .addCase(deleteTagByID.fulfilled, (state, action) => {
        state.statusDelete = "delete successful";
        state.delete = action.payload;
      })
      .addCase(deleteTagByID.rejected, (state, action) => {
        state.statusDelete = "delete failed";
        state.error = action.payload;
      })
      .addCase(updateTagByID.pending, (state) => {
        state.statusUpdate = "loading update";
      })
      .addCase(updateTagByID.fulfilled, (state, action) => {
        state.statusUpdate = "update successful";
        state.update = action.payload;
      })
      .addCase(updateTagByID.rejected, (state, action) => {
        state.statusUpdate = "update failed";
        state.error = action.payload;
      })
  },
});

export default tagsSlice.reducer;
