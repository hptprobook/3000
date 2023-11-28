import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";
import settingReducer from "./slices/settingSlice";
import categoryReducer from "./slices/categorySlice";
import brandReducer from "./slices/brandSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        products: productReducer,
        search: searchReducer,
        setting: settingReducer,
        categories: categoryReducer,
        brands: brandReducer,
    },
});
