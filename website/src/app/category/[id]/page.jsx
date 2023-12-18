"use client";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import CategoryContainer from "@/components/layouts/Category/CategoryContainer";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import { getProductByCatId } from "@/redux/slices/categorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryPage({ params }) {
    console.log(params);
    const dispatch = useDispatch();
    const categoriesDispatch = useSelector((state) => state.categories);
    const status = useSelector((state) => state.categories.status);
    console.log(
        "🚀 ~ file: page.jsx:12 ~ CategoryPage ~ categoriesDispatch:",
        categoriesDispatch
    );

    useEffect(() => {
        dispatch(getProductByCatId(params.id));
    }, []);

    if (status == "loading") {
        return <CirLoading />;
    }

    return (
        <>
            <CategoryContainer data={categoriesDispatch?.productByCatId} />
        </>
    );
}
