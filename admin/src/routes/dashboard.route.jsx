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
            <Route path="post/edit/:id" element={<ListPostPage />} />
            <Route
                path="product/warehouse"
                element={<WarehouseProductPage />}
            />
            <Route path="" element={<></>} />
        </Routes>
    );
}

export default DashboardRoute;
