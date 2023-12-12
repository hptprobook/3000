"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ProfileEditAddress from "@/components/layouts/Profile/ProfileAddress/ProfileEditAddress";

const theme = createTheme({
    typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    },
});

export default function EditAddressPage() {
    return (
        <ThemeProvider theme={theme}>
            <ProfileEditAddress />
        </ThemeProvider>
    );
}
