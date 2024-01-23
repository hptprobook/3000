import React, { useEffect, useState } from "react";
import LoginForm from "../Login/LoginForm";
import LoginButton from "../../Button/LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { forgotPassword as forgotPasswordSlice } from "@/redux/slices/authSlice";

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
});

export default function ForgotPassword() {
    const [isSendMail, setSendMail] = useState(false);

    const dispatch = useDispatch();

    const { loading, error, forgotPassword } = useSelector(
        (state) => state.auth
    );

    console.log("🚀 ~ ForgotPassword ~ loading:", loading);

    const forgotPasswordFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values) => {
            dispatch(forgotPasswordSlice({ email: values.email })).then(() => {
                if (!loading && forgotPassword.message === "success") {
                    console.log("success");
                }
            });
        },
    });

    useEffect(() => {
        if (error && error.status === 500) {
            forgotPasswordFormik.setErrors({
                email: "Có lỗi trong quá trình xử lý hoặc email không tồn tại, vui lòng thử lại sau.",
            });
        }
    }, [error]);

    return (
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
    );
}
