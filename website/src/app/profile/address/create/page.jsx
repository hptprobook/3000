"use client";
import ProfileCreateAddress from "@/components/layouts/Profile/ProfileAddress/ProfileCreateAddress";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    },
});

export default function CreateAddressPage() {
    return (
        <ThemeProvider theme={theme}>
            <ProfileCreateAddress />
        </ThemeProvider>
    );
}
