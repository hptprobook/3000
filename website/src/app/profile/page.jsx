"use client";
import React, { useEffect } from "react";
import ProfileInfo from "@/components/layouts/Profile/ProfileInfo/ProfileInfo";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/slices/userSlice";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import useAuth from "@/hooks/useAuth";
import NotAuth from "@/components/common/Middleware/NotAuth";

const theme = createTheme({
    typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    },
});

export default function ProfilePage() {
    const isAuth = useAuth();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.users.status);
    const currentUser = useSelector((state) => state.users.currentUser);

    useEffect(() => {
        if (status === "idle") {
            dispatch(getCurrentUser());
        }
    }, []);

    if (status === "loading") {
        return <ProgressLoading />;
    }

    if (!isAuth) {
        return <NotAuth />;
    }

    return (
        <ThemeProvider theme={theme}>
            <div>
                Thông tin tài khoản
                <ProfileInfo user={currentUser} />
            </div>
        </ThemeProvider>
    );
}
