// uploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    uploading: false,
    error: null,
    uploadedFile: null,
  },
  reducers: {
    uploadStart: (state) => {
      state.uploading = true;
      state.error = null;
    },
    uploadSuccess: (state, action) => {
      state.uploading = false;
      state.uploadedFile = action.payload;
    },
    uploadFailure: (state, action) => {
      state.uploading = false;
      state.error = action.payload;
    },
  },
});

export const { uploadStart, uploadSuccess, uploadFailure } = uploadSlice.actions;

export default uploadSlice.reducer;
