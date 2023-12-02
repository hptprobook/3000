import React, { useEffect, useState } from "react";
import "./style.css";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import color from "../../../config/colorConfig";
import InputSearch from "../../../components/common/TextField/InputSearch";
import SelectFilterProduct from "../../../components/common/Select/SelectFilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../redux/slices/productSlice";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";

import TableProduct from "../../../components/common/Table/TableProduct";
import { setStatus } from "../../../redux/slices/categoriesSlice";
import Loading from "../../../components/common/Loading/Loading";


export default function ListProductPage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.data);
    const statusCat = useSelector((state) => state.categories.status);
    const products = useSelector((state) => state.products.products);
    const statusPro = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.categories.error);
    const [loadData, setLoadData] = useState(false);
    const [selectedFilters, setSelectedFilters] = React.useState([]);

    const handleFilterReturn = (filters) => {
        setSelectedFilters(filters);
        // You can perform additional actions based on the selected filters if needed
    };
    useEffect(() => {
        // console.log(selectedFilters)
    }, [selectedFilters])

    useEffect(() => {
        if (statusCat == 'idle') {
            dispatch(fetchCategoriesAsync());
        }
    }, [statusCat]);
    useEffect(() => {
        if (statusPro == 'idle') {
            dispatch(fetchAllProducts());
        }
    }, [statusPro]);

    if (statusCat === 'loading') {
        return (
            <Loading />
        )
    }
    if (statusCat === 'failed' || statusPro === 'failed') {
        return (
            <div>Error</div>
        )
    }
    if (statusPro === 'products already') {
        return (
            <Box>
                <HeaderPage
                    namePage={"Sản phẩm"}
                    Breadcrumb={["Sản phẩm", "Danh sách"]}
                    ButtonLink="/product/create"
                />
                <Box
                    sx={{
                        width: "100%",
                        mt: "16px",
                        backgroundColor: color.backgroundColorSub.dark,
                        borderRadius: "13px",
                    }}
                >
                    <Box sx={{ padding: "32px 0 0" }}>
                        <Box
                            sx={{
                                padding: "0 16px 16px",
                                borderBottom:
                                    "1px solid " + color.colorHover.hoverGray,
                            }}
                        >
                            <InputSearch />
                        </Box>
                        <SelectFilterProduct data={categories} filterReturn={handleFilterReturn} />
                        <TableProduct data={products} />
                    </Box>
                </Box>
            </Box>
        );
    }

}
