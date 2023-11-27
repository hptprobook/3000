"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ProductItem from "../../Home/ProductItem/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import Link from "next/link";
import "./style.css";

const StyledProductTab = styled("div")(() => ({
    "& .tabContent": {
        marginTop: "12px",
        " .product": {
            border: "1px solid #dddde3",
            borderRadius: "5px",
            overflow: "hidden",
        },
    },
}));

const StyledButtonTab = styled("button")(() => ({
    borderRadius: "24px",
    border: "1px solid #dddde3",
    cursor: "pointer",
    padding: "8px 14px",
    marginRight: "12px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#3b3b3e",
    fontFamily: "Inter, Helvetica, Arial, sans-serif !important",
    backgroundColor: "#fff",
    "&.active": {
        borderColor: "#0a68ff",
        color: "#0a68ff",
        fontWeight: "600",
    },
}));

export default function ProductTab({ tabs }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <StyledProductTab className="appContainer__ProductTab">
            <div className="tabs" style={{ marginTop: "12px" }}>
                {tabs.map((tab, index) => (
                    <StyledButtonTab
                        key={index}
                        className={`tab ${index === activeTab ? "active" : ""}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.name}
                    </StyledButtonTab>
                ))}
            </div>
            <div className="tabContent">
                {/* <Swiper
                    slidesPerView={6}
                    spaceBetween={8}
                    navigation={true}
                    modules={[Navigation]}
                >
                    {tabs[activeTab] &&
                        tabs[activeTab]?.products.map((product, i) => (
                            <SwiperSlide
                                key={i}
                                className={`product productSwiper${product.name}`}
                            >
                                <Link
                                    href={`/product/detail/${encodeURIComponent(
                                        product.name
                                            .toLowerCase()
                                            .replace(/ /g, "-")
                                    )}-${encodeURIComponent(product.id)}`}
                                >
                                    <ProductItem
                                        name={product.name}
                                        price={product.price}
                                        rate={product.average_rating}
                                        imgUrl={product.thumbnail}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                </Swiper> */}
                {tabs[activeTab]?.products.map((product, i) => (
                    <a href={product.id}>{product.name}</a>
                ))}
            </div>
        </StyledProductTab>
    );
}
