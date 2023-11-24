"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Grid, Button } from "@mui/material";
import ProductItem from "@/components/common/Home/ProductItem/ProductItem";
import SeeMoreBtn from "@/components/common/Button/SeeMore/SeeMoreBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/redux/slices/productSlice";

export default function MainListProduct() {
    const items = [
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
        {
            discount: 31,
            imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/73/dc/71/36ba3b8865b9879b5649c95bb26d8f32.jpg.webp",
            price: 489000,
            sold: 100,
            rate: 5,
            name: "Nồi Cơm Điện Tử Kangaroo KG595 (1.8L) - Đen- Hàng chính hãng",
        },
    ];

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        if (!loadData) {
            dispatch(fetchAllProducts());
            if (status !== "idle") {
                setLoadData(true);
            }
        }
    }, [loadData, dispatch, status]);

    const [displayCount, setDisplayCount] = useState(6);
    const increment = 6;

    const displayedItems = products.slice(0, displayCount);
    const [isLoading, setIsLoading] = useState(false);

    const showMoreProducts = () => {
        setIsLoading(true);
        setTimeout(() => {
            setDisplayCount((prevDisplayCount) => prevDisplayCount + increment);
            setIsLoading(false);
        }, 500); // Chờ 0.5 giây
    };

    return (
        <div className="appContainer__mainListProduct">
            <h4
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    padding: "20px 12px",
                }}
            >
                Gợi ý hôm nay
            </h4>
            <Grid container spacing={1}>
                {displayedItems.map((item, i) => (
                    <Grid item xs={2} key={i}>
                        <ProductItem
                            name={item.name}
                            imgUrl={item.thumbnail}
                            price={item.price}
                            rate={4}
                            discount={item.discount}
                            sold={item.sold}
                        />
                    </Grid>
                ))}
            </Grid>
            {displayCount < items.length && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "12px",
                    }}
                >
                    <SeeMoreBtn
                        onClick={showMoreProducts}
                        text={isLoading ? "Đang tải..." : "Xem thêm"}
                    />
                </div>
            )}
        </div>
    );
}
