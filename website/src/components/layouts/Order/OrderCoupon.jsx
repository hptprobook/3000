import React from "react";
import { styled } from "@mui/material/styles";

const StyledOrderCoupon = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginLeft: "12px",
    marginTop: "12px",
    "& .couponInput": {
        marginTop: "10px",
        width: "100%",
        height: "40px",
        border: "1px solid #999",
        borderRadius: "4px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-between",
        "& input": {
            border: "none",
            outline: "none",
            width: "75%",
            height: "100%",
            padding: "0 12px",
        },
        "& button": {
            border: "none",
            outline: "none",
            backgroundColor: "#fff",
            padding: "0 12px",
            borderLeft: "1px solid #999",
            color: "#0a68ff",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#448afa",
                color: "#fff",
            },
        },
    },
}));

export default function OrderCoupon() {
    return (
        <StyledOrderCoupon>
            <h4>Khuyến mãi</h4>
            <div className="couponInput">
                <input
                    type="text"
                    name="coupon"
                    placeholder="Nhập mã giảm giá ... "
                />
                <button>Áp dụng</button>
            </div>
        </StyledOrderCoupon>
    );
}
