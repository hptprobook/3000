import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home.page";
import Error404Page from "../pages/Error/Error404Page";

function DashboardRoute() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Error404Page />} />
        </Routes>
    );
}

export default DashboardRoute;
