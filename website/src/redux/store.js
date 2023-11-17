import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productReducer from "./slices/productSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        categories: categoriesReducer,
        products: productReducer,
        search: searchReducer,
    },
});
