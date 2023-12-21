"use client";
import NotAuth from "@/components/common/Middleware/NotAuth";
import ProfileOrder from "@/components/layouts/Profile/ProfileOrder/ProfileOrder";
import useAuth from "@/hooks/useAuth";
import { getAllOrder } from "@/redux/slices/orderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileOrderPage() {
    const isAuth = useAuth();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const status = useSelector((state) => state.orders.status);
    const putOrder = useSelector((state) => state.orders.putOrder);

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch, putOrder]);

    if (!isAuth) {
        return <NotAuth />;
    }

    return <ProfileOrder data={orders} />;
}
