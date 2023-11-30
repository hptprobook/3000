"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Rating from "@/components/common/Rating/Rating";
import Variant from "@/components/common/Variant/Variant";
import { useVariantSelection } from "@/hooks/useVariantSelection";

const StyledDetailInfo = styled("div")(() => ({
    backgroundColor: "#fff",
    borderRadius: "5px",
    // marginRight: "12px",
    padding: "15px",

    "& .productDetailInfo__top": {
        display: "flex",
        alignItems: "center",
        "& img": {
            height: "20px",
            objectFit: "cover",
            marginRight: "10px",
        },
        "& p": {
            fontSize: "13px",
            "& a": {
                color: "#436ec6",
            },
        },
    },
    "& .productDetailInfo__name": {
        fontSize: "20px",
        fontWeight: "500",
        lineHeight: "30px",
        color: "#27272a",
        marginTop: "8px",
    },
    "& .productDetailInfo__rate": {
        marginTop: "8px",
        display: "flex",
        alignItems: "center",
        "& p": {
            paddingLeft: "8px",
            fontSize: "14px",
            color: "var(--text-50-color)",
        },
    },
    "& .productDetailInfo__price": {
        display: "flex",
        alignItems: "center",
        marginTop: "8px",
        "& .price": {
            marginRight: "24px",
            position: "relative",
            fontSize: "24px",
            fontWeight: "600",
            letterSpacing: "-0.5px",
            "&::after": {
                content: '"₫"',
                position: "absolute",
                top: 0,
                right: "-14px",
                fontSize: "18px",
            },
        },
        "& .discount": {
            fontSize: "13px",
            padding: "2px 4px",
            backgroundColor: "#e8e5ed",
            borderRadius: "5px",
        },
    },
}));

export default function ProductDetailInfo() {
    const formatPriceToVND = (price) => {
        return price.toLocaleString("vi-VN");
    };

    const fakeData = {
        productId: 12345,
        productName: "Tủ Để Đồ Có Nắp Đậy",
        variants: [
            {
                variantType: "Kích thước",
                options: [
                    { id: 1, name: "4 tầng", price: 20000000 },
                    { id: 2, name: "5 tầng", price: 25000000 },
                    { id: 3, name: "6 tầng", price: 30000000 },
                ],
            },
            {
                variantType: "Màu sắc",
                options: [
                    { id: 1, name: "Đỏ" },
                    { id: 2, name: "Xanh" },
                    { id: 3, name: "Trắng" },
                ],
            },
        ],
    };

    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        const initialSelections = {};
        fakeData.variants.forEach((variant) => {
            initialSelections[variant.variantType] = variant.options[0].name;
        });
        setSelectedOptions(initialSelections);
    }, []);

    const handleOptionSelect = (variantType, optionName) => {
        setSelectedOptions((prev) => ({ ...prev, [variantType]: optionName }));
    };

    return (
        <StyledDetailInfo>
            <div className="productDetailInfo__top">
                <img
                    src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                    alt="logo"
                />
                <p>
                    Thương hiệu: <Link href={"/"}>VANDO</Link>
                </p>
            </div>
            <h3 className="productDetailInfo__name">
                Tủ Để Đồ Có Nắp Đậy HÀNG NHẬP TRUNG ĐẸP XỊN Bằng Nhựa PVC Chống
                Ẩm Mốc Trong, Kệ Để Đồ Nhà Tắm Vệ Sinh Kèm Bánh Xe Linh Hoạt
            </h3>
            <div className="productDetailInfo__rate">
                <Rating rate={4.5} size={"18px"} /> | <p>Đã bán: 6</p>
            </div>
            <div className="productDetailInfo__price">
                <p className="price">{formatPriceToVND(30000000)}</p>
                <div className="discount">-44%</div>
            </div>
            <div className="productDetailInfo__variant">
                <div>
                    {fakeData.variants.map((variant) => (
                        <div
                            key={variant.variantType}
                            style={{
                                marginTop: "16px",
                            }}
                        >
                            <h5
                                style={{
                                    margin: "12px 0",
                                    fontSize: "14px",
                                }}
                            >
                                {variant.variantType}
                            </h5>
                            {variant.options.map((option) => (
                                <Variant
                                    key={option.id}
                                    text={option.name}
                                    onClick={() =>
                                        handleOptionSelect(
                                            variant.variantType,
                                            option.name
                                        )
                                    }
                                    isActive={
                                        selectedOptions[variant.variantType] ===
                                        option.name
                                    }
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </StyledDetailInfo>
    );
}
