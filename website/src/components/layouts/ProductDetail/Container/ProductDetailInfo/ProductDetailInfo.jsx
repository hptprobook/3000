"use client";
import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Rating from "@/components/common/Rating/Rating";
import Variant from "@/components/common/Variant/Variant";
import { VariantContext } from "@/provider/VariantContext";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";

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

export default function ProductDetailInfo({ product }) {
    if (!product) {
        return <ProgressLoading />;
    }
    const formatPriceToVND = (price) => {
        return price ? price.toLocaleString("vi-VN") : 0;
    };

    const finalPrice =
        product?.price - product?.price * (product?.discount / 100);

    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        const initialSelections = {};
        const initialActiveText = [];

        product?.variants.forEach((variant) => {
            const firstOptionName = variant.options[0].name;
            initialSelections[variant.variantType] = firstOptionName;
            initialActiveText.push({
                variantType: variant.variantType,
                optionName: firstOptionName,
            });
        });

        setSelectedOptions(initialSelections);
        setActiveText(initialActiveText);
        // calculateTotalPrice();
    }, [product]);

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedOptions]);

    const calculateTotalPrice = () => {
        let additionalPrice = 0;
        Object.keys(selectedOptions).forEach((variantType) => {
            const selectedOption = product.variants
                .find((v) => v.variantType === variantType)
                .options.find((o) => o.name === selectedOptions[variantType]);
            additionalPrice += Number(selectedOption.price);
        });
        const basePrice = Number(finalPrice) || 0;
        setTotalPrice(basePrice + additionalPrice);
    };

    const handleOptionSelect = (variantType, optionName) => {
        setSelectedOptions((prev) => ({ ...prev, [variantType]: optionName }));
        handleActiveTextChange(variantType, optionName);
        calculateTotalPrice();
    };

    const { activeText, setActiveText, setTotalPrice } =
        useContext(VariantContext);

    const handleActiveTextChange = (variantType, optionName) => {
        const updatedActiveText = activeText.filter(
            (item) => item.variantType !== variantType
        );
        updatedActiveText.push({ variantType, optionName });
        setActiveText(updatedActiveText);
    };

    let brand = "";

    product?.brands?.map((item) => {
        brand = item.name;
    });

    return (
        <StyledDetailInfo>
            <div className="productDetailInfo__top">
                <img
                    src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                    alt="logo"
                />
                <p>
                    Thương hiệu: <Link href={"/"}>{brand}</Link>
                </p>
            </div>
            <h3 className="productDetailInfo__name">{product?.name}</h3>
            <div className="productDetailInfo__rate">
                <Rating rate={product?.average_rating} size={"18px"} /> |{" "}
                <p>Đã bán: {product?.sold}</p>
            </div>
            <div className="productDetailInfo__price">
                <p className="price">{formatPriceToVND(finalPrice)}</p>
                <div className="discount">-{product?.discount}%</div>
            </div>
            <div className="productDetailInfo__variant">
                <div>
                    {product?.variants.map((variant, i) => (
                        <div
                            key={i}
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
                            {variant.options.map((option, index) => (
                                <Variant
                                    onActiveChange={handleActiveTextChange}
                                    key={index}
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
