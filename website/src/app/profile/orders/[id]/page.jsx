"use client";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import ProfileOrderDetail from "@/components/layouts/Profile/ProfileOrder/ProfileOrderDetail";
import { getOrderById } from "@/redux/slices/orderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileDetailOrder({ params }) {
    const dispatch = useDispatch();
    const orderDetail = useSelector((state) => state.orders.order);
    const status = useSelector((state) => state.orders.status);

    useEffect(() => {
        dispatch(getOrderById(params.id));
    }, []);

    if (status === "loading") {
        return <ProgressLoading />;
    }

    return (
        <div>
            <ProfileOrderDetail data={orderDetail} />
        </div>
    );
}
