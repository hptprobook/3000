"use client";
import ProductTab from "@/components/common/Tabs/ProductTab/ProductTab";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedCategory } from "@/redux/slices/categorySlice";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";

export default function RecommendedProduct() {
    const dispatch = useDispatch();
    const [loadData, setLoadData] = useState(false);
    const { recommended, loading, error } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        if (!loadData && recommended.length === 0) {
            dispatch(fetchRecommendedCategory());
            setLoadData(true);
        }
    }, [loadData, recommended]);

    if (loading) {
        return <CirLoading />;
    }

    if (!loading) {
        return (
            <div className="appContainer__recommended">
                <h4>Bạn có thể thích</h4>
                <ProductTab tabs={recommended} />
            </div>
        );
    }
}
