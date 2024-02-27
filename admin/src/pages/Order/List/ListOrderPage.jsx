import React, { useEffect, useState } from "react";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import color from "../../../config/colorConfig";
import InputSearch from "../../../components/common/TextField/InputSearch";
import SelectFilterOrder from "../../../components/common/Select/SelectFilterOrder";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";
import Loading from "../../../components/common/Loading/Loading";
import TableOrder from "../../../components/common/Table/TableOrder";
import { fetchAllOrders } from "../../../redux/slices/ordersSlice";
import ExportButton from "../../../components/common/Button/ExportButton";

export default function ListOrderPage() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.data);
    const statusOrder = useSelector((state) => state.orders.status);
    const error = useSelector((state) => state.categories.error);
    const [loadData, setLoadData] = useState(false);
    const [selectedFilters, setSelectedFilters] = React.useState([]);
    const [ordersStatusList, setOrderStatusList] = React.useState([]);
    const [orderList, setOrderList] = React.useState([]);

    const handleFilterReturn = (filters) => {
        setSelectedFilters(filters);
        // You can perform additional actions based on the selected filters if needed
    };

    useEffect(() => {
        if (loadData === false) {
            dispatch(fetchAllOrders());
        }
    }, [loadData]);
    useEffect(() => {
        if (statusOrder == "success") {
            setOrderStatusList(orders);
            setLoadData(true);
        }
    }, [statusOrder]);
    useEffect(() => {
        if (statusOrder == "success") {
            setOrderList(orders);

            if (selectedFilters.length > 0) {
                const filteredOrder = orders.filter((order) =>
                    selectedFilters.includes(order.status)
                );
                setOrderStatusList(filteredOrder);
                setOrderList(filteredOrder);
            } else {
                setOrderStatusList(orders);
                setOrderList(orders);
            }
        }
    }, [selectedFilters, orders]);
    const handleSearch = (searchValue) => {
        const regex = new RegExp(searchValue, "i"); // 'i' để không phân biệt hoa thường
        const result = ordersStatusList.filter((item) =>
            regex.test(item.address.name)
        );
        setOrderList(result);
        if (searchValue === "") {
            setOrderList(ordersStatusList);
        }
    };

    if (statusOrder === "loading") {
        return <Loading />;
    }
    if (statusOrder === "failed") {
        return <div>Error</div>;
    }
    if (statusOrder === "success") {
        return (
            <Box>
                <HeaderPage
                    namePage={"Đơn hàng"}
                    Breadcrumb={["Đơn hàng", "Danh sách"]}
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
                        <SelectFilterOrder
                            data={[
                                { id: "pending", name: "Chưa giải quyết" },
                                { id: "processing", name: "Đang xử lý" },
                                { id: "shipping", name: "Đang giao" },
                                { id: "cancelled", name: "Hủy" },
                                {
                                    id: "delivered",
                                    name: "Giao hàng thành công",
                                },
                                { id: "refunded", name: "Trả hàng" },
                            ]}
                            filterReturn={handleFilterReturn}
                        />
                        <TableOrder data={orderList} />
                    </Box>
                </Box>
                <ExportButton data={orderList} />
            </Box>
        );
    }
}
