import React from "react";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import "./style.css";

const StyledProductItem = styled("div")(() => ({
    padding: "0 8px 8px 8px",
    "& .img": {
        width: "100%",
        aspectRatio: "1/1",
        objectFit: "cover",
    },
    "& .name": {
        fontSize: "12px",
        lineHeight: "20px",
        display: "-webkit-box",
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
        span: {
            fontSize: "13px",
            position: "relative",
            top: "-4px",
        },
    },
    "& .ship": {
        marginTop: "8px",
        fontSize: "12px",
        color: "#919199",
    },
}));

export default function ProductItem({ name, price, imgUrl, rate }) {
    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    const renderRating = (rate) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rate) {
                stars.push(
                    <StarIcon
                        sx={{ fontSize: "13px", color: "#f8cc3b" }}
                        key={i}
                    />
                );
            } else {
                stars.push(
                    <StarIcon
                        sx={{ fontSize: "13px", color: "#dddde3" }}
                        key={i}
                    />
                );
            }
        }
        return stars;
    };

    const formatPriceToVND = (price) => {
        return price.toLocaleString("vi-VN");
    };

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
            <div className="rate">{renderRating(rate)}</div>
            <p className="price">
                {formatPriceToVND(price)} <span>₫</span>
            </p>
            <p className="ship">{calculateShippingDate()}</p>
        </StyledProductItem>
    );
}
