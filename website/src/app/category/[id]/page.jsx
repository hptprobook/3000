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

    useEffect(() => {
        dispatch(getProductByCatId(params.id));
    }, []);

    if (status == "loading") {
        return <ProgressLoading />;
    }

    return (
        <>
            <CategoryContainer data={categoriesDispatch?.productByCatId} />
        </>
    );
}
