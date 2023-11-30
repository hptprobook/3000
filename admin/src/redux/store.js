import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import categoriesReducer from "./slices/categoriesSlice";
import tagsReducer from "./slices/tagSlice";
import brands from "./slices/brandsSlice";
import addressSlice from "./slices/addressSlice";
import uploadReducer from "./slices/uploadSlice";
import productsReducer from "./slices/productSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        categories: categoriesReducer,
        address: addressSlice,
        upload: uploadReducer,
        products: productsReducer,
        tags: tagsReducer,
    },
});
