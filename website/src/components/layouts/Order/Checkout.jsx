import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const StyledCheckout = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginLeft: "12px",
    marginTop: "12px",
    "& .checkout_head": {
        marginTop: "6px",
    },
}));

export default function Checkout({ totalPrice }) {
    return (
        <StyledCheckout>
            <div className="checkout_head jc-sb">
                <h4>Đơn hàng</h4>
                <Link
                    href={"/cart"}
                    style={{ color: "var(--link-color)", fontSize: "14px" }}
                >
                    Thay đổi
                </Link>
            </div>
            <div className="jc-sb mt-12">
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    Tạm tính
                </p>
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    {Number(totalPrice).toLocaleString()}đ
                </p>
            </div>
            <div className="jc-sb mt-6">
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    Phí vận chuyển
                </p>
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    0đ
                </p>
            </div>
            <div className="jc-sb mt-6">
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    Giảm giá
                </p>
                <span
                    style={{
                        fontSize: "14px",
                        color: "#00ab56",
                    }}
                >
                    0đ
                </span>
            </div>
            <div
                className="totalPrice jc-sb mt-12"
                style={{
                    borderTop: "1px solid #999",
                    paddingTop: "12px",
                }}
            >
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    Tổng tiền
                </p>
                <span
                    style={{
                        color: "#ff424e",
                        fontSize: "20px",
                        fontWeight: "500",
                    }}
                >
                    3.000.000đ
                </span>
            </div>
            <button
                style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "6px",
                    marginTop: "12px",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#ff424e",
                    fontSize: "16px",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    cursor: "pointer",
                    color: "#fff",
                }}
            >
                Đặt hàng
            </button>
        </StyledCheckout>
    );
}
