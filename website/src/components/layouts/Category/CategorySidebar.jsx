"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Rating from "@/components/common/Rating/Rating";
import FilterComment from "@/components/common/Button/FilterComment/FilterComment";

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
                <li>
                    <Link href={""} className="d-flex">
                        <Rating rate={5} size={13} /> từ 5 sao
                    </Link>
                </li>
                <li>
                    <Link href={""} className="d-flex">
                        <Rating rate={4} size={13} /> từ 4 sao
                    </Link>
                </li>
                <li>
                    <Link href={""} className="d-flex">
                        <Rating rate={3} size={13} /> từ 3 sao
                    </Link>
                </li>
                <li>
                    <Link href={""} className="d-flex">
                        <Rating rate={2} size={13} /> từ 2 sao
                    </Link>
                </li>
                <li>
                    <Link href={""} className="d-flex">
                        <Rating rate={1} size={13} /> từ 1 sao
                    </Link>
                </li>
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
                <li>
                    <FilterComment text={"dưới 1 triệu"} />
                </li>
                <li>
                    <FilterComment text={"từ 1 - 5 triệu"} />
                </li>
                <li>
                    <FilterComment text={"trên 5 triệu"} />
                </li>
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
                    name="from"
                    type="number"
                    placeholder="giá từ ..."
                />
                <input className="to" type="number" placeholder="... đến" />
                <button className="btn">Áp dụng</button>
            </div>
        </StyledCategorySidebar>
    );
}
