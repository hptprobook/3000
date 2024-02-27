"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import CancelIcon from "@mui/icons-material/Cancel";
import LoginForm from "../../TextField/Login/LoginForm";
import LoginButton from "../../Button/LoginButton/LoginButton";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignupForm from "../../TextField/SignupForm/SignupForm";
import ProgressLoading from "../../Loading/ProgressLoading/ProgressLoading";
import { useRouter } from "next/navigation";
import ForgotPassword from "../../TextField/ForgotPassword/ForgotPassword";

const validateLogin = (value) => {
    let error;
    if (!value) {
        error = "Trường này không được để trống";
    } else if (
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
        !/^\d{10,11}$/.test(value)
    ) {
        error = "Phải là email hợp lệ hoặc số điện thoại (10-11 chữ số)";
    }
    return error;
};

const loginSchema = Yup.object().shape({
    login: Yup.string()
        .required("Trường này không được để trống")
        .test("test-login", "Email hoặc số điện thoại không hợp lệ", (value) =>
            validateLogin(value)
        ),
    password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Mật khẩu là bắt buộc"),
});

const LoginModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { loading, user, error, registerData } = useSelector(
        (state) => state.auth
    );
    const [isToastShown, setToastShown] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const [currentForm, setCurrentForm] = useState("login");

    const formik = useFormik({
        initialValues: {
            login: registerData?.email && "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values, { setSubmitting }) => {
            dispatch(
                loginUser({
                    login: values.login,
                    password: values.password,
                })
            );
            router.push("/");

            setSubmitting(false);
        },
    });

    useEffect(() => {
        if (error === "Email or phone does not exist.") {
            formik.setErrors({ login: "Tên tài khoản không chính xác" });
        } else if (error === "Password is incorrect.") {
            formik.setErrors({ password: "Mật khẩu không chính xác" });
        }
    }, [error, formik.setErrors]);

    useEffect(() => {
        if (!isOpen) {
            setToastShown(false);
        } else if (isOpen && user && !isToastShown) {
            onClose();
            toast.success("Đăng nhập thành công !");
            setToastShown(true);
        }
    }, [isOpen, user, onClose, isToastShown]);

    const onRegister = () => {
        setIsLogin(!isLogin);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="loginModal" style={{ zIndex: "99999999" }}>
            <div className="loginModal__backdrop" onClick={onClose}></div>
            <div className="loginModal__content">
                {loading && <ProgressLoading />}
                <button className="loginModal__closeBtn" onClick={onClose}>
                    <CancelIcon sx={{ fontSize: "32px" }} />
                </button>
                <h2>Xin chào</h2>
                <p style={{ marginTop: "12px" }}>
                    {currentForm === "forgotPassword"
                        ? "Lấy lại mật khẩu"
                        : "Đăng nhập hoặc tạo tài khoản"}
                </p>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "70%", padding: "24px 80px 0 0" }}>
                        {currentForm === "login" && (
                            <>
                                <form onSubmit={formik.handleSubmit}>
                                    <LoginForm
                                        label={"Số điện thoại / Email"}
                                        type={"text"}
                                        name="login"
                                        value={formik.values.login}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.login &&
                                            Boolean(formik.errors.login)
                                        }
                                        helperText={
                                            formik.touched.login &&
                                            formik.errors.login
                                        }
                                    />
                                    <LoginForm
                                        label={"Mật khẩu"}
                                        type={"password"}
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.password &&
                                            Boolean(formik.errors.password)
                                        }
                                        helperText={
                                            formik.touched.password &&
                                            formik.errors.password
                                        }
                                    />
                                    <LoginButton text={"Đăng nhập"} />
                                </form>
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "24px",
                                    }}
                                >
                                    <Link
                                        href={"#"}
                                        style={{
                                            color: "var(--link-color)",
                                        }}
                                        onClick={() =>
                                            setCurrentForm("register")
                                        }
                                    >
                                        Tạo tài khoản
                                    </Link>

                                    <Link
                                        href={"#"}
                                        style={{
                                            color: "var(--link-color)",
                                            display: "block",
                                            marginTop: "16px",
                                        }}
                                        onClick={() =>
                                            setCurrentForm("forgotPassword")
                                        }
                                    >
                                        Quên mật khẩu
                                    </Link>
                                </div>
                            </>
                        )}

                        {currentForm === "register" && (
                            <>
                                <SignupForm onRegister={onRegister} />
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "24px",
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
                        )}

                        {currentForm === "forgotPassword" && (
                            <ForgotPassword setCurrentForm={setCurrentForm} />
                        )}

                        {currentForm === "login" && (
                            <>
                                <div style={{ marginTop: "20px" }}>
                                    <h4 style={{ textAlign: "center" }}>
                                        ---- Hoặc đăng nhập bằng ----
                                    </h4>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "20px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FacebookRoundedIcon
                                            sx={{
                                                fontSize: "60px",
                                                marginLeft: "20px",
                                                color: "#25479b",
                                                marginRight: "12px",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <div
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p className="note">
                                    Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
                                    <Link href={""}>điều khoản sử dụng</Link> và{" "}
                                    <Link href={""}>
                                        chính sách bảo mật thông tin cá nhân
                                    </Link>{" "}
                                    của 3000
                                </p>
                            </>
                        )}
                    </div>

                    <div
                        style={{
                            width: "30%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--link-color)",
                        }}
                    >
                        <img
                            style={{
                                width: "100%",
                                objectFit: "cover",
                            }}
                            src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
                            alt=""
                        />
                        <p style={{ marginTop: "40px" }}>
                            Mua sắm ngay cùng 3000
                        </p>
                        <p style={{ marginTop: "12px" }}>Ưu đãi mỗi ngày</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
