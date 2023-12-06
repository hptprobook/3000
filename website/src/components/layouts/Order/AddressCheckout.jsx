"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import LoginForm from "@/components/common/TextField/Login/LoginForm";
import AutoComplete from "@/components/common/AutoComplete/AutoComplete";

const StyledAddressCheckout = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginLeft: "12px",
}));

export default function AddressCheckout({ provinces }) {
    return (
        <StyledAddressCheckout>
            <h4>Thông tin giao hàng</h4>
            <Grid container spacing={1.5}>
                <Grid item xs={6}>
                    <LoginForm type={"text"} label={"Họ và tên"} />
                </Grid>
                <Grid item xs={6}>
                    <LoginForm type={"number"} label={"Số điện thoại"} />
                </Grid>
                <Grid item xs={6}>
                    <AutoComplete data={provinces} label={"Tỉnh"} />
                </Grid>
                <Grid item xs={6}>
                    <AutoComplete data={provinces} label={"Huyện"} />
                </Grid>
                <Grid item xs={6}>
                    <AutoComplete data={provinces} label={"Phường / Xã"} />
                </Grid>
                <Grid item xs={6}>
                    <LoginForm type={"text"} label={"Đường"} mt="0" />
                </Grid>
                <Grid item xs={12}>
                    <LoginForm type={"text"} label={"Ghi chú cho đơn hàng"} />
                </Grid>
            </Grid>
        </StyledAddressCheckout>
    );
}
