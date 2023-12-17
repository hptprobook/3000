"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearPutOrder, updateOrder } from "@/redux/slices/orderSlice";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";

const StyledProfileOrder = styled("div")(({ isActive }) => ({
    "& .tabs": {
        display: "flex",
        width: "100%",
        height: "42px",
        backgroundColor: "#fff",
        "& .tabs__item": {
            height: "100%",
            display: "flex",
            alignItems: "center",
            width: "calc(100%/6)",
            justifyContent: "center",
            fontSize: "14px",
            color: "#808089",
            cursor: "pointer",
            userSelect: "none",
            "&.active": {
                color: "#0d5cb6",
                borderBottom: "2px solid #0d5cb6",
            },
        },
    },
    "& .search": {
        marginTop: "12px",
        height: "38px",
        width: "100%",
        backgroundColor: "#fff",
        overflow: "hidden",
        borderRadius: "4px",
        border: "1px solid #c4c4cf",
        "& .icon": {
            color: "#808089",
            width: "5%",
        },
        "& input": {
            height: "100%",
            width: "80%",
            border: "none",
            outline: "none",
            backgroundColor: "#fff",
            fontSize: "15px",
        },
        "& button": {
            width: "16%",
            height: "100%",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "var(--link-color)",
            position: "relative",
            fontSize: "15px",
            "&::after": {
                content: "''",
                position: "absolute",
                top: "50%",
                left: 0,
                width: "2px",
                height: "50%",
                backgroundColor: "#dddde3",
                transform: "translateY(-50%)",
            },
        },
    },
    "& .item": {
        marginTop: "12px",
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        "& .status": {
            padding: "0 0 12px 0",
            fontWeight: "500",
            borderBottom: "1px solid #888",
            "&.pending": { color: "#FFA500" },
            "&.processing": { color: "#0000FF" },
            "&.shipping": { color: "#008000" },
            "&.delivered": { color: "#808080" },
            "&.cancelled": { color: "#FF0000" },
            "&.refunded": { color: "#b62dda" },
        },
        "& .detail": {
            maxHeight: "0",
            transition: ".65s ease-out",
            overflow: "hidden",
            "&.open": {
                maxHeight: "1000px",
            },
            "& .detail__item": {
                margin: "24px 0",
                width: "100%",
                display: "flex",
                alignItems: "center",
                "& .img": {
                    width: "80px",
                    height: "72px",
                    overflow: "hidden",
                    borderRadius: "3px",
                },
                "& .info": {
                    width: "100%",
                    marginLeft: "12px",
                    "& .name": {
                        fontSize: "14px",
                        color: "#808089",
                    },
                    "& .quantity": {
                        fontSize: "14px",
                        color: "#808089",
                    },
                    "& .price": {
                        fontWeight: "500",
                    },
                },
            },
        },
        "& .actions": {
            display: "flex",
            justifyContent: "flex-end",
            "& .btn": {
                padding: "6px 10px",
                borderRadius: "4px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "#fff",
                color: "#333",
                fontSize: "13px",
                "&.cancelled": {
                    border: "1px solid red",
                    "&:hover": {
                        backgroundColor: "red",
                        color: "#fff",
                        borderColor: "transparent",
                    },
                },
                "&.receipt": {
                    border: "1px solid green",
                    "&:hover": {
                        backgroundColor: "green",
                        color: "#fff",
                        borderColor: "transparent",
                    },
                },
                "&.review": {
                    border: "1px solid orange",
                    "&:hover": {
                        backgroundColor: "orange",
                        color: "#fff",
                        borderColor: "transparent",
                    },
                },
            },
        },
    },
}));

