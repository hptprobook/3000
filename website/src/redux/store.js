import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productReducer from "./slices/productSlice";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        categories: categoriesReducer,
        products: productReducer,
        search: searchReducer,
    },
});
