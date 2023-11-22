import React from "react";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import "./style.css";

export default function CreateProductPage() {
    return (
        <Box>
            <HeaderPage
                namePage={"Tạo mới"}
                Breadcrumb={["Sản phẩm", "Tạo"]}
            />
        </Box>
    );
}
