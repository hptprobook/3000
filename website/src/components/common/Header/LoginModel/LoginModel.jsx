import React, { useState } from "react";
import "./style.css";
import CancelIcon from "@mui/icons-material/Cancel";
import LoginForm from "../../TextField/Login/LoginForm";
import LoginButton from "../../Button/LoginButton/LoginButton";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";

const LoginModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ login, password }));
    };

    return (
        <div className="loginModal">
            <div className="loginModal__backdrop" onClick={onClose}></div>
            <div className="loginModal__content">
                <button className="loginModal__closeBtn" onClick={onClose}>
                    <CancelIcon sx={{ fontSize: "32px" }} />
                </button>
                <h2>Xin chào</h2>
                <p style={{ marginTop: "12px" }}>
                    Đăng nhập hoặc tạo tài khoản
                </p>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "70%", padding: "24px 80px 0 0" }}>
                        <form onSubmit={handleLogin}>
                            <LoginForm
                                label={"Số điện thoại / Email"}
                                type={"text"}
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                            <LoginForm
                                label={"Mật khẩu"}
                                type={"password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                href={""}
                                style={{
                                    color: "var(--link-color)",
                                }}
                            >
                                Tạo tài khoản
                            </Link>
                        </div>

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
