"use client";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ProfileEditAddress from "@/components/layouts/Profile/ProfileAddress/ProfileEditAddress";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAddressGHN } from "@/redux/slices/addressSlice";

const theme = createTheme({
    typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    },
});

export default function EditAddressPage() {
    const searchParams = useSearchParams();
    const [addressId, setAddressId] = useState(null);

    useEffect(() => {
        const addressId = searchParams.get("addressId");

        setAddressId(addressId);
    }, [searchParams]);

    const dispatch = useDispatch();
    // const addressById = useSelector((state) => state.addresses.addressById);
    // const addressFetchStatus = useSelector((state) => state.addresses.status);

    // useEffect(() => {
    //     if (addressId) {
    //         dispatch(getAddressById(addressId));
    //     }
    // }, []);

    const addressGHN = useSelector((state) => state.addresses.addressGHN);
    // const addressGHNfetchStatus = useSelector(
    //     (state) => state.addresses.status
    // );

    useEffect(() => {
        dispatch(getAddressGHN());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <ProfileEditAddress data={addressId} provinces={addressGHN} />
        </ThemeProvider>
    );
}
