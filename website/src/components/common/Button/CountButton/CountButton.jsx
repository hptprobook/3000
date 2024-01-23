import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { AddToCartContext } from "@/provider/AddToCartContext";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import LoginModal from "../../Header/LoginModel/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCart } from "@/redux/slices/cartSlice";

const CountButton = styled("div")(({ isActive }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 10px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Inter, Helvetica, Arial, sans-serif !important",
    color: "rgb(10, 104, 255)",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: "#e0ecff",
    },
    "& .modal": {
        position: "absolute",
        top: "130%",
        right: 0,
        width: "280px",
        backgroundColor: "#fff",
        boxShadow: "-3px -2px 10px rgba(0, 0, 0, 0.2)",
        zIndex: "9999",
        borderRadius: "5px",
        cursor: "default",
        display: isActive ? "none" : "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "15px",
        "&::after": {
            content: "''",
            position: "absolute",
            top: "-18px",
            right: "12px",
            borderWidth: "10px",
            borderStyle: "solid",
            borderColor: "transparent transparent #fff transparent",
        },
    },
}));

export default function CountBtn({ icon }) {
    const { addToCartSuccess, setAddToCartSuccess } =
        useContext(AddToCartContext);
    const [isActive, setIsActive] = useState(true);
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useAuth();
    const carts = useSelector((state) => state.carts.cartList);

    useEffect(() => {
        setIsActive(!addToCartSuccess);
        dispatch(fetchAllCart());
    }, [addToCartSuccess]);

    useEffect(() => {
        if (addToCartSuccess) {
            const timer = setTimeout(() => {
                setAddToCartSuccess(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [addToCartSuccess, setAddToCartSuccess]);

    const handleCloseModal = (e) => {
        e.preventDefault();
        setIsActive(true);
        setAddToCartSuccess(false);
    };

    useEffect(() => {
        const hideModal = () => {
            setIsActive(true);
        };

        window.addEventListener("click", hideModal);

        return () => {
            window.removeEventListener("click", hideModal);
        };
    }, []);

    const handleClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            router.push("/cart");
        }
    };

    return (
        <>
            {showLoginModal && (
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            )}
            <div onClick={handleClick}>
                <CountButton isActive={isActive}>
                    <span className="CountBtn__count">
                        {carts?.data?.length || 0}
                    </span>
                    {icon}
                    <div className="modal">
                        <CloseIcon
                            onClick={(e) => {
                                handleCloseModal(e);
                            }}
                            sx={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                color: "#9b9b9b",
                            }}
                        />
                        <div className="at-c">
                            <CheckCircleIcon
                                sx={{ fontSize: "24px", color: "#4caf50" }}
                            />{" "}
                            <p
                                style={{
                                    color: "#4f4f4f",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    marginLeft: "8px",
                                }}
                            >
                                Thêm vào giỏ hàng thành công
                            </p>
                        </div>
                        <Link href={"/cart"} className="css-link">
                            <button
                                style={{
                                    outline: "none",
                                    width: "100%",
                                    height: "37px",
                                    border: "none",
                                    backgroundColor: "#ff424e",
                                    borderRadius: "4px",
                                    marginTop: "16px",
                                    cursor: "pointer",
                                    color: "#fff",
                                    fontFamily: "var(--font-family)",
                                    fontSize: "14px",
                                    transition: ".2s ease",
                                    "&:hover": {
                                        opacity: "0.8",
                                    },
                                }}
                            >
                                Xem giỏ hàng và thanh toán
                            </button>
                        </Link>
                    </div>
                </CountButton>
            </div>
        </>
    );
}
