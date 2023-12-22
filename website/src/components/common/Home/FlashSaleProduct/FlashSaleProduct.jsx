import "./style.css";
import React from "react";
import { styled } from "@mui/material/styles";

const FlashSaleItem = styled("div")(() => ({
    width: "100%",
    marginTop: "16px",
    ".imageThumbnail": {
        width: "100%",
        aspectRatio: "1/1",
        position: "relative",
        img: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
        span: {
            position: "absolute",
            top: "0",
            left: "0",
            padding: "2px 5px",
            backgroundColor: "#ffdbde",
            color: "#ff424e",
            borderRadius: "5px",
            fontSize: "14px",
            fontWeight: "600",
        },
    },
    ".price": {
        textAlign: "center",
        margin: "8px 0",
        color: "#ff4d58",
        fontWeight: 500,
        position: "relative",
        span: {
            fontSize: "13px",
            position: "relative",
            top: "-4px",
        },
    },
    ".tag": {
        width: "100%",
        height: "22px",
        textAlign: "center",
        lineHeight: "22px",
        backgroundColor: "#ffaaaf",
        borderRadius: "12px",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "400",
    },
}));

export default function FlashSaleProduct({ discount, imgUrl, price, name }) {
    const formatPriceToVND = (price) => {
        return price.toLocaleString("vi-VN");
    };

    const finalPrice = price - price * (discount / 100);

    return (
        <FlashSaleItem>
            <div className="imageThumbnail">
                <img src={imgUrl} alt={name} />
                <span>-{discount}%</span>
            </div>
            <div className="price">
                {formatPriceToVND(finalPrice)}
                <span>₫</span>
            </div>
            <div className="tag">Vừa mở bán</div>
        </FlashSaleItem>
    );
}
