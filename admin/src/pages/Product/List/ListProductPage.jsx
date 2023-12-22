import React, { useEffect, useState } from "react";
import "./style.css";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import color from "../../../config/colorConfig";
import InputSearch from "../../../components/common/TextField/InputSearch";
import SelectFilterProduct from "../../../components/common/Select/SelectFilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById, fetchAllProducts, resetState } from "../../../redux/slices/productSlice";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";

import TableProduct from "../../../components/common/Table/TableProduct";
import Loading from "../../../components/common/Loading/Loading";
import BasicAlertl from "../../../components/common/Alert/BasicAlertl";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";


export default function ListProductPage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.data);
    const statusCat = useSelector((state) => state.categories.status);
    const products = useSelector((state) => state.products.products);
    const statusPro = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.categories.error);
    const [loadData, setLoadData] = useState(false);
    const [selectedFilters, setSelectedFilters] = React.useState([]);
    const [productsCategory, setProductCategory] = React.useState([]);
    const [productsList, setProductsList] = React.useState([]);
    const [successDelete, setSuccessDelete] = React.useState(false);

    const statusDelete = useSelector((state) => state.products.statusDelete);
    const handleFilterReturn = (filters) => {
        setSelectedFilters(filters);
        // You can perform additional actions based on the selected filters if needed
    };
    const handleDeleteProduct = (id) => {
        dispatch(deleteProductById({ id: id }));
    }

    useEffect(() => {
        if (statusCat == 'idle') {
            dispatch(fetchCategoriesAsync());
        }
    }, [statusCat]);
    useEffect(() => {
        if (statusPro == 'idle') {
            dispatch(fetchAllProducts());
            setProductCategory(products);
        }
    }, [statusPro]);
    useEffect(() => {
        if (statusDelete == 'success') {
            setSuccessDelete(true);
            setTimeout(() => {
                dispatch(resetState())
            }, 2000);
        }
    }, [statusDelete]);
    useEffect(() => {
        if (statusPro == 'products already') {
            setProductsList(products);
            if (selectedFilters.length > 0) {
                const filteredProducts = products.filter(product => selectedFilters.includes(product.category_id));
                setProductCategory(filteredProducts);
                setProductsList(filteredProducts);
            }
            else {
                setProductCategory(products);
                setProductsList(products);

            }
        }
    }, [selectedFilters, products])
    const handleSearch = (searchValue) => {
        const regex = new RegExp(searchValue, 'i'); // 'i' để không phân biệt hoa thường
        const result = productsCategory.filter(item => regex.test(item.name));
        setProductsList(result);
        if (searchValue === '') {
            setProductsList(productsCategory);
        }
    };

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
                {successDelete ? <BasicAlertl label={'Xóa sản phẩm thành công!'} severity={'success'} /> : ''}
                {successDelete == 'loading' ? <LinearIndeterminate /> : ''}

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
                            <InputSearch onChange={handleSearch} />
                        </Box>
                        <SelectFilterProduct data={categories} filterReturn={handleFilterReturn} />
                        <TableProduct data={productsList} onDeleteProduct={handleDeleteProduct} />
                    </Box>
                </Box>
            </Box>
        );
    }

}
