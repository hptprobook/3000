import { useFormik } from "formik";
import React, { useEffect } from "react";
import LoginForm from "../Login/LoginForm";
import * as Yup from "yup";
import LoginButton from "../../Button/LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/slices/authSlice";

const registerSchema = Yup.object().shape({
    name: Yup.string()
        .required("Tên người dùng là bắt buộc")
        .min(5, "Tên phải có ít nhất 5 ký tự")
        .max(50, "Tên không được quá 50 ký tự"),
    email: Yup.string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
    password: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: Yup.string()
        .required("Trường không được để trống")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
});

export default function SignupForm() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await dispatch(
                register({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                })
            );
            setSubmitting(false);
        },
    });

    useEffect(() => {
        if (error) {
            registerFormik.setErrors({ email: "Tên tài khoản đã tồn tại" });
        }
    }, [error, registerFormik.setErrors]);

    return (
        <form onSubmit={registerFormik.handleSubmit}>
            <LoginForm
                label={"Tên người dùng"}
                type={"text"}
                name={"name"}
                value={registerFormik.values.name}
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                error={
                    registerFormik.touched.name &&
                    Boolean(registerFormik.errors.name)
                }
                helperText={
                    registerFormik.touched.name && registerFormik.errors.name
                }
            />
            <LoginForm
                label={"Email"}
                type={"text"}
                name={"email"}
                value={registerFormik.values.email}
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                error={
                    registerFormik.touched.email &&
                    Boolean(registerFormik.errors.email)
                }
                helperText={
                    registerFormik.touched.email && registerFormik.errors.email
                }
            />
            <LoginForm
                label={"Mật khẩu"}
                type={"password"}
                name={"password"}
                value={registerFormik.values.password}
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                error={
                    registerFormik.touched.password &&
                    Boolean(registerFormik.errors.password)
                }
                helperText={
                    registerFormik.touched.password &&
                    registerFormik.errors.password
                }
            />
            <LoginForm
                label={"Nhập lại mật khẩu"}
                type={"password"}
                name={"confirmPassword"}
                value={registerFormik.values.confirmPassword}
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                error={
                    registerFormik.touched.confirmPassword &&
                    Boolean(registerFormik.errors.confirmPassword)
                }
                helperText={
                    registerFormik.touched.confirmPassword &&
                    registerFormik.errors.confirmPassword
                }
            />

            <LoginButton text={"Tạo tài khoản"} />
        </form>
    );
}
