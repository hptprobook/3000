"use client";
import React, { useContext, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
import { CartContext } from "@/provider/CartContext";

const StyledCartContainer = styled("div")(() => ({
    "& .cart-item__header": {
        backgroundColor: "#fff",
        padding: "0 12px",
        borderRadius: "6px",
    },
    "& .cart-item": {
        backgroundColor: "#fff",
        marginTop: "12px",
        borderRadius: "6px",
        "& .cart-item__content": {
            padding: "24px 12px",
            "& .cart-item__main": {
                marginRight: "24px",
            },
            "& .cart-item__img": {
                width: "80px",
                height: "80px",
                overflow: "hidden",
                marginRight: "12px",
            },
            "& .quantity-handle": {
                display: "flex",
                alignItems: "center",
                "& button": {
                    fontSize: "20px",
                    width: "28px",
                    height: "28px",
                    color: "#9a9a9a",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    border: "1px solid #d7d7d7",
                    "&.left": {
                        borderRight: "none",
                        borderTopLeftRadius: "3px",
                        borderBottomLeftRadius: "3px",
                    },
                    "&.right": {
                        borderLeft: "none",
                        borderTopRightRadius: "3px",
                        borderBottomRightRadius: "3px",
                    },
                    "&:hover": {
                        backgroundColor: "#d7d7d7",
                    },
                },
                "& input": {
                    width: "44px",
                    height: "28px",
                    border: "1px solid #d7d7d7",
                    outline: "none",
                    textAlign: "center",
                    fontWeight: "600",
                },
            },
        },
    },
}));

export default function CartContainer({ data }) {
    // Các checkbox chọn item
    const [checkedIds, setCheckedIds] = useState([]);

    useEffect(() => {
        setCheckedIds(data?.map((item) => item.id));
    }, [data]);

    const handleCheck = (id, isChecked) => {
        if (isChecked) {
            setCheckedIds((prev) => [...prev, id]);
        } else {
            setCheckedIds((prev) => prev.filter((item) => item !== id));
        }
    };

    const handleCheckAll = (isChecked) => {
        if (isChecked) {
            setCheckedIds(data?.map((item) => item.id));
        } else {
            setCheckedIds([]);
        }
    };

    // Hàm giới hạn ký tự tên sản phẩm
    const truncateProductName = (name) => {
        return name.length > 135 ? `${name.substring(0, 135)}...` : name;
    };

    const allChecked = checkedIds.length === data?.length;
    const indeterminate = checkedIds.length > 0 && !allChecked;

    // Hàm tính tổng tiền dựa trên quantity change
    const [quantities, setQuantities] = useState({});
    const [totalPrices, setTotalPrices] = useState({});

    useEffect(() => {
        const initialQuantities = {};
        const initialTotalPrices = {};
        data?.forEach((item) => {
            initialQuantities[item.id] = item.quantity;
            initialTotalPrices[item.id] = item.quantity * item.price;
        });
        setQuantities(initialQuantities);
        setTotalPrices(initialTotalPrices);
    }, [data]);

    const updateQuantity = (id, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: newQuantity,
        }));
        setTotalPrices((prevTotalPrices) => ({
            ...prevTotalPrices,
            [id]: newQuantity * data?.find((item) => item.id === id).price,
        }));
    };

    // Hàm xử lý input quantity
    const incrementQuantity = (id) => {
        updateQuantity(id, Math.min(quantities[id] + 1, 100));
    };

    const decrementQuantity = (id) => {
        updateQuantity(id, Math.max(quantities[id] - 1, 1));
    };

    // Hàm xử lý tổng tiền cho giỏ hàng
    const { setQuantity, setTotalPrice, setCartItemIds } =
        useContext(CartContext);

    const calculateAndUpdateTotals = () => {
        let totalQuantity = 0;
        let totalPrice = 0;

        data?.forEach((item) => {
            if (checkedIds.includes(item.id)) {
                totalQuantity += 1;
                totalPrice += quantities[item.id] * item.price;
            }
        });

        setQuantity(totalQuantity);
        setTotalPrice(totalPrice);
        setCartItemIds(checkedIds);
    };

    useEffect(() => {
        calculateAndUpdateTotals();
    }, [checkedIds, quantities, data]);

    return (
        <StyledCartContainer>
            <Grid
                container
                sx={{
                    alignItems: "center",
                    color: "#363636",
                    fontSize: "14px",
                }}
                className="cart-item__header"
            >
                <Grid item xs={0.4}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={allChecked}
                                indeterminate={indeterminate}
                                onChange={(e) =>
                                    handleCheckAll(e.target.checked)
                                }
                            />
                        }
                    />
                </Grid>
                <Grid item xs={6.1}>
                    Tất cả ({data?.length} sản phẩm)
                </Grid>
                <Grid item xs={1.8}>
                    Đơn giá
                </Grid>
                <Grid item xs={1.5}>
                    Số lượng
                </Grid>
                <Grid item xs={1.8}>
                    Thành tiền
                </Grid>
                <Grid item xs={0.4}>
                    <DeleteOutlineIcon />
                </Grid>
            </Grid>
            <div className="cart-item">
                {data?.map((item) => (
                    <Grid
                        container
                        key={item.id}
                        sx={{
                            alignItems: "center",
                        }}
                        className="cart-item__content at-c"
                    >
                        <Grid item xs={0.4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedIds.includes(item.id)}
                                        onChange={(e) =>
                                            handleCheck(
                                                item.id,
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={1.1}>
                            <div className="cart-item__img">
                                <img
                                    className="img-c"
                                    src={item.product.thumbnail}
                                    alt={item.product.name}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className="cart-item__main">
                                <Link
                                    href={""}
                                    style={{
                                        fontSize: "15px",
                                    }}
                                >
                                    {truncateProductName(item.product.name)}
                                </Link>
                                <div
                                    style={{
                                        fontSize: "14px",
                                        marginTop: "6px",
                                    }}
                                >
                                    {(() => {
                                        try {
                                            const parsedVariants = JSON.parse(
                                                item.variants || "[]"
                                            );
                                            const formattedVariants =
                                                parsedVariants.join(" - ");
                                            return (
                                                <span>{formattedVariants}</span>
                                            );
                                        } catch (error) {
                                            return <div></div>;
                                        }
                                    })()}
                                </div>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={1.8}
                            style={{
                                fontSize: "14px",
                                fontWeight: "600",
                            }}
                        >
                            {item.price.toLocaleString()}đ
                        </Grid>
                        <Grid item xs={1.5}>
                            <div className="quantity-handle">
                                <button
                                    className="left"
                                    onClick={() => decrementQuantity(item.id)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={quantities[item.id] || 1}
                                    onChange={(e) =>
                                        updateQuantity(
                                            item.id,
                                            Math.max(
                                                1,
                                                Math.min(
                                                    100,
                                                    Number(e.target.value)
                                                )
                                            )
                                        )
                                    }
                                />
                                <button
                                    className="right"
                                    onClick={() => incrementQuantity(item.id)}
                                >
                                    +
                                </button>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={1.8}
                            style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#ff424e",
                            }}
                        >
                            {totalPrices[item.id]?.toLocaleString()}đ
                        </Grid>
                        <Grid item xs={0.4}>
                            <DeleteOutlineIcon sx={{ cursor: "pointer" }} />
                        </Grid>
                    </Grid>
                ))}
            </div>
        </StyledCartContainer>
    );
}
