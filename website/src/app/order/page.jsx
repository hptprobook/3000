"use client";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import AddressCheckout from "@/components/layouts/Order/AddressCheckout";
import Checkout from "@/components/layouts/Order/Checkout";
import OrderContainer from "@/components/layouts/Order/OrderContainer";
import OrderCoupon from "@/components/layouts/Order/OrderCoupon";
import { CouponProvider } from "@/provider/CouponContext";
import {
    OrderAddressProvider,
    useOrderAddressContext,
} from "@/provider/OrderAddressContext";
import { getAddresses } from "@/redux/slices/addressSlice";
import { fetchWithIds } from "@/redux/slices/cartSlice";
import { getFee } from "@/redux/slices/deliverySlice";
import { Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderPage() {
    const searchParams = useSearchParams();
    const [cartItemIds, setCartItemIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { setAddressesList, selectedAddress } = useOrderAddressContext();

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

    const dispatch = useDispatch();
    const cartWithIds = useSelector((state) => state.carts.cartWithIds);
    let totalHeight = 0,
        totalWeight = 0,
        totalWidth = 0,
        totalLength = 0;

    cartWithIds.forEach((item) => {
        totalHeight += item.product.height || 0;
        totalWeight += item.product.weight || 0;
        totalWidth += item.product.width || 0;
        totalLength += item.product.length || 0;
    });

    const cartStatus = useSelector((state) => state.carts.status);

    const addresses = useSelector((state) => state.addresses);
    const addressFetchStatus = useSelector((state) => state.addresses.status);
    const fee = useSelector((state) => state.deliveries);
    const targetAddress =
        selectedAddress ??
        addresses.addresses?.find((address) => address.default === 1);

    useEffect(() => {
        if (addressFetchStatus == "idle") {
            dispatch(getAddresses());
        }
        setAddressesList(addresses.addresses);
    }, [addressFetchStatus]);

    const feeData = {
        service_id: 53320,
        insurance_value: parseFloat(totalPrice),
        coupon: null,
        from_district_id: 1552,
        to_district_id: targetAddress?.district_id,
        to_ward_code: targetAddress?.ward_id.toString(),
        height: totalHeight,
        length: totalLength,
        weight: totalWeight,
        width: totalWidth,
    };

    useEffect(() => {
        if (targetAddress && cartWithIds) {
            dispatch(getFee(feeData));
        }
    }, [targetAddress, cartWithIds]);

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
        return <ProgressLoading />;
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
                        <CouponProvider>
                            <OrderCoupon />
                            <Checkout
                                totalPrice={totalPrice}
                                fee={fee?.fee?.data?.total}
                                cartItemIds={cartItemIds}
                                addresses={addresses.addresses}
                            />
                        </CouponProvider>
                    </Grid>
                </Grid>
            </div>
            <div
                style={{
                    width: "100%",
                    padding: "0 300px",
                    margin: "0 auto",
                    backgroundColor: "#fff",
                }}
            >
                <HomeFooter />
            </div>
        </>
    );
}
