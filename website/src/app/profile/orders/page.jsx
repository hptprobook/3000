"use client";
import NotAuth from "@/components/common/Middleware/NotAuth";
import ProfileOrder from "@/components/layouts/Profile/ProfileOrder/ProfileOrder";
import useAuth from "@/hooks/useAuth";
import { getAllOrder } from "@/redux/slices/orderSlice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProfileOrderPage() {
    const params = useSearchParams();
    const statusParams = params.get("status");
    const [toastShown, setToastShown] = useState(false);

    const isAuth = useAuth();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const putOrder = useSelector((state) => state.orders.putOrder);

    useEffect(() => {
        if (!toastShown) {
            if (statusParams === "success") {
                toast.success("Thanh toán thành công đơn hàng!", {
                    autoClose: 2000,
                });
                setToastShown(true);
            } else if (statusParams === "error") {
                toast.error("Thanh toán thất bại. Đơn hàng đã bị hủy!", {
                    autoClose: 2000,
                });
                setToastShown(true);
            }
        }

        dispatch(getAllOrder());
    }, [dispatch, putOrder, statusParams, toastShown]);

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch, putOrder]);

    if (!isAuth) {
        return <NotAuth />;
    }

    return <ProfileOrder data={orders} />;
}
