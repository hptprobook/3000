"use client";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { VariantContext } from "@/provider/VariantContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import useAuth from "@/hooks/useAuth";
import LoginModal from "@/components/common/Header/LoginModel/LoginModel";
import Link from "next/link";
import { AddToCartContext } from "@/provider/AddToCartContext";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import { toast } from "react-toastify";

const StyledProductDetailAdd = styled("div")(() => ({
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "15px",
    position: "sticky",
    top: "12px",
    "& button": {
        fontFamily: "var(--font-family)",
    },
    "& .quantity-handle": {
        marginTop: "12px",
        display: "flex",
        alignItems: "center",
        "& button": {
            fontSize: "20px",
            width: "32px",
            height: "32px",
            borderRadius: "3px",
            color: "#9a9a9a",
            backgroundColor: "#fff",
            border: "1px solid #d7d7d7",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#d7d7d7",
            },
        },
        "& input": {
            width: "44px",
            height: "32px",
            border: "1px solid #d7d7d7",
            borderRadius: "3px",
            margin: "0 4px",
            outline: "none",
            textAlign: "center",
            fontWeight: "600",
        },
    },
    "& .price": {
        marginTop: "12px",
        "& p": {
            position: "relative",
            fontSize: "24px",
            fontWeight: "600",
            letterSpacing: "-0.5px",
            "&::after": {
                content: '"₫"',
                position: "absolute",
                top: "-4px",
                fontSize: "18px",
            },
        },
    },
    "& .buy-now": {
        width: "100%",
        height: "40px",
        borderRadius: "4px",
        backgroundColor: "var(--span-color)",
        border: "none",
        marginTop: "12px",
        color: "#fff",
        fontSize: "16px",
        outline: "none",
        cursor: "pointer",
        "&:hover": {
            opacity: 0.8,
        },
    },
    "& .add-to-cart": {
        width: "100%",
        height: "40px",
        borderRadius: "4px",
        backgroundColor: "#fff",
        border: "1px solid var(--link-color)",
        marginTop: "8px",
        color: "var(--link-color)",
        fontSize: "16px",
        outline: "none",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "var(--link-color)",
            color: "#fff",
        },
    },
}));

export default function ProductDetailAdd({ data }) {
    // if (!data) {
    //     return <ProgressLoading />;
    // }
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        if (quantity < 100) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const formatPriceToVND = (price) => {
        return price.toLocaleString("vi-VN");
    };

    const { activeText } = useContext(VariantContext);
    const { totalPrice } = useContext(VariantContext);
    const { addToCartSuccess, setAddToCartSuccess } =
        useContext(AddToCartContext);

    const tempPrice = totalPrice * quantity;

    const dispatch = useDispatch();
    const { status, carts, error } = useSelector((state) => state.carts);
    const isLoggedIn = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            const variantJson = JSON.stringify(
                activeText.map((item) => item.optionName)
            );
            dispatch(
                addToCart({
                    quantity: quantity,
                    product_id: data?.id,
                    temp_price: tempPrice,
                    variants: variantJson,
                })
            )
                .then(() => {
                    if (!error) {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                        setAddToCartSuccess(true);
                    } else {
                        toast.error(
                            "Sản phẩm đã hết hàng, vui lòng thử lại sau hoặc liên hệ CSKH",
                            {
                                autoClose: 3000,
                            }
                        );
                    }
                })
                .catch(() => {
                    toast.error("Có lỗi xảy ra, vui lòng thử lại sau", {
                        autoClose: 3000,
                    });
                });
        }
    };

    return (
        <>
            <StyledProductDetailAdd>
                <div className="variant">
                    {activeText.map((item, index) => (
                        <span key={index}>
                            {item.optionName}
                            {index < activeText.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </div>
                <h5 style={{ marginTop: "12px" }}>Số lượng</h5>
                <div className="quantity-handle">
                    <button onClick={decrementQuantity}>-</button>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(
                                Math.max(
                                    1,
                                    Math.min(100, Number(e.target.value))
                                )
                            )
                        }
                    />
                    <button onClick={incrementQuantity}>+</button>
                </div>
                <h5 style={{ marginTop: "12px" }}>Tạm tính</h5>
                <div className="price">
                    <p>{formatPriceToVND(tempPrice)}</p>
                </div>
                <button
                    type="submit"
                    onClick={handleAddToCart}
                    className="add-to-cart"
                >
                    Thêm vào giỏ hàng
                </button>
            </StyledProductDetailAdd>
            {showLoginModal && (
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            )}
        </>
    );
}
