"use client";
import React from "react";
import ProfileInfo from "@/components/layouts/Profile/ProfileInfo/ProfileInfo";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    },
});

export default function ProfilePage() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                Thông tin tài khoản
                <ProfileInfo />
            </div>
        </ThemeProvider>
    );
}
