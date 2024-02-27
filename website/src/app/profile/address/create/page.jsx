"use client";
import ProfileCreateAddress from "@/components/layouts/Profile/ProfileAddress/ProfileCreateAddress";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAddressGHN } from "@/redux/slices/addressSlice";
import { useSearchParams } from "next/navigation";

const theme = createTheme({
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
});

export default function CreateAddressPage() {
    const dispatch = useDispatch();
    const params = useSearchParams();
    const isOrder = params.get("isOrder");
    const isOrdered = params.get("isOrdered");

    const addressGHN = useSelector((state) => state.addresses.addressGHN);
    // const addressGHNfetchStatus = useSelector(
    //     (state) => state.addresses.status
    // );

    useEffect(() => {
        dispatch(getAddressGHN());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <ProfileCreateAddress
                provinces={addressGHN}
                isOrder={isOrder}
                isOrdered={isOrdered}
            />
        </ThemeProvider>
    );
}
