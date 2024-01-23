import React from "react";
import { styled } from "@mui/material/styles";
import "./style.css";
import Link from "next/link";
import Rating from "../../Rating/Rating";

const StyledProductItem = styled("div")(() => ({
    padding: "8px",
    backgroundColor: "#fff",
    "& .img": {
        width: "100%",
        aspectRatio: "1/1",
        objectFit: "cover",
    },
    "& .name": {
        fontSize: "12px",
        lineHeight: "20px",
        display: "-webkit-box",
        height: "44px",
        WebkitLineClamp: 2,
        webkitBoxOrient: "vertical !important",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    "& .price": {
        position: "relative",
        fontWeight: "500",
        borderBottom: "1px solid #dddde3",
        paddingBottom: "12px",
        marginTop: "4px",
        span: {
            fontSize: "13px",
            position: "relative",
            top: "-4px",
        },
    },
    "& .rate": {
        display: "flex",
        alignItems: "center",
    },
    "& .ship": {
        marginTop: "8px",
        fontSize: "12px",
        color: "#919199",
    },
}));

export default function ProductItem({
    name,
    price,
    imgUrl,
    rate,
    sold = 0,
    discount = 0,
    href,
}) {
    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    const formatPriceToVND = (price) => {
        return price.toLocaleString("vi-VN");
    };

    const finalPrice = price - price * (discount / 100);

    const calculateShippingDate = () => {
        const today = new Date();
        const shippingDate = new Date(today);
        shippingDate.setDate(shippingDate.getDate() + 3);

        const weekday = shippingDate.toLocaleDateString("vi-VN", {
            weekday: "long",
        });

        const day = shippingDate.getDate();
        const month = shippingDate.getMonth() + 1;

        return `Giao ${weekday}, ${day}/${month}`;
    };

    const truncatedName = truncateString(name, 40);

    return (
        <StyledProductItem>
            <Link href={href}>
                {imgUrl && <img src={imgUrl} alt={name} className="img" />}
                <img
                    src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png"
                    alt="Chính hãng"
                    style={{
                        width: "90px",
                        height: "20px",
                        objectFit: "cover",
                        marginTop: "8px",
                    }}
                />
                <p className="name">{truncatedName}</p>
                <div className="rate">
                    <Rating rate={rate} size={"13px"} />
                    {sold !== 0 && (
                        <span style={{ fontSize: "11px", color: "#9c9ca3" }}>
                            | Đã bán {sold}
                        </span>
                    )}
                </div>
                <div
                    className="price"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    {formatPriceToVND(finalPrice)} <span>₫</span>
                    {discount > 0 && (
                        <div
                            style={{
                                fontSize: "12px",
                                backgroundColor: "#f5f5fa",
                                borderRadius: "8px",
                                padding: "2px 4px",
                                marginLeft: "4px",
                            }}
                        >
                            -{discount}%
                        </div>
                    )}
                </div>
                <p className="ship">{calculateShippingDate()}</p>
            </Link>
        </StyledProductItem>
    );
}
