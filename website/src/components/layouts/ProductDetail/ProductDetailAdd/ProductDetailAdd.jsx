"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useVariantSelection } from "@/hooks/useVariantSelection";

const StyledProductDetailAdd = styled("div")(() => ({
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "15px",
    position: "sticky",
    top: "12px",
    "& button": {
        fontFamily: "var(--font-family)",
    },
    "& .quantity-handle": {
        marginTop: "12px",
        display: "flex",
        alignItems: "center",
        "& button": {
            fontSize: "20px",
            width: "32px",
            height: "32px",
            borderRadius: "3px",
            color: "#9a9a9a",
            backgroundColor: "#fff",
            border: "1px solid #d7d7d7",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#d7d7d7",
            },
        },
        "& input": {
            width: "44px",
            height: "32px",
            border: "1px solid #d7d7d7",
            borderRadius: "3px",
            margin: "0 4px",
            outline: "none",
            textAlign: "center",
            fontWeight: "600",
        },
    },
    "& .price": {
        marginTop: "12px",
        "& p": {
            position: "relative",
            fontSize: "24px",
            fontWeight: "600",
            letterSpacing: "-0.5px",
            "&::after": {
                content: '"₫"',
                position: "absolute",
                top: "-4px",
                fontSize: "18px",
            },
        },
    },
    "& .buy-now": {
        width: "100%",
        height: "40px",
        borderRadius: "4px",
        backgroundColor: "var(--span-color)",
        border: "none",
        marginTop: "12px",
        color: "#fff",
        fontSize: "16px",
        outline: "none",
        cursor: "pointer",
        "&:hover": {
            opacity: 0.8,
        },
    },
    "& .add-to-cart": {
        width: "100%",
        height: "40px",
        borderRadius: "4px",
        backgroundColor: "#fff",
        border: "1px solid var(--link-color)",
        marginTop: "8px",
        color: "var(--link-color)",
        fontSize: "16px",
        outline: "none",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "var(--link-color)",
            color: "#fff",
        },
    },
}));

export default function ProductDetailAdd() {
    const [quantity, setQuantity] = useState(1);
    const incrementQuantity = () => {
        if (quantity < 100) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const formatPriceToVND = (price) => {
        return price.toLocaleString("vi-VN");
    };

    return (
        <StyledProductDetailAdd>
            <div className="variant">
                <span> 4 tầng</span>,<span> Đỏ</span>
            </div>
            <h5 style={{ marginTop: "12px" }}>Số lượng</h5>
            <div className="quantity-handle">
                <button onClick={decrementQuantity}>-</button>
                <input
                    type="number"
                    min={1}
                    max={100}
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(
                            Math.max(1, Math.min(100, Number(e.target.value)))
                        )
                    }
                />
                <button onClick={incrementQuantity}>+</button>
            </div>
            <h5 style={{ marginTop: "12px" }}>Tạm tính</h5>
            <div className="price">
                <p>{formatPriceToVND(30000000)}</p>
            </div>
            <button className="buy-now">Mua ngay</button>
            <button className="add-to-cart">Thêm vào giỏ hàng</button>
        </StyledProductDetailAdd>
    );
}
