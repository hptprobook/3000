"use client";
import React, { useState } from "react";
import CartContainer from "@/components/layouts/Cart/CartContainer";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { Grid } from "@mui/material";

export default function Cart() {
    return (
        <>
            <Breadcrumb />
            <div className="appContainer__cart">
                <Grid container spacing={2.5}>
                    <Grid item xs={9}>
                        <h3>GIỎ HÀNG</h3>
                        <CartContainer />
                    </Grid>
                    <Grid item xs={3}>
                        Thanh toán
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
