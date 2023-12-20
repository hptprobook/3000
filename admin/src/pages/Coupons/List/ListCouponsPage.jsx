import React, { useEffect, useState } from "react";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import color from "../../../config/colorConfig";
import InputSearch from "../../../components/common/TextField/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import TableTags from "../../../components/common/Table/TableTags";
import Loading from "../../../components/common/Loading/Loading";
import { deleteTagByID, fetchAllTags, setStatus } from "../../../redux/slices/tagsSlice";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import TableCoupons from "../../../components/common/Table/TableCoupons";
import { fetchAllCoupons } from "../../../redux/slices/couponsSlice";


export default function ListCouponsPage() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.coupons.error);
    const coupons = useSelector((state) => state.coupons.data);
    const status = useSelector((state) => state.coupons.status);
    // const dataReturn = useSelector((state) => state.tags.delete);
    // const statusDelete = useSelector((state) => state.tags.statusDelete);
    const [dataCoupons, setDataCoupons] = useState([]);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        if (loadData == false) {
            dispatch(fetchAllCoupons());
        }
    }, [loadData]);
    useEffect(() => {
        if (status == 'success') {
            setDataCoupons(coupons);
            setLoadData(true);
        }
    }, [status]);
    // useEffect(() => {
    //     if (statusDelete == 'delete') {
    //         setLoadData(false);
    //     }
    // }, [statusDelete]);
    const handleDeleteCoupon = (value) => {
        dispatch(deleteTagByID({ id: value }));
    }
    const handleSearch = (searchValue) => {
        const regex = new RegExp(searchValue, 'i'); // 'i' để không phân biệt hoa thường
        const result = coupons.filter(item => regex.test(item.description));
        setDataCoupons(result);
        if (searchValue === '') {
            setDataCoupons(coupons);
        }
    };
    console.log(coupons)
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
    if (status === 'success') {
        return (
            <Box>
                {/* {statusDelete === 'loading delete' ? <LinearIndeterminate /> : null} */}

                <HeaderPage
                    namePage={"Mã giảm giá"}
                    Breadcrumb={["Mã giảm giá", "Danh sách"]}
                    ButtonLink="/coupon/create"
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
                        <TableCoupons data={dataCoupons} onDeleteCoupon={handleDeleteCoupon} />
                    </Box>
                </Box>
            </Box>
        );
    }

}
