import React from "react";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";

import CKEditorComponent from "../../../components/common/CKEditor/CKEditor";

export default function CreateProductPage() {
    return (
        <Box>
            <HeaderPage
                namePage={"Tạo mới"}
                Breadcrumb={["Sản phẩm", "Tạo"]}
            />
            <Box>
                <CKEditorComponent />
            </Box>
        </Box>
    );
}
