"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import ProductTab from "@/components/common/Tabs/ProductTab/ProductTab";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellerCategory } from "@/redux/slices/categorySlice";

export default function BestSeller() {
    const dispatch = useDispatch();
    const [loadData, setLoadData] = useState(false);
    const { bestSeller, loading, error } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        if (!bestSeller || bestSeller.length === 0) {
            dispatch(fetchBestSellerCategory());
        }
    }, []);

    console.log(
        "🚀 ~ file: BestSeller.jsx:12 ~ BestSeller ~ bestSeller:",
        bestSeller
    );

    return (
        <div className="appContainer__bestSeller">
            <h4>Sản phẩm bán chạy</h4>
            <ProductTab tabs={bestSeller} />
        </div>
    );
}
