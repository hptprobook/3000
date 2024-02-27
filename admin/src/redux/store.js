import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import categoriesReducer from "./slices/categoriesSlice";
import tagsReducer from "./slices/tagsSlice";
import brandsReducer from "./slices/brandsSlice";
import ordersReducer from "./slices/ordersSlice";
import addressSlice from "./slices/addressSlice";
import uploadReducer from "./slices/uploadSlice";
import productsReducer from "./slices/productSlice";
import variantReducer from "./slices/variantSlice";
import couponsReducer from "./slices/couponsSlice";
import authSlice from "./slices/authSlice";
import reportSlice from "./slices/reportSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        categories: categoriesReducer,
        address: addressSlice,
        upload: uploadReducer,
        products: productsReducer,
        brands: brandsReducer,
        orders: ordersReducer,
        tags: tagsReducer,
        variant: variantReducer,
        coupons: couponsReducer,
        auth: authSlice,
        reports: reportSlice,
    },
});
