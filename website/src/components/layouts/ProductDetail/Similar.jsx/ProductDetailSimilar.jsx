"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import ProductItem from "@/components/common/Home/ProductItem/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Autoplay, Grid } from "swiper/modules";
import "./style.css";

const StyledProductDetailSimilar = styled("div")(() => ({
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "15px",
    marginTop: "12px",
    "& .swiper-wrapper": {
        flexDirection: "row !important",
        marginTop: "12px",
    },
    "& .swiper-slide": {
        marginTop: "0 !important",
        "&:hover": {
            opacity: 0.9,
        },
    },
}));

export default function ProductDetailSimilar() {
    return (
        <StyledProductDetailSimilar>
            <h4>Sản phẩm tương tự</h4>
            <Swiper
                slidesPerView={3}
                navigation={true}
                autoplay={{
                    delay: 7500,
                    disableOnInteraction: false,
                }}
                grid={{
                    rows: 2,
                }}
                // navigation={true}
                spaceBetween={12}
                modules={[Grid, Autoplay]}
                className="productDetailSimilar"
            >
                {[...Array(20)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <ProductItem
                            name={`SP ${index + 1}`}
                            price={30000 * (index + 1)}
                            imgUrl={
                                "https://salt.tikicdn.com/cache/280x280/ts/product/a8/a6/90/8ca9f3273103abd3e8a97466712fbf08.jpg.webp"
                            }
                            href={"#"}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </StyledProductDetailSimilar>
    );
}
