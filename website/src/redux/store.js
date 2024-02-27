import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";
import settingReducer from "./slices/settingSlice";
import categoryReducer from "./slices/categorySlice";
import brandReducer from "./slices/brandSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import deliveryReducer from "./slices/deliverySlice";
import orderReducer from "./slices/orderSlice";
import couponReducer from "./slices/couponSlice";
import reviewReducer from "./slices/reviewSlice";
import checkoutReducer from "./slices/checkoutSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        products: productReducer,
        search: searchReducer,
        setting: settingReducer,
        categories: categoryReducer,
        brands: brandReducer,
        carts: cartReducer,
        addresses: addressReducer,
        orders: orderReducer,
        coupons: couponReducer,
        deliveries: deliveryReducer,
        reviews: reviewReducer,
        checkout: checkoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
