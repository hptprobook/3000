"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useOrderAddressContext } from "@/provider/OrderAddressContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAddresses } from "@/redux/slices/addressSlice";
import { useDispatch, useSelector } from "react-redux";

const StyledOrderAddress = styled("div")(({ isDefault = false }) => ({
    marginTop: "24px",
    width: "100%",
    "& .container": {
        marginTop: "12px",
        "& .address_item": {
            padding: "12px",
            backgroundColor: "#fff",
            border: !isDefault ? "1px dashed #009900" : "1px solid #ddd",
            borderRadius: "3px",
            "& .address_info": {
                marginTop: "8px",
                fontSize: "14px",
                color: "#5a5d5a",
                height: "40px",
            },
            "& .phone": {
                marginTop: "4px",
                fontSize: "14px",
                color: "#5a5d5a",
            },
            "& .button": {
                marginTop: "8px",
                width: "200px",
                height: "32px",
                backgroundColor: "#00b6f0",
                color: "#fff",
                border: "1px solid #029fd1",
                borderRadius: "3px",
                cursor: "pointer",
                "&:hover": {
                    opacity: 0.9,
                },
            },
        },
    },
}));

export default function OrderAddress() {
    const { selectAddress, addressesList } = useOrderAddressContext();
    const router = useRouter();
    const dispatch = useDispatch();
    const addressRedux = useSelector((state) => state.addresses.addresses);

    const [addresses, setAddresses] = useState(addressRedux);

    useEffect(() => {
        if (addressesList.length === 0) {
            dispatch(getAddresses());
        } else {
            setAddresses(addressesList);
        }
    }, []);

    const handleSelectAddress = (address) => {
        selectAddress(address);
        router.back();
    };

    function isDefaultAddress(address) {
        return address.default === 1;
    }

    return (
        <div className="appContainer__orderAddress">
            <StyledOrderAddress>
                <h4>Địa chỉ giao hàng</h4>
                <p className="mt-12" style={{ fontSize: 14 }}>
                    Chọn địa chỉ giao hàng có sẵn bên dưới
                </p>
                <Grid container className="container" spacing={3}>
                    {addresses?.map((address) => (
                        <Grid item xs={6} key={address.id}>
                            <div
                                className="address_item"
                                style={{
                                    border: isDefaultAddress(address)
                                        ? "1px dashed #009900"
                                        : "1px solid #ddd",
                                }}
                            >
                                <b className="name">{address.name}</b>
                                <p className="address_info">
                                    Địa chỉ: {address.address_info}
                                </p>
                                <p className="phone">
                                    Điện thoại: {address.phone}
                                </p>
                                <button
                                    className="button"
                                    onClick={() => handleSelectAddress(address)}
                                >
                                    Giao đến địa chỉ này
                                </button>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <div
                    style={{
                        marginTop: "20px",
                    }}
                >
                    <Link
                        href={{
                            pathname: "/profile/address/create",
                        }}
                        style={{ color: "var(--link-color)" }}
                    >
                        Thêm địa chỉ mới
                    </Link>
                </div>
            </StyledOrderAddress>
        </div>
    );
}
