"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ProductItem from "@/components/common/Home/ProductItem/ProductItem";

const StyledCategoryContainer = styled("div")(() => ({
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

export default function CategoryContainer({ data }) {
    console.log(
        "🚀 ~ file: CategoryContainer.jsx:34 ~ CategoryContainer ~ data:",
        data
    );
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
        <StyledCategoryContainer>
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
                {data &&
                    data.map((item) => (
                        <Grid item xs={2.4}>
                            <ProductItem
                                name={item?.name}
                                imgUrl={item?.thumbnail}
                                rate={5}
                                sold={item?.sold}
                                discount={item?.discount}
                                price={item?.price}
                                href={""}
                            />
                        </Grid>
                    ))}
            </Grid>
        </StyledCategoryContainer>
    );
}
