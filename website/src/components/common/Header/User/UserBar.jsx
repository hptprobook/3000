"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import PrimaryBtn from "../../Button/PrimaryButton/PrimaryBtn";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CameraIcon from "@mui/icons-material/Camera";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CountBtn from "../../Button/CountButton/CountButton";
import { Box } from "@mui/material";
import LoginModal from "../LoginModel/LoginModel";
import useAuth from "@/hooks/useAuth";
import { logoutUser } from "@/redux/slices/authSlice";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useRouter } from "next/navigation";

const UserBarContainer = styled("div")(() => ({}));

const UserBarTop = styled("div")(() => ({
    display: "flex",
}));

const UserBarLink = styled("div")(() => ({
    display: "flex",
    padding: "0 16px",
    position: "relative",
    "&::after": {
        content: '""',
        position: "absolute",
        width: "2px",
        height: "20px",
        backgroundColor: "#e3e3e3",
        right: "0",
        top: "50%",
        transform: "translateY(-50%)",
    },
}));

const UserBarAddress = styled("div")(() => ({
    marginTop: "14px",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    height: "100%",
}));

export default function UserBar() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const isLoggedIn = useAuth();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLoginClick = () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
        }
    };

    const handleLogout = async () => {
        if (isLoggedIn) {
            router.refresh();
            dispatch(logoutUser());
        }
    };

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
    };

    const [activeButton, setActiveButton] = useState("home");

    const handleHomeClick = () => {
        setActiveButton("home");
    };

    const handleAccountClick = () => {
        setActiveButton("account");
    };

    // const cartList = useSelector((state) => state.carts.cartList);

    // useEffect(() => {
    //     dispatch(fetchAllCart());
    // }, []);

    return (
        <UserBarContainer>
            <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
            <UserBarTop>
                <UserBarLink>
                    <Link href={"/"}>
                        <PrimaryBtn
                            icon={<HomeRoundedIcon />}
                            text="Trang chủ"
                            isActive={activeButton === "home"}
                            onClick={handleHomeClick}
                        />
                    </Link>
                    <Link href={"/"}>
                        <PrimaryBtn
                            icon={<CameraIcon />}
                            text="Tin tức"
                            isActive={false}
                        />
                    </Link>
                    <Box
                        onClick={handleLoginClick}
                        sx={{
                            position: "relative",
                            "&:hover > .account__menu": {
                                display: "block !important",
                            },
                        }}
                    >
                        <PrimaryBtn
                            icon={<SentimentSatisfiedAltIcon />}
                            text="Tài khoản"
                            isActive={activeButton === "account"}
                        />
                        {isLoggedIn && (
                            <Box
                                className="account__menu"
                                sx={{
                                    display: "none",
                                    position: "absolute",
                                    height: "174px",
                                    bottom: "-176px",
                                    width: "248px",
                                    right: 0,
                                    padding: "16px 0",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                                    borderRadius: "5px",
                                    zIndex: "999999",
                                    fontSize: "14px",
                                    "& a p": {
                                        padding: "10px 24px",
                                        "&:hover": {
                                            backgroundColor: "#e5e5e5",
                                        },
                                    },
                                    "& .account__menu--logout": {
                                        padding: "10px 24px",
                                        "&:hover": {
                                            backgroundColor: "#e5e5e5",
                                        },
                                        cursor: "pointer",
                                    },
                                    "&::after": {
                                        content: "''",
                                        position: "absolute",
                                        width: "100%",
                                        top: "-6px",
                                        right: 0,
                                        height: "20px",
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                <Link href={"/profile"}>
                                    <p onClick={handleAccountClick}>
                                        Thông tin tài khoản
                                    </p>
                                </Link>
                                <Link
                                    href={"/profile/orders"}
                                    onClick={handleAccountClick}
                                >
                                    <p>Đơn hàng của tôi</p>
                                </Link>
                                <Link href={"/"} onClick={handleAccountClick}>
                                    <p>Trung tâm hỗ trợ</p>
                                </Link>
                                <div
                                    onClick={handleLogout}
                                    className="account__menu--logout"
                                >
                                    Đăng xuất
                                </div>
                            </Box>
                        )}
                    </Box>
                </UserBarLink>

                <div style={{ paddingLeft: "16px" }}>
                    <CountBtn icon={<ShoppingCartRoundedIcon />} count={0} />
                </div>
            </UserBarTop>

            <UserBarAddress>
                <span
                    style={{
                        fontWeight: "400",
                        color: "#8d8d95",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <LocalPhoneIcon sx={{ fontSize: "22px" }} /> CSKH:
                </span>
                &nbsp;
                <Link
                    style={{ textDecoration: "underline" }}
                    href={"to:0833129021"}
                >
                    0833.129.021
                </Link>
            </UserBarAddress>
        </UserBarContainer>
    );
}
