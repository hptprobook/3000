import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import Error404Page from "../pages/Error/Error404Page";
import UserPage from "../pages/User/List/ListUserPage";
import AddUserPage from "../pages/User/Add/AddUserPage";
import EditUserPage from "../pages/User/Edit/EditUserPage";
import CreateProductPage from "../pages/Product/Create/CreateProductPage";
import ListProductPage from "../pages/Product/List/ListProductPage";
import WarehouseProductPage from "../pages/Product/Warehouse/WarehouseProductPage";
import ListPostPage from "../pages/Post/List/ListPostPage";
import ListCategoriesPage from "../pages/Category/List/ListCategoryPage";
import CreatePostPage from "../pages/Post/Add/CreatePostPage";
import EditPostPage from "../pages/Post/Edit/EditPostPage";
import CreateCategoryPage from "../pages/Category/Add/CreateCategoryPage";
import EditCategoryPage from "../pages/Category/Edit/EditCategoryPage";
import ListOrderPage from "../pages/Order/List/ListOrderPage";
import ComingSoon from "../components/common/ComingSoon/ComingSoon";
import ListTagsPage from "../pages/Tags/List/ListTagsPage";
import CreateTagsPage from "../pages/Tags/Create/CreateTagsPage";
import EditTagsPage from "../pages/Tags/Edit/EditTagsPage";
import ListBrandPage from "../pages/Brand/List/ListBrandPage";
import CreateBrandPage from "../pages/Brand/Create/CreateBrandPage";
import EditBrandPage from "../pages/Brand/Edit/EditBrandPage";
import { DetailOrderPage } from "../pages/Order/Detail/DetailOrderPage";
import EditProductPage from "../pages/Product/Edit/EditProductPage";
import ListCouponsPage from "../pages/Coupons/List/ListCouponsPage";
import CreateCouponPage from "../pages/Coupons/Create/CreateCouponPage";
import EditCouponPage from "../pages/Coupons/Edit/EditCouponPage";

function DashboardRoute() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Error404Page />} />
            <Route path="user/list" element={<UserPage />} />
            <Route path="user/create" element={<AddUserPage />} />
            <Route path="user/edit/:id" element={<EditUserPage />} />
            <Route path="product/create" element={<CreateProductPage />} />
            <Route path="product/list" element={<ListProductPage />} />
            <Route path="post/list" element={<ListPostPage />} />
            <Route path="post/create" element={<CreatePostPage />} />
            <Route path="post/edit/:id" element={<EditPostPage />} />
            <Route path="product/warehouse" element={<WarehouseProductPage />} />
            <Route path="product/edit/:id" element={<EditProductPage />} />
            <Route path="category/list" element={<ListCategoriesPage />} />
            <Route path="category/create" element={<CreateCategoryPage />} />
            <Route path="category/edit/:id" element={<EditCategoryPage />} />
            <Route path="category/tag" element={<ListTagsPage />} />
            <Route path="category/tag/create" element={<CreateTagsPage />} />
            <Route path="category/tag/edit/:id" element={<EditTagsPage />} />

            <Route path="category/brand" element={<ListBrandPage />} />
            <Route path="category/brand/create" element={<CreateBrandPage />} />
            <Route path="category/brand/edit/:id" element={<EditBrandPage />} />

            <Route path="coupon/list" element={<ListCouponsPage />} />
            <Route path="coupon/create" element={<CreateCouponPage />} />
            <Route path="coupon/edit/:id" element={<EditCouponPage />} />



            <Route path="order/detail/:id" element={<DetailOrderPage />} />
            <Route path="order" element={<ListOrderPage />} />
            <Route path="payment" element={<ComingSoon />} />
        </Routes>
    );
}

export default DashboardRoute;
