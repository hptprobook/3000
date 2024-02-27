"use client";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import NotAuth from "@/components/common/Middleware/NotAuth";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import AddressCheckout from "@/components/layouts/Order/AddressCheckout";
import Checkout from "@/components/layouts/Order/Checkout";
import OrderContainer from "@/components/layouts/Order/OrderContainer";
import OrderCoupon from "@/components/layouts/Order/OrderCoupon";
import PaymentMethod from "@/components/layouts/Order/PaymentMethod";
import useAuth from "@/hooks/useAuth";
import { CouponProvider } from "@/provider/CouponContext";
import { useOrderAddressContext } from "@/provider/OrderAddressContext";
import { PaymentMethodProvider } from "@/provider/PaymentMethodContext";
import { getAddresses } from "@/redux/slices/addressSlice";
import { fetchWithIds } from "@/redux/slices/cartSlice";
import { getFee, getService } from "@/redux/slices/deliverySlice";
import { Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderPage() {
    const isAuth = useAuth();
    const searchParams = useSearchParams();
    const [cartItemIds, setCartItemIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { setAddressesList, selectedAddress } = useOrderAddressContext();

    function isPlainObject(obj) {
        return typeof obj === "object" && obj !== null && !Array.isArray(obj);
    }

    useEffect(() => {
        const cartItemIds = searchParams.get("cartItemIds");
        const totalPrice = searchParams.get("totalPrice");

        let parsedCartItemIds = [];
        try {
            parsedCartItemIds = cartItemIds ? JSON.parse(cartItemIds) : [];
        } catch (e) {
            //
        }

        setCartItemIds(parsedCartItemIds);
        setTotalPrice(totalPrice);
    }, [searchParams]);

    const dispatch = useDispatch();
    const cartWithIds = useSelector((state) => state.carts.cartWithIds);
    let totalHeight = 1,
        totalWeight = 500,
        totalWidth = 1,
        totalLength = 1;

    if (Array.isArray(cartWithIds)) {
        cartWithIds?.forEach((item) => {
            totalHeight += item.product.height || 1;
            totalWeight += item.product.weight || 500;
            totalWidth += item.product.width || 1;
            totalLength += item.product.length || 1;
        });
    }

    const cartStatus = useSelector((state) => state.carts.status);

    const addresses = useSelector((state) => state.addresses);
    const addressFetchStatus = useSelector((state) => state.addresses.status);
    const fee = useSelector((state) => state.deliveries);
    const services = useSelector((state) => state.deliveries.services);
    const [serviceId, setServiceId] = useState(0);
    const targetAddress =
        selectedAddress ??
        addresses.addresses?.find((address) => address.default === 1);

    const isTargetAddress = isPlainObject(targetAddress);

    useEffect(() => {
        dispatch(getAddresses());
        setAddressesList(addresses.addresses);
        if (targetAddress) {
            dispatch(
                getService({
                    shop_id: 4689273,
                    from_district: 1552,
                    to_district: targetAddress?.district_id,
                })
            );
        }
    }, [isTargetAddress]);

    useEffect(() => {
        if (services && services.data) {
            setServiceId(services.data[0].service_id);
        }
    }, [services]);

    const feeData = {
        service_id: serviceId,
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
        if (serviceId !== 0) {
            dispatch(getFee(feeData));
        }
    }, [targetAddress, cartWithIds, serviceId]);

    useEffect(() => {
        if (cartItemIds.length > 0) {
            dispatch(
                fetchWithIds({
                    cart_item_ids: cartItemIds,
                })
            );
        }
    }, [cartItemIds]);

    if (!isAuth) {
        return <NotAuth />;
    }

    if (cartStatus === "loading" || addressFetchStatus === "loading") {
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
                <PaymentMethodProvider>
                    <Grid container>
                        <Grid item xs={9}>
                            <OrderContainer data={cartWithIds} />
                            <PaymentMethod />
                        </Grid>
                        <Grid item xs={3}>
                            <AddressCheckout data={addresses?.addresses} />
                            <CouponProvider>
                                <OrderCoupon />
                                <Checkout
                                    totalPrice={totalPrice}
                                    fee={fee?.fee?.data?.total}
                                    cartItemIds={cartItemIds}
                                    addresses={addresses?.addresses}
                                />
                            </CouponProvider>
                        </Grid>
                    </Grid>
                </PaymentMethodProvider>
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
