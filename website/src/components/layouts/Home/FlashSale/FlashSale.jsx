"use client";

import React, { useState, useEffect, memo } from "react";
import "./style.css";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import FlashSaleProduct from "@/components/common/Home/FlashSaleProduct/FlashSaleProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import { generateProductHref } from "@/utils/generateHref";

function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    function calculateTimeLeft() {
        const targetTime = new Date();
        targetTime.setHours(24, 0, 0, 0);

        const currentTime = new Date();
        const difference = targetTime - currentTime;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const dispatch = useDispatch();
    const [loadData, setLoadData] = useState(false);
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (!loadData && products.length === 0) {
            dispatch(fetchAllProducts());
            setLoadData(true);
        }
    }, [loadData, products]);

    if (loading) {
        return <CirLoading />;
    }

    return (
        <div className="appContainer__flashSale">
            <header
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h4 style={{ marginRight: "12px" }}>Giá tốt hôm nay: </h4>
                    <span className="appContainer__flashSale--time">
                        {timeLeft.hours < 10
                            ? `0${timeLeft.hours}`
                            : timeLeft.hours}
                    </span>{" "}
                    :
                    <span className="appContainer__flashSale--time">
                        {timeLeft.minutes < 10
                            ? `0${timeLeft.minutes}`
                            : timeLeft.minutes}
                    </span>{" "}
                    :
                    <span className="appContainer__flashSale--time">
                        {timeLeft.seconds < 10
                            ? `0${timeLeft.seconds}`
                            : timeLeft.seconds}
                    </span>
                </div>
                <div>
                    {/* <Link
                        href={"/search/hot"}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "var(--link-color)",
                        }}
                    >
                        Xem thêm <NavigateNextIcon />
                    </Link> */}
                </div>
            </header>
            <div className="appContainer__flashSale--item">
                <Swiper
                    slidesPerView={7}
                    spaceBetween={16}
                    navigation={true}
                    modules={[Navigation]}
                >
                    {[...products]
                        .sort((a, b) => b.discount - a.discount)
                        .slice(0, 12)
                        .map((item) => (
                            <SwiperSlide key={item.id}>
                                <Link
                                    href={generateProductHref(
                                        item?.name,
                                        item?.id
                                    )}
                                >
                                    <FlashSaleProduct
                                        discount={item?.discount}
                                        name={item?.name}
                                        imgUrl={item?.thumbnail}
                                        price={item?.price}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}

export default FlashSale;
