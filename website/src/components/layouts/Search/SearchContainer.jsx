"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ProductItem from "@/components/common/Home/ProductItem/ProductItem";

const StyledSearchContainer = styled("div")(() => ({
    padding: "0 4px 4px",
    "& .tabs": {
        display: "flex",
        width: "100%",
        height: "42px",
        backgroundColor: "#fff",
        marginBottom: "8px",
        "& .tabs__item": {
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 40px",
            justifyContent: "center",
            fontSize: "14px",
            color: "#808089",
            cursor: "pointer",
            userSelect: "none",
            "&.active": {
                color: "#0d5cb6",
                borderBottom: "2px solid #0d5cb6",
            },
        },
    },
}));

export default function SearchContainer() {
    const tabs = [
        "Phổ biến",
        "Bán chạy",
        "Giá từ thấp đến cao",
        "Giá từ cao đến thấp",
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <StyledSearchContainer>
            <div className="tabs">
                {tabs.map((tab) => (
                    <div
                        className={`tabs__item ${
                            tab === activeTab ? "active" : ""
                        }`}
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <Grid container spacing={1}>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <ProductItem
                        name={
                            "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng"
                        }
                        imgUrl={
                            "https://salt.tikicdn.com/cache/280x280/ts/product/be/33/51/77564b65c6a43f35426f1a0e61581347.jpg.webp"
                        }
                        rate={5}
                        sold={"5k+"}
                        discount={20}
                        price={20000000}
                        href={""}
                    />
                </Grid>
            </Grid>
        </StyledSearchContainer>
    );
}
