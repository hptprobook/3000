"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
            borderBottom: "1px solid #888",
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
    },
}));

export default function ProfileOrder({ data }) {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDetails, setShowDetails] = useState({});

    const statusConvert = (status) => {
        const statusConvertion = {
            pending: "Chờ thanh toán",
            processing: "Đang xử lý",
            delivering: "Đang giao hàng",
            received: "Đã nhận hàng",
            cancelled: "Đã hủy",
            all: "Tất cả",
        };

        return statusConvertion[status] || status;
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

    const toggleDetails = (orderId) => {
        setShowDetails((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    const tabs = [
        { status: "all", text: "Tất cả" },
        { status: "pending", text: "Chờ thanh toán" },
        { status: "processing", text: "Đang xử lý" },
        { status: "delivering", text: "Đang giao hàng" },
        { status: "received", text: "Đã nhận hàng" },
        { status: "cancelled", text: "Đã hủy" },
    ];

    const filterOrders = () => {
        return data?.filter((order) => {
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
    };

    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    return (
        <StyledProfileOrder>
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
                {filterOrders().map((item) => (
                    <div className="item" key={item.id}>
                        <div className="status">
                            {statusConvert(item.status)}
                        </div>
                        <div
                            className="info d-flex"
                            style={{
                                paddingTop: "12px",
                                justifyContent: "space-between",
                            }}
                        >
                            <div className="d-flex">
                                <div>
                                    <p>Giao tới: {item.address.address_info}</p>
                                    <p>
                                        Ngày đặt hàng:{" "}
                                        {formatDate(item.created_at)}
                                    </p>
                                    <p>
                                        Ngày giao dự kiến:{" "}
                                        {calculateDeliveryDate(item.created_at)}
                                    </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    alignItems: "flex-end",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <p>
                                    Tổng tiền:{" "}
                                    {item?.total_amount?.toLocaleString()}đ
                                </p>
                                <span
                                    className="mt-12"
                                    onClick={() => toggleDetails(item.id)}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    {showDetails[item.id] ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`detail ${
                                showDetails[item.id] ? "open" : ""
                            }`}
                        >
                            {showDetails[item.id] &&
                                item.order_details.map((detail) => (
                                    <div
                                        className="detail__item"
                                        key={detail.id}
                                    >
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
                                                    SL: x
                                                    {detail.product.quantity}
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
                    </div>
                ))}

                {/* {filterOrders().map((order) => (
                    <div key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <ul>
                            {order.order_details.map((detail) => (
                                <li key={detail.id}>{detail.product.name}</li>
                            ))}
                        </ul>
                    </div>
                ))} */}
            </div>
        </StyledProfileOrder>
    );
}
