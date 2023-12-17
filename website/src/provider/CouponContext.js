"use client";
import React, { createContext, useContext, useState } from "react";

const CouponContext = createContext();

export const useCouponContext = () => useContext(CouponContext);

export const CouponProvider = ({ children }) => {
    const [coupon, setCoupon] = useState(null);

    const addContextCoupon = (newCoupon) => {
        setCoupon(newCoupon);
    };

    const clearCoupon = () => {
        setCoupon(null);
    };

    return (
        <CouponContext.Provider
            value={{ coupon, addContextCoupon, clearCoupon }}
        >
            {children}
        </CouponContext.Provider>
    );
};
