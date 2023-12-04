"use client";
import ProductTab from "@/components/common/Tabs/ProductTab/ProductTab";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopBrand } from "@/redux/slices/brandSlice";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";

export default function TopBrand() {
    const dispatch = useDispatch();
    const [loadData, setLoadData] = useState(false);
    const { topBrand, loading, error } = useSelector((state) => state.brands);

    useEffect(() => {
        if (!loadData) {
            dispatch(fetchTopBrand());
            if (loading) {
                setLoadData(true);
            }
        }
    }, [loadData, dispatch, loading]);

    if (loading) {
        return <CirLoading />;
    }

    return (
        <div className="appContainer__topBrand">
            <h4>Thương hiệu nổi bật</h4>
            <ProductTab tabs={topBrand} />
        </div>
    );
}
