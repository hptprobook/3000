"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";

const StyledProductDetailMain = styled("div")(({ isMore }) => ({
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "15px",
    marginTop: "12px",
    "& .detail": {
        overflow: "hidden",
        height: isMore ? "auto" : "200px",
        position: "relative",
        marginTop: "12px",
        color: "#474747",
        "& p": {
            padding: "4px 0",
        },
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "50%",
            background: !isMore
                ? "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 1))"
                : "transparent",
            width: "100%",
            zIndex: 1,
        },
    },
}));

export default function ProductDetailMain({ data }) {
    const [isMore, setIsMore] = useState(false);
    const toggleDetailHeight = () => {
        setIsMore(!isMore);
    };

    return (
        <StyledProductDetailMain isMore={isMore}>
            <h4>Chi tiết sản phẩm</h4>
            <div
                className="detail"
                dangerouslySetInnerHTML={{ __html: data ? data : "" }}
            />
            <div
                onClick={toggleDetailHeight}
                style={{
                    zIndex: "9999999",
                    width: "100%",
                    height: "40px",
                    backgroundColor: "#fff",
                    textAlign: "center",
                    color: "var(--link-color)",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginTop: "12px",
                }}
            >
                {isMore ? "Thu gọn" : "Xem thêm ..."}
            </div>
        </StyledProductDetailMain>
    );
}
