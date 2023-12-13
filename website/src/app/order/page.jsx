"use client";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import AddressCheckout from "@/components/layouts/Order/AddressCheckout";
import Checkout from "@/components/layouts/Order/Checkout";
import OrderContainer from "@/components/layouts/Order/OrderContainer";
import OrderCoupon from "@/components/layouts/Order/OrderCoupon";
import { getAddresses } from "@/redux/slices/addressSlice";
import { fetchWithIds } from "@/redux/slices/cartSlice";
import { Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderPage() {
    const searchParams = useSearchParams();
    const [cartItemIds, setCartItemIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartItemIds = searchParams.get("cartItemIds");
        const totalPrice = searchParams.get("totalPrice");

        let parsedCartItemIds = [];
        try {
            parsedCartItemIds = cartItemIds ? JSON.parse(cartItemIds) : [];
        } catch (e) {
            console.error("Error parsing cartItemIds:", e);
        }

        setCartItemIds(parsedCartItemIds);
        setTotalPrice(totalPrice);
    }, [searchParams]);

    const addressFake = [
        {
            id: 5,
            user_id: 14,
            name: "Nguyen Van A",
            phone: "0123456789",
            district_id: 30,
            province_id: 13,
            ward_id: 12,
            address_info: "123 Phố Xanh",
            default: 0,
            ward: null,
        },
        {
            id: 6,
            user_id: 14,
            name: "Phan Thanh Hóa",
            phone: "0833129021",
            district_id: 30,
            province_id: 13,
            ward_id: 31,
            address_info: "45/19 Nguyễn Viết Xuân",
            default: 1,
            ward: {
                id: 31,
                name: "Giảng Võ",
                type: "phuong",
                slug: "giang-vo",
                name_with_type: "Phường Giảng Võ",
                path: "Giảng Võ, Ba Đình, Hà Nội",
                path_with_type:
                    "Phường Giảng Võ, Quận Ba Đình, Thành phố Hà Nội",
                code: "00031",
                parent_code: "001",
            },
        },
        {
            id: 7,
            user_id: 14,
            name: "Phan Thanh Hóa",
            phone: "0833129021",
            district_id: null,
            province_id: null,
            ward_id: 34,
            address_info: "45/19 Nguyễn Viết Xuân",
            default: 0,
            ward: {
                id: 34,
                name: "Thành Công",
                type: "phuong",
                slug: "thanh-cong",
                name_with_type: "Phường Thành Công",
                path: "Thành Công, Ba Đình, Hà Nội",
                path_with_type:
                    "Phường Thành Công, Quận Ba Đình, Thành phố Hà Nội",
                code: "00034",
                parent_code: "001",
            },
        },
        {
            id: 8,
            user_id: 14,
            name: "Phan Thanh Hóa",
            phone: "0833129021",
            district_id: null,
            province_id: null,
            ward_id: 37,
            address_info: "45/19 Nguyễn Viết Xuân",
            default: 0,
            ward: {
                id: 37,
                name: "Phúc Tân",
                type: "phuong",
                slug: "phuc-tan",
                name_with_type: "Phường Phúc Tân",
                path: "Phúc Tân, Hoàn Kiếm, Hà Nội",
                path_with_type:
                    "Phường Phúc Tân, Quận Hoàn Kiếm, Thành phố Hà Nội",
                code: "00037",
                parent_code: "002",
            },
        },
    ];

    const dispatch = useDispatch();
    const cartWithIds = useSelector((state) => state.carts.cartWithIds);
    const cartStatus = useSelector((state) => state.carts.status);

    const addresses = useSelector((state) => state.addresses);
    const addressFetchStatus = useSelector((state) => state.addresses.status);

    useEffect(() => {
        if (addressFetchStatus == "idle") {
            dispatch(getAddresses());
        }
    }, [addressFetchStatus]);

    useEffect(() => {
        if (cartItemIds.length > 0) {
            dispatch(
                fetchWithIds({
                    cart_item_ids: cartItemIds,
                })
            );
        }
    }, [cartItemIds]);

    if (cartStatus == "loading" || addressFetchStatus == "loading") {
        return <CirLoading />;
    }

    return (
        <>
            <div>
                <h4 style={{ width: "var(--max-width)", margin: "20px auto" }}>
                    THANH TOÁN
                </h4>
            </div>
            <div className="appContainer__checkout">
                <Grid container>
                    <Grid item xs={9}>
                        <OrderContainer data={cartWithIds} />
                    </Grid>
                    <Grid item xs={3}>
                        <AddressCheckout data={addresses.addresses} />
                        <OrderCoupon />
                        <Checkout totalPrice={totalPrice} />
                    </Grid>
                </Grid>
            </div>
            <HomeFooter />
        </>
    );
}
