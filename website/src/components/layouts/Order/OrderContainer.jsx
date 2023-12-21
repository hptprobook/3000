"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import EmptyData from "@/components/common/Middleware/EmptyData";

const StyledOrderContainer = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginRight: "12px",
    "& .order-detail": {
        border: "1px solid #dddde3",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "12px",
        "& .order-detail__item": {
            margin: "12px 0",
            padding: "12px 0",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #dddde3",
            "&:last-child": {
                borderBottom: "none",
            },
            "& .img": {
                width: "48px",
                height: "48px",
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
}));

export default function OrderContainer({ data }) {
    if (!data || data.length === 0) {
        return <EmptyData text={"Không có sản phẩm nào được chọn"} />;
    }

    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    return (
        <StyledOrderContainer>
            <h4>Đơn hàng</h4>
            <div className="order-detail">
                {data?.map((item) => (
                    <div className="order-detail__item" key={item.id}>
                        <div className="img">
                            <img
                                className="img-c"
                                src={item.product.thumbnail}
                                alt={item.product.name}
                            />
                        </div>
                        <div className="info">
                            <p className="name">
                                {truncateString(item.product.name, 55)}
                            </p>
                            <div className="jc-sb" style={{ marginTop: "8px" }}>
                                <p className="quantity">SL: x{item.quantity}</p>
                                <p className="price">
                                    {item.price.toLocaleString()}đ
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </StyledOrderContainer>
    );
}
