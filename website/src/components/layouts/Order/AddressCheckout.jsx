"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useOrderAddressContext } from "@/provider/OrderAddressContext";

const StyledAddressCheckout = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginLeft: "12px",
}));

export default function AddressCheckout({ data }) {
    if (!data) {
        return <div>Cõ lỗi xảy ra</div>;
    }
    const { selectAddress, selectedAddress } = useOrderAddressContext();

    let defaultAddress = "";

    if (data.length > 0) {
        defaultAddress =
            selectedAddress || data?.find((address) => address.default === 1);
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
            {defaultAddress ? (
                <>
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
                </>
            ) : (
                <>
                    <p
                        style={{
                            marginTop: "8px",
                            fontSize: "13px",
                        }}
                    >
                        Bạn chưa có địa chỉ giao hàng?
                    </p>
                    <Link
                        href={{
                            pathname: "/profile/address/create",
                            query: {
                                isOrder: true,
                            },
                        }}
                        style={{
                            marginTop: "8px",
                            color: "var(--link-color)",
                            fontSize: "13px",
                        }}
                    >
                        Thêm địa chỉ giao hàng
                    </Link>
                </>
            )}
        </StyledAddressCheckout>
    );
}
