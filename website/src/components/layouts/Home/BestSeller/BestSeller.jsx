"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import ProductTab from "@/components/common/Tabs/ProductTab/ProductTab";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellerCategory } from "@/redux/slices/categorySlice";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";

export default function BestSeller() {
    const dispatch = useDispatch();
    const { bestSeller, loading, error } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        dispatch(fetchBestSellerCategory());
    }, []);

    if (loading) {
        return <CirLoading />;
    }

    return (
        <div className="appContainer__bestSeller">
            <h4>Sản phẩm bán chạy</h4>
            <ProductTab tabs={bestSeller} />
        </div>
    );
}
