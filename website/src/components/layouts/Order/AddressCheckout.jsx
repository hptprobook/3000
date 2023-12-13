"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const StyledAddressCheckout = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginLeft: "12px",
}));

export default function AddressCheckout({ data }) {
    console.log(
        "🚀 ~ file: AddressCheckout.jsx:14 ~ AddressCheckout ~ data:",
        data
    );
    let defaultAddress = "";

    if (data.length > 0) {
        defaultAddress = data?.find((address) => address.default === 1);
    }

    return (
        <StyledAddressCheckout>
            <div className="jc-sb">
                <h4>Thông tin giao hàng</h4>
                <Link
                    href={"/order/address"}
                    style={{
                        color: "var(--link-color)",
                        fontSize: "14px",
                    }}
                >
                    Thay đổi
                </Link>
            </div>
            <p
                style={{
                    marginTop: "8px",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#38383d",
                }}
            >
                {defaultAddress.name} | {defaultAddress.phone}
            </p>
            <p
                style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    color: "#808089",
                }}
            >
                {defaultAddress.address_info}
            </p>
        </StyledAddressCheckout>
    );
}
