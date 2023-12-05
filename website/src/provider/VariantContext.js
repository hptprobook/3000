"use client";
import React, { createContext, useState } from "react";

export const VariantContext = createContext();

export const VariantProvider = ({ children }) => {
    const [activeText, setActiveText] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <VariantContext.Provider
            value={{ activeText, setActiveText, totalPrice, setTotalPrice }}
        >
            {children}
        </VariantContext.Provider>
    );
};
