import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home.page";
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
            <Route
                path="product/warehouse"
                element={<WarehouseProductPage />}
            />
            <Route path="category/list" element={<ListCategoriesPage/>} />
            <Route path="category/create" element={<CreateCategoryPage/>} />
        </Routes>
    );
}

export default DashboardRoute;
