"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OrderPage() {
    const searchParams = useSearchParams();
    const [cartItemIds, setCartItemIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartItemIds = searchParams.get("cartItemIds");
        const totalPrice = searchParams.get("totalPrice");

        let parsedCartItemIds = [];
        try {
            parsedCartItemIds = cartItemIds ? JSON.parse(cartItemIds) : [];
        } catch (e) {
            console.error("Error parsing cartItemIds:", e);
        }

        setCartItemIds(parsedCartItemIds);
        console.log(
            "🚀 ~ file: page.jsx:22 ~ useEffect ~ parsedCartItemIds:",
            parsedCartItemIds
        );
        setTotalPrice(totalPrice);
        console.log(
            "🚀 ~ file: page.jsx:24 ~ useEffect ~ totalPrice:",
            totalPrice
        );
    }, [searchParams]);

    return (
        <div>
            Bạn đã đặt những đơn hàng {cartItemIds} với giá {totalPrice}
        </div>
    );
}
