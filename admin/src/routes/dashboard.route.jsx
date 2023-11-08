import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home.page";
import Error404Page from "../pages/Error/Error404Page";
import UserPage from "../pages/User/List/ListUserPage";
import AddUserPage from "../pages/User/Add/AddUserPage";
import CreateProductPage from "../pages/Product/Create/CreateProductPage";
import ListProductPage from "../pages/Product/List/ListProductPage";
import WarehouseProductPage from "../pages/Product/Warehouse/WarehouseProductPage";

function DashboardRoute() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Error404Page />} />
            <Route path="user/list" element={<UserPage />} />
            <Route path="user/create" element={<AddUserPage />} />
            <Route path="product/create" element={<CreateProductPage />} />
            <Route path="product/list" element={<ListProductPage />} />
            <Route
                path="product/warehouse"
                element={<WarehouseProductPage />}
            />
            <Route path="" element={<></>} />
        </Routes>
    );
}

export default DashboardRoute;
