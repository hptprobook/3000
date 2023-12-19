"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Rating from "@/components/common/Rating/Rating";
import FilterComment from "@/components/common/Button/FilterComment/FilterComment";
import { useCategoryContext } from "@/provider/CategoryContext";

const StyledCategorySidebar = styled("div")(() => ({
    backgroundColor: "#fff",
    marginRight: "4px",
    padding: "12px",
    "& ul": {
        marginTop: "6px",
        "& li": {
            padding: "4px 0",
            fontSize: "13px",
        },
    },
    "& .filter-price": {
        marginTop: "6px",
        "& input": {
            width: "48%",
            height: "32px",
            outline: "none",
            borderRadius: "4px",
            border: "1px solid #888",
            paddingLeft: "8px",
            "&.from": {
                marginRight: "2px",
            },
            "&.to": {
                marginLeft: "2px",
            },
        },
        "& .btn": {
            marginTop: "6px",
            border: "1px solid #0b74e5",
            width: "100%",
            height: "30px",
            backgroundColor: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
            color: "#0b74e5",
        },
    },
}));

export default function CategorySidebar() {
    const { updateFilter } = useCategoryContext(); // Sử dụng context

    const handleRatingFilter = (rating) => {
        updateFilter({ rating });
    };

    const priceRanges = {
        "dưới 1 triệu": { from: 0, to: 1000000 },
        "từ 1 - 5 triệu": { from: 1000000, to: 5000000 },
        "trên 5 triệu": { from: 5000000, to: Infinity },
    };
    const [selectedPriceRanges, setSelectedPriceRanges] = useState({});

    const handlePriceFilter = (priceRangeKey) => {
        const priceRange = priceRanges[priceRangeKey];
        setSelectedPriceRanges((prevRanges) => ({
            ...prevRanges,
            [priceRangeKey]: !prevRanges[priceRangeKey],
        }));
        updateFilter({ priceRange });
    };

    useEffect(() => {
        const selectedKeys = Object.keys(selectedPriceRanges).filter(
            (key) => selectedPriceRanges[key]
        );

        if (selectedKeys.length > 0) {
            const combinedRange = {
                from: Math.min(
                    ...selectedKeys.map((key) => priceRanges[key].from)
                ),
                to: Math.max(...selectedKeys.map((key) => priceRanges[key].to)),
            };
            updateFilter({ priceRange: combinedRange });
        } else {
            // Nếu không có lựa chọn nào, xóa bộ lọc giá
            updateFilter({ priceRange: null });
        }
    }, [selectedPriceRanges]);

    const handlePriceRange = () => {
        const fromPrice = document.querySelector(".filter-price .from").value;
        const toPrice = document.querySelector(".filter-price .to").value;
        updateFilter({ priceRange: { from: fromPrice, to: toPrice } });
    };

    return (
        <StyledCategorySidebar>
            <h5>Danh mục sản phẩm</h5>
            <ul className="child-cat ul-list">
                <li>
                    <Link href={""}>Đồ dùng nhà bếp</Link>
                </li>
                <li>
                    <Link href={""}>Thiết bị gia đình</Link>
                </li>
            </ul>
            <h5
                style={{
                    marginTop: "6px",
                    borderTop: "1px solid #f7f7f7",
                    paddingTop: "4px",
                }}
            >
                Lọc theo đánh giá
            </h5>
            <ul className="filter-rate ul-list">
                {[5, 4, 3, 2, 1].map((rate) => (
                    <li
                        key={rate}
                        className="d-flex"
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() => handleRatingFilter(rate)}
                    >
                        <Rating rate={rate} size={13} /> từ {rate} sao
                    </li>
                ))}
            </ul>
            <h5
                style={{
                    marginTop: "6px",
                    borderTop: "1px solid #f7f7f7",
                    paddingTop: "4px",
                }}
            >
                Lọc theo giá
            </h5>
            <ul className="ul-list">
                {Object.keys(priceRanges).map((priceRangeKey) => (
                    <li
                        key={priceRangeKey}
                        onClick={() => handlePriceFilter(priceRangeKey)}
                    >
                        <FilterComment
                            text={priceRangeKey}
                            isActive={selectedPriceRanges[priceRangeKey]}
                        />
                    </li>
                ))}
            </ul>
            <h5
                style={{
                    marginTop: "6px",
                    borderTop: "1px solid #f7f7f7",
                    paddingTop: "4px",
                }}
            >
                Lọc theo khoảng giá
            </h5>
            <div className="filter-price">
                <input
                    className="from"
                    type="number"
                    placeholder="giá từ ..."
                />
                <input className="to" type="number" placeholder="... đến" />
                <button className="btn" onClick={handlePriceRange}>
                    Áp dụng
                </button>
            </div>
        </StyledCategorySidebar>
    );
}
