import React, { useEffect, useState } from "react";
import LoginForm from "../Login/LoginForm";
import LoginButton from "../../Button/LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import {
    forgotPassword as forgotPasswordSlice,
    resetPassword as resetPasswordSlice,
    verifyToken as verifyTokenSlice,
} from "@/redux/slices/authSlice";

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
});

const inputTokenSchema = Yup.object().shape({
    token: Yup.string()
        .required("Mã xác nhận không được để trống")
        .max(6, "Mã xác nhận không vượt quá 6 ký tự")
        .min(6, "Mã xác nhận gồm 6 ký tự"),
});

const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required("Mật khẩu không được để trống")
        .max(64, "Mật khẩu không vượt quá 64 ký tự")
        .min(6, "Mật khẩu không ít hơn 6 ký tự"),
    confirmNewPassword: Yup.string()
        .required("Trường không được để trống")
        .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không trùng khớp"),
});

export default function ForgotPassword({ setCurrentForm }) {
    const [isSendMail, setSendMail] = useState(false);
    const [isSubmitToken, setSubmitToken] = useState(false);

    const dispatch = useDispatch();

    const { error, forgotPassword, verifyToken, resetPassword } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (forgotPassword?.message === "success") {
            setSendMail(true);
            toast.info("Vui lòng kiểm tra email!");
        }
    }, [forgotPassword]);

    useEffect(() => {
        if (verifyToken?.message === "success") {
            setSubmitToken(true);
            toast.success("Xác nhận thành công", {
                autoClose: 2000,
            });
        }
    }, [verifyToken]);

    useEffect(() => {
        if (resetPassword?.message === "success") {
            setSubmitToken(true);
            toast.success("Đặt lại mật khẩu thành công!", {
                autoClose: 2000,
            });
            setCurrentForm("login");
        }
    }, [resetPassword]);

    const forgotPasswordFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values) => {
            dispatch(forgotPasswordSlice({ email: values.email }));
        },
    });

    const submitTokenFormik = useFormik({
        initialValues: {
            token: "",
        },
        validationSchema: inputTokenSchema,
        onSubmit: async (values) => {
            const verifyTokenData = {
                token: values.token,
                email: forgotPasswordFormik?.values?.email,
            };
            dispatch(verifyTokenSlice(verifyTokenData));
        },
    });

    const resetPasswordFormik = useFormik({
        initialValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: async (values) => {
            const resetPasswordData = {
                email: forgotPasswordFormik.values.email,
                password: values.newPassword,
            };
            dispatch(resetPasswordSlice(resetPasswordData));
        },
    });

    useEffect(() => {
        if (error && error.status === 500) {
            forgotPasswordFormik.setErrors({
                email: "Có lỗi trong quá trình xử lý hoặc email không tồn tại, vui lòng thử lại sau.",
            });
        } else if (
            error &&
            error?.data.message === "Token không hợp lệ hoặc đã hết hạn."
        ) {
            submitTokenFormik.setErrors({
                token: "Token không hợp lệ hoặc đã hết hạn.",
            });
        }
    }, [error, forgotPassword]);

    return (
        <>
            {!isSendMail && !isSubmitToken && (
                <form onSubmit={forgotPasswordFormik.handleSubmit}>
                    <LoginForm
                        label={"Nhập email"}
                        type={"email"}
                        name={"email"}
                        value={forgotPasswordFormik.values.email}
                        onBlur={forgotPasswordFormik.handleBlur}
                        onChange={forgotPasswordFormik.handleChange}
                        error={
                            forgotPasswordFormik.touched.email &&
                            Boolean(forgotPasswordFormik.errors.email)
                        }
                        helperText={
                            forgotPasswordFormik.touched.email &&
                            forgotPasswordFormik.errors.email
                        }
                    />
                    <LoginButton text={"Gửi mã xác nhận"} />
                </form>
            )}

            {isSendMail && !isSubmitToken && (
                <form onSubmit={submitTokenFormik.handleSubmit}>
                    <LoginForm
                        label={"Nhập mã xác nhận"}
                        type={"number"}
                        name={"token"}
                        value={submitTokenFormik.values.token}
                        onBlur={submitTokenFormik.handleBlur}
                        onChange={submitTokenFormik.handleChange}
                        error={
                            submitTokenFormik.touched.token &&
                            Boolean(submitTokenFormik.errors.token)
                        }
                        helperText={
                            submitTokenFormik.touched.token &&
                            submitTokenFormik.errors.token
                        }
                    />
                    <LoginButton text={"Xác nhận"} />
                </form>
            )}

            {isSubmitToken && (
                <form onSubmit={resetPasswordFormik.handleSubmit}>
                    <LoginForm
                        label={"Nhập mật khẩu mới"}
                        type={"password"}
                        name={"newPassword"}
                        value={resetPasswordFormik.values.newPassword}
                        onBlur={resetPasswordFormik.handleBlur}
                        onChange={resetPasswordFormik.handleChange}
                        error={
                            resetPasswordFormik.touched.newPassword &&
                            Boolean(resetPasswordFormik.errors.newPassword)
                        }
                        helperText={
                            resetPasswordFormik.touched.newPassword &&
                            resetPasswordFormik.errors.newPassword
                        }
                    />
                    <LoginForm
                        label={"Nhập lại mật khẩu mới"}
                        type={"password"}
                        name={"confirmNewPassword"}
                        value={resetPasswordFormik.values.confirmNewPassword}
                        onBlur={resetPasswordFormik.handleBlur}
                        onChange={resetPasswordFormik.handleChange}
                        error={
                            resetPasswordFormik.touched.confirmNewPassword &&
                            Boolean(
                                resetPasswordFormik.errors.confirmNewPassword
                            )
                        }
                        helperText={
                            resetPasswordFormik.touched.confirmNewPassword &&
                            resetPasswordFormik.errors.confirmNewPassword
                        }
                    />
                    <LoginButton text={"Xác nhận"} />
                </form>
            )}
            <div
                style={{
                    width: "100%",
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Link
                    href={"#"}
                    style={{
                        color: "var(--link-color)",
                    }}
                    onClick={() => setCurrentForm("login")}
                >
                    Đăng nhập
                </Link>
            </div>
        </>
    );
}
