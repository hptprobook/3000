import React, { useEffect, useState } from "react";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import color from "../../../config/colorConfig";
import InputSearch from "../../../components/common/TextField/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import TableTags from "../../../components/common/Table/TableTags";
import Loading from "../../../components/common/Loading/Loading";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import TableBrands from "../../../components/common/Table/TableBrands";
import { deleteBrandByID, fetchAllBrands } from "../../../redux/slices/brandsSlice";


export default function ListBrandPage() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.brands.error);
    const brands = useSelector((state) => state.brands.data);
    const status = useSelector((state) => state.brands.status);
    const dataReturn = useSelector((state) => state.brands.dataDelete);
    const statusDelete = useSelector((state) => state.brands.statusDelete);
    const [dataBrands, setDataBrands] = useState([]);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        if (loadData == false) {
            dispatch(fetchAllBrands());
        }
    }, [loadData]);
    useEffect(() => {
        if (status == 'brands is ready') {
            setDataBrands(brands);
            setLoadData(true);
        }
    }, [status]);
    useEffect(() => {
        if (statusDelete == 'delete success') {
            setLoadData(false);
        }
    }, [statusDelete]);
    const handleDeleteBrand = (value) => {
        dispatch(deleteBrandByID({ id: value }));
    }
    const handleSearch = (searchValue) => {
        const regex = new RegExp(searchValue, 'i'); // 'i' để không phân biệt hoa thường
        const result = brands.filter(item => regex.test(item.name));
        setDataBrands(result);
        if (searchValue === '') {
            setDataBrands(brands);
        }
    };

    if (status === 'loading') {
        return (
            <Loading />
        )
    }
    if (status === 'failed') {
        return (
            <div>Error</div>
        )
    }
    if (status === 'brands is ready') {
        return (
            <Box>
                {statusDelete === 'loading delete' ? <LinearIndeterminate /> : null}

                <HeaderPage
                    namePage={"Thương hiệu"}
                    Breadcrumb={["Thương hiệu", "Danh sách"]}
                    ButtonLink="/category/brand/create"
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
                        <TableBrands data={dataBrands} onDeleteBrand={handleDeleteBrand} />
                    </Box>
                </Box>
            </Box>
        );
    }

}
