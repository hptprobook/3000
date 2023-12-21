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
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import { generateProductHref } from "@/utils/generateHref";

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

export default function ProductDetailSimilar({ data }) {
    return (
        <StyledProductDetailSimilar>
            <h4>Sản phẩm tương tự</h4>
            <Swiper
                slidesPerView={3}
                navigation={false}
                autoplay={{
                    delay: 7500,
                    disableOnInteraction: false,
                }}
                grid={{
                    rows: 2,
                }}
                spaceBetween={12}
                modules={[Grid, Autoplay]}
                className="productDetailSimilar"
            >
                {data?.map((product) => (
                    <SwiperSlide key={product?.id}>
                        <ProductItem
                            name={product?.name}
                            price={product?.price}
                            imgUrl={product?.thumbnail}
                            href={generateProductHref(
                                product?.name,
                                product?.id
                            )}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </StyledProductDetailSimilar>
    );
}
