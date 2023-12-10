"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

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
    "& .order__list": {
        marginTop: "12px",
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "4px",
    },
}));

export default function ProfileOrder({ data }) {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

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
                <div className="item">
                    <div className="status">Đang giao hàng</div>
                    <div className="info jc-sb">
                        <div className="d-flex">
                            <div>1</div>
                            <div>
                                <p>Giao tới: 123 Phố Xanh</p>
                                <p>Ngày đặt hàng: 2023-12-04</p>
                                <p>Ngày giao dự kiến: 2023-16-04</p>
                            </div>
                        </div>
                        <div>Tổng tiền: 30.000.000đ</div>
                    </div>
                </div>
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
