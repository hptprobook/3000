"use client";

import React, { useState, useEffect } from "react";
import "./style.css";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import FlashSaleProduct from "@/components/common/Home/FlashSaleProduct/FlashSaleProduct";

export default function FlashSale() {
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

    const items = [
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
        },
    ];

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
                    <Link
                        href={""}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "var(--link-color)",
                        }}
                    >
                        Xem thêm <NavigateNextIcon />
                    </Link>
                </div>
            </header>
            <div className="appContainer__flashSale--item">
                <Swiper
                    slidesPerView={7}
                    spaceBetween={16}
                    navigation={true}
                    modules={[Navigation]}
                >
                    {items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <Link href={"/"}>
                                <FlashSaleProduct
                                    discount={item.discount}
                                    imgUrl={item.imgUrl}
                                    price={item.price}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
