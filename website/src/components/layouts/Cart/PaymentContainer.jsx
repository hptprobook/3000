"use client";
import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CartContext } from "@/provider/CartContext";
import Link from "next/link";

const StyledPaymentContainer = styled("div")(() => ({
    position: "sticky",
    top: "12px",
    width: "100%",
    backgroundColor: "#fff",
    padding: "20px",
    "& .temp": {
        paddingBottom: "20px",
        borderBottom: "1px solid black",
    },
    "& .total": {
        paddingTop: "12px",
    },
    "& button": {
        width: "100%",
        height: "40px",
        backgroundColor: "#ff424e",
        color: "#fff",
        marginTop: "20px",
        border: "none",
        outline: " none",
        borderRadius: "5px",
        fontSize: "15px",
        fontWeight: "500",
        cursor: "pointer",
        "&:hover": {
            opacity: 0.8,
        },
    },
}));

export default function PaymentContainer() {
    const { quantity, totalPrice, cartItemIds } = useContext(CartContext);
    const router = useRouter();

    const handleOrder = (e) => {
        // e.preventDefault();
    };

    const query = {
        cartItemIds: JSON.stringify(cartItemIds),
        totalPrice: totalPrice.toString(),
    };

    return (
        <StyledPaymentContainer>
            <div className="temp jc-sb">
                <p>Tạm tính</p>
                <p>{totalPrice.toLocaleString()}đ</p>
            </div>
            <div className="total jc-sb">
                <p>Tổng tiền</p>
                <div>
                    <p
                        className="float-end"
                        style={{
                            fontSize: "20px",
                            color: "#ff424e",
                        }}
                    >
                        {totalPrice.toLocaleString()}đ
                    </p>
                    <p
                        style={{
                            marginTop: "4px",
                            fontSize: "13px",
                        }}
                    >
                        ( Đã bao gồm thuế VAT )
                    </p>
                </div>
            </div>
            <Link onClick={handleOrder} href={{ pathname: "/order", query }}>
                <button>Mua hàng ({quantity})</button>
            </Link>
        </StyledPaymentContainer>
    );
}
