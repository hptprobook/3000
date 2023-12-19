"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ProductItem from "@/components/common/Home/ProductItem/ProductItem";
import { generateProductHref } from "@/utils/generateHref";
import EmptyProduct from "@/components/common/Middleware/EmptyProduct";

const StyledSearchContainer = styled("div")(() => ({
    width: "100%",
    minHeight: "600px",
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

export default function SearchContainer({ data }) {
    const tabs = [
        "Phổ biến",
        "Bán chạy",
        "Giá từ thấp đến cao",
        "Giá từ cao đến thấp",
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [sortedData, setSortedData] = useState(data);

    useEffect(() => {
        handleTabClick(activeTab);
    }, [data]);

    const handleTabClick = (tab) => {
        if (data) {
            setActiveTab(tab);
            let newData;
            switch (tab) {
                case "Bán chạy":
                    // Sort by sold in descending order
                    newData = [...data].sort((a, b) => b.sold - a.sold);
                    break;
                case "Giá từ thấp đến cao":
                    // Sort by price in ascending order
                    newData = [...data].sort((a, b) => a.price - b.price);
                    break;
                case "Giá từ cao đến thấp":
                    // Sort by price in descending order
                    newData = [...data].sort((a, b) => b.price - a.price);
                    break;
                default:
                    // Default sorting or other sorting logic
                    newData = [...data];
                    break;
            }
            setSortedData(newData);
        }
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
            <Grid container spacing={1} style={{ width: "100%" }}>
                {sortedData && sortedData.length > 0 ? (
                    sortedData.map((item) => (
                        <Grid item xs={1.5} key={item.id}>
                            <ProductItem
                                name={item.name}
                                imgUrl={item.thumbnail}
                                rate={5}
                                sold={item.sold}
                                discount={item.discount}
                                price={item.price}
                                href={generateProductHref(item?.name, item?.id)}
                            />
                        </Grid>
                    ))
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "500px",
                        }}
                    >
                        <EmptyProduct />
                    </div>
                )}
            </Grid>
        </StyledSearchContainer>
    );
}
