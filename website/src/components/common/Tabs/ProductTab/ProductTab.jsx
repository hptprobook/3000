"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ProductItem from "../../Home/ProductItem/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "./style.css";
import EmptyProduct from "../../Middleware/EmptyProduct";

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
    if (!tabs) {
        return <EmptyProduct />;
    }

    const [activeTab, setActiveTab] = useState(
        tabs && tabs?.length > 0 ? tabs[0]?.id : 0
    );

    useEffect(() => {
        setActiveTab(tabs[0]?.id);
    }, [tabs]);

    const activeTabData = tabs?.find((tab) => tab.id === activeTab);

    return (
        <StyledProductTab className="appContainer__ProductTab">
            <div className="tabs" style={{ marginTop: "12px" }}>
                {tabs &&
                    tabs.map((tab) => (
                        <StyledButtonTab
                            key={tab.id}
                            className={`tab ${
                                tab.id === activeTab ? "active" : ""
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.name}
                        </StyledButtonTab>
                    ))}
            </div>
            <div className="tabContent">
                {activeTabData &&
                activeTabData?.products &&
                activeTabData?.products.length > 0 ? (
                    <Swiper
                        slidesPerView={6}
                        spaceBetween={8}
                        navigation={true}
                        modules={[Navigation]}
                        className="ProductTabSwiper"
                        slideToClickedSlide={6}
                    >
                        {activeTabData?.products.map((product) => (
                            <SwiperSlide key={product?.id}>
                                <ProductItem
                                    name={product?.name}
                                    price={product?.price}
                                    rate={product?.average_rating}
                                    imgUrl={product?.thumbnail}
                                    href={`/product/${encodeURIComponent(
                                        product?.name
                                            .toLowerCase()
                                            .replace(/ /g, "-")
                                    )}-${encodeURIComponent(product?.id)}`}
                                    discount={product?.discount}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p>Không có sản phẩm nào trong danh mục này</p>
                )}
            </div>
        </StyledProductTab>
    );
}
