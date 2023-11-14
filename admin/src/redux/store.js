import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import categoriesReducer from "./slices/categoriesSlice";
import addressSlice from "./slices/addressSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        categories: categoriesReducer,
        address: addressSlice,
    },
});
