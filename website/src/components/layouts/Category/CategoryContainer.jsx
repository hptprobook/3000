"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ProductItem from "@/components/common/Home/ProductItem/ProductItem";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import { generateProductHref } from "@/utils/generateHref";
import { useCategoryContext } from "@/provider/CategoryContext";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import EmptyProduct from "@/components/common/Middleware/EmptyProduct";

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
    if (!data || data?.length === 0) {
        return <EmptyProduct />;
    }
    const tabs = [
        "Phổ biến",
        "Bán chạy",
        "Giá từ thấp đến cao",
        "Giá từ cao đến thấp",
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [sortedData, setSortedData] = useState(data);

    const sortData = (tab) => {
        let newData = [...data];
        if (tab === "Bán chạy") {
            newData.sort((a, b) => b.sold - a.sold);
        } else if (tab === "Giá từ thấp đến cao") {
            newData.sort((a, b) => a.price - b.price);
        } else if (tab === "Giá từ cao đến thấp") {
            newData.sort((a, b) => b.price - a.price);
        }
        setSortedData(newData);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        sortData(tab);
    };

    useEffect(() => {
        sortData(activeTab);
    }, [data]);

    const { filterCriteria } = useCategoryContext();
    const sortAndFilterData = () => {
        let filteredData = [...data];
        if (filterCriteria.priceRange) {
            filteredData = filteredData.filter(
                (item) =>
                    item.price >= filterCriteria.priceRange.from &&
                    item.price <= filterCriteria.priceRange.to
            );
        }

        if (filterCriteria.rating) {
            filteredData = filteredData.filter(
                (item) => item.average_rating >= filterCriteria.rating
            );
        }

        setSortedData(filteredData);
    };

    useEffect(() => {
        sortAndFilterData();
    }, [filterCriteria, data]);

    if (!sortedData) {
        return <ProgressLoading />;
    }

    if (sortedData.length === 0) {
        return <EmptyProduct />;
    }

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
                {sortedData.map((item, index) => (
                    <Grid item xs={2.4} key={index}>
                        <ProductItem
                            name={item?.name}
                            imgUrl={item?.thumbnail}
                            rate={item?.average_rating}
                            sold={item?.sold}
                            discount={item?.discount}
                            price={item?.price}
                            href={generateProductHref(item?.name, item?.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </StyledCategoryContainer>
    );
}
