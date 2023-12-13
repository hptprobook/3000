"use client";
import ProfileOrder from "@/components/layouts/Profile/ProfileOrder/ProfileOrder";
import { getAllOrder } from "@/redux/slices/orderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileOrderPage() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const status = useSelector((state) => state.orders.status);

    useEffect(() => {
        if (status == "idle") {
            dispatch(getAllOrder());
        }
    }, [status]);

    return <ProfileOrder data={orders} />;
}
