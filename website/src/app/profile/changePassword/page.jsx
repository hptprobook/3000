"use client";
import { Button, TextField, createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const theme = createTheme({
    typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    },
});

const changePasswordSchema = Yup.object().shape({
    old: Yup.string().required("Bắt buộc"),
    new: Yup.string()
        .min(6, "Ít nhất 6 ký tự")
        .max(128, "Không vượt quá 128 ký tự")
        .required("Bắt buộc"),
    renew: Yup.string()
        .oneOf([Yup.ref("new"), null], "Mật khẩu không khớp")
        .required("Bắt buộc"),
});

export default function ChangePasswordPage() {
    const dispatch = useDispatch();
    const { changedPassword, error } = useSelector((state) => state.auth);
    const formik = useFormik({
        initialValues: {
            old: "",
            new: "",
            renew: "",
        },
        validationSchema: changePasswordSchema,
        onSubmit: (value, { setSubmitting }) => {
            dispatch(
                changePassword({
                    currentPassword: value.old,
                    newPassword: value.new,
                    confirmPassword: value.renew,
                })
            );

            useRouter().back();

            setSubmitting(false);
        },
    });

    useEffect(() => {
        if (
            error ===
            "The provided password does not match your current password."
        ) {
            formik.setErrors({ old: "Mật khẩu hiện tại không chính xác" });
        }
    }, [error, formik.setErrors]);

    useEffect(() => {
        if (
            changePassword &&
            changedPassword?.message === "Password changed successfully"
        ) {
            toast.success("Đổi mật khẩu thành công");
        }
    }, [changedPassword]);

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name="old"
                    type="password"
                    label="Nhập mật khẩu hiện tại"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={formik.touched.old && formik.errors.old}
                    error={formik.touched.old && Boolean(formik.errors.old)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="new"
                    type="password"
                    label="Nhập mật khẩu mới"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={formik.touched.new && formik.errors.new}
                    error={formik.touched.new && Boolean(formik.errors.new)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="renew"
                    type="password"
                    label="Nhập lại mật khẩu mới"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={formik.touched.renew && formik.errors.renew}
                    error={formik.touched.renew && Boolean(formik.errors.renew)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Đổi Mật Khẩu
                </Button>
            </form>
        </ThemeProvider>
    );
}