export default function ProfileOrder({ data }) {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const putOrder = useSelector((state) => state.orders.putOrder);
    const statusOrder = useSelector((state) => state.orders.status);
    console.log(
        "🚀 ~ file: ProfileOrder.jsx:171 ~ ProfileOrder ~ putOrder:",
        putOrder
    );
    const [filteredOrders, setFilteredOrders] = useState([]);

    const statusConvert = (status) => {
        const statusConversion = {
            pending: { text: "Chờ xác nhận", class: "pending" },
            processing: { text: "Đang xử lý", class: "processing" },
            shipping: { text: "Đang giao hàng", class: "shipping" },
            delivered: { text: "Đã nhận hàng", class: "delivered" },
            cancelled: { text: "Đã hủy", class: "cancelled" },
            refunded: { text: "Đã hoàn tiền", class: "refunded" },
            all: { text: "Tất cả", class: "" },
        };

        return statusConversion[status] || { text: status, class: "" };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, "0")}-${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`;
    };

    const calculateDeliveryDate = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 3);
        return formatDate(date.toISOString());
    };

    const tabs = [
        { status: "all", text: "Tất cả" },
        { status: "pending", text: "Chờ xác nhận" },
        { status: "processing", text: "Đang xử lý" },
        { status: "shipping", text: "Đang giao hàng" },
        { status: "delivered", text: "Đã nhận hàng" },
        { status: "cancelled", text: "Đã hủy" },
        { status: "refunded", text: "Đã hoàn tiền" },
    ];

    useEffect(() => {
        const filtered = data?.filter((order) => {
            if (activeTab !== "all" && order.status !== activeTab) {
                return false;
            }

            if (searchTerm) {
                return order.order_details.some(
                    (detail) =>
                        detail.product &&
                        detail.product.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                );
            }

            return true;
        });

        setFilteredOrders(filtered);
    }, [putOrder, data, activeTab]);

    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    const cancelOrder = (orderId) => {
        const confirmDelete = confirm(
            "Bạn có chắc muốn hủy đơn hàng này không?"
        );
        if (!confirmDelete) return;

        dispatch(
            updateOrder({
                data: { status: "cancelled" },
                id: orderId,
            })
        );
        dispatch(clearPutOrder());
    };

    const confirmReceipt = (orderId) => {
        const confirmDelete = confirm("Xác nhận đã nhận được đơn hàng này?");
        if (!confirmDelete) return;

        dispatch(
            updateOrder({
                data: { status: "delivered" },
                id: orderId,
            })
        );
        dispatch(clearPutOrder());
    };

    const reviewProduct = (orderId) => {
        console.log("Nhận xét");
    };

    if (statusOrder == "loading") {
        return <CirLoading />;
    }

    return (
        <StyledProfileOrder>
            <div className="cancelModal">
                <input type="text" placeholder="Lý do hủy đơn hàng này" />
                <button>Hủy đơn hàng</button>
            </div>
            <div className="tabs">
                {tabs.map((tab) => (
                    <div
                        className={`tabs__item ${
                            activeTab === tab.status ? "active" : ""
                        }`}
                        key={tab.status}
                        onClick={() => setActiveTab(tab.status)}
                    >
                        {tab.text}
                    </div>
                ))}
            </div>
            <div className="search at-c">
                <SearchIcon className="icon" />
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Tìm đơn hàng</button>
            </div>
            <div className="order__list">
                {filteredOrders.map((item) => (
                    <div className="item" key={item.id}>
                        <div
                            className={`status ${
                                statusConvert(item.status).class
                            }`}
                        >
                            {statusConvert(item.status).text}
                        </div>
                        <Grid
                            container
                            columnSpacing={3}
                            className="info d-flex"
                            style={{
                                paddingTop: "12px",
                                justifyContent: "space-between",
                            }}
                        >
                            <Grid item xs={9} className="d-flex">
                                <div
                                    style={{
                                        fontSize: "15px",
                                    }}
                                >
                                    <p>
                                        Giao tới:{" "}
                                        <b>{item.address.address_info}</b>
                                    </p>
                                    <p>
                                        Ngày đặt hàng:{" "}
                                        {formatDate(item.created_at)}
                                    </p>
                                    <p>
                                        Ngày giao dự kiến:{" "}
                                        {calculateDeliveryDate(item.created_at)}
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <p
                                    style={{
                                        fontSize: "15px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>Tổng tiền: </span>
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {item?.total_amount?.toLocaleString()}đ
                                    </span>
                                </p>
                            </Grid>
                        </Grid>
                        <div className="detail open">
                            {item.order_details.map((detail) => (
                                <div className="detail__item" key={detail.id}>
                                    <div className="img">
                                        <img
                                            className="img-c"
                                            src="https://salt.tikicdn.com/cache/280x280/ts/product/88/5b/7f/1096df0853ef100b427ff58a032c3bdc.jpg.webp"
                                            alt=""
                                        />
                                    </div>
                                    <div className="info">
                                        <p className="name">
                                            {truncateString(
                                                detail.product.name,
                                                100
                                            )}
                                        </p>
                                        <div
                                            className="jc-sb"
                                            style={{ marginTop: "8px" }}
                                        >
                                            <p className="quantity">
                                                SL: x{detail.product.quantity}
                                            </p>
                                            <p className="price">
                                                {detail?.product?.price.toLocaleString()}
                                                đ
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="actions">
                            {item.status === "pending" ||
                            item.status === "processing" ? (
                                <button
                                    className="btn cancelled"
                                    onClick={() => cancelOrder(item.id)}
                                >
                                    Hủy
                                </button>
                            ) : item.status === "shipping" ? (
                                <button
                                    className="btn receipt"
                                    onClick={() => confirmReceipt(item.id)}
                                >
                                    Đã nhận được hàng
                                </button>
                            ) : item.status === "delivered" ? (
                                <button
                                    className="btn review"
                                    onClick={() => reviewProduct(item.id)}
                                >
                                    Nhận xét
                                </button>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </StyledProfileOrder>
    );
}
