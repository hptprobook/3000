"use client";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCart } from "@/redux/slices/cartSlice";
import PaymentContainer from "@/components/layouts/Cart/PaymentContainer";
import { CartProvider } from "@/provider/CartContext";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import useAuth from "@/hooks/useAuth";
import NotAuth from "@/components/common/Middleware/NotAuth";

const DynamicComponent = dynamic(
    () => import("@/components/layouts/Cart/CartContainer"),
    { ssr: false }
);

export default function Cart() {
    const isAuth = useAuth();

    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.carts.cartList);
    const status = useSelector((state) => state.carts.status);

    useEffect(() => {
        dispatch(fetchAllCart());
    }, []);

    if (status === "loading") {
        return <ProgressLoading />;
    }

    if (!isAuth) {
        return <NotAuth />;
    }

    return (
        <>
            <h3 style={{ maxWidth: "var(--max-width)", margin: "24px auto" }}>
                GIỎ HÀNG
            </h3>
            <div className="appContainer__cart">
                <CartProvider>
                    <Grid
                        container
                        spacing={2.5}
                        style={{
                            minHeight: "600px",
                        }}
                    >
                        <Grid item xs={9}>
                            <DynamicComponent data={cartList.data} />
                        </Grid>
                        <Grid item xs={3}>
                            <PaymentContainer />
                        </Grid>
                    </Grid>
                </CartProvider>
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
