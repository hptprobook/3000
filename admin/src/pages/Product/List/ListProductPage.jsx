import React, { useEffect, useState } from "react";
import "./style.css";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import color from "../../../config/colorConfig";
import InputSearch from "../../../components/common/TextField/InputSearch";
import SelectFilterProduct from "../../../components/common/Select/SelectFilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../../redux/slices/productSlice";
// import { setStatus } from "../../../redux/slices/categoriesSlice";

export default function ListProductPage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const status = useSelector((state) => state.categories.status);
    const error = useSelector((state) => state.categories.error);
    const [loadData, setLoadData] = useState(false);
    // useEffect(() => {
    //     if (!loadData) {
    //         dispatch(fetchAllCategories());
    //         if (status !== 'idle') {
    //             setLoadData(true);
    //             dispatch(setStatus('idle'));
    //             console.log(categories)
    //         }
    //     }
    // }, [loadData, dispatch, status]);
    return (
        <Box>
            <HeaderPage
                namePage={"Sản phẩm"}
                Breadcrumb={["Sản phẩm", "Danh sách"]}
                ButtonLink="/product/create"
            />
            <Box sx={{ width: '100%', mt: '16px', backgroundColor: color.backgroundColorSub.dark, borderRadius: '13px' }}>
                <Box sx={{ padding: '32px 0' }}>
                    <Box sx={{
                        padding: '0 16px 16px',
                        borderBottom: '1px solid ' + color.colorHover.hoverGray
                    }}>
                        <InputSearch />
                    </Box>
                    <SelectFilterProduct />
                </Box>
            </Box>
        </Box>
    )
}
