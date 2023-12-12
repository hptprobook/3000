"use client";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ProfileEditAddress from "@/components/layouts/Profile/ProfileAddress/ProfileEditAddress";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAddressById } from "@/redux/slices/addressSlice";

const theme = createTheme({
    typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    },
});

export default function EditAddressPage() {
    const searchParams = useSearchParams();
    const [addressId, setAddressId] = useState(0);

    const dispatch = useDispatch();

    const addressById = useSelector((state) => state.addresses.addressById);
    console.log(
        "🚀 ~ file: page.jsx:22 ~ EditAddressPage ~ addressById:",
        addressById
    );
    const addressFetchStatus = useSelector((state) => state.addresses.status);

    useEffect(() => {
        if (addressFetchStatus == "idle" || addressId != 0) {
            dispatch(getAddressById(addressId));
        }
    }, []);

    useEffect(() => {
        const addressId = searchParams.get("addressId");

        setAddressId(addressId);
    }, [searchParams]);

    return (
        <ThemeProvider theme={theme}>
            <ProfileEditAddress />
        </ThemeProvider>
    );
}
