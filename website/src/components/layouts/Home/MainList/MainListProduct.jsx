"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Grid, Button } from "@mui/material";
import ProductItem from "@/components/common/Home/ProductItem/ProductItem";
import SeeMoreBtn from "@/components/common/Button/SeeMore/SeeMoreBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/redux/slices/productSlice";

export default function MainListProduct() {
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
                            id={item.id}
                            name={item.name}
                            imgUrl={item.thumbnail}
                            price={item.price}
                            rate={item.average_rating}
                            discount={item.discount}
                            sold={item.sold}
                            href={`/product/${encodeURIComponent(
                                item.name.toLowerCase().replace(/ /g, "-")
                            )}-${encodeURIComponent(item.id)}`}
                        />
                    </Grid>
                ))}
            </Grid>
            {displayCount < products.length && (
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
