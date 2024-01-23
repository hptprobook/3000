"use client";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import CategoryContainer from "@/components/layouts/Category/CategoryContainer";
import { getProductByCatId } from "@/redux/slices/categorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryPage({ params }) {
    const dispatch = useDispatch();
    const categoriesDispatch = useSelector((state) => state.categories);
    const status = useSelector((state) => state.categories.status);
    const categoryId = params.slug ? params.slug.split("-").pop() : null;

    useEffect(() => {
        dispatch(getProductByCatId(categoryId));
    }, []);

    if (status === "loading") {
        return <ProgressLoading />;
    }

    return (
        <>
            <CategoryContainer data={categoriesDispatch?.productByCatId} />
        </>
    );
}
