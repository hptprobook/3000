"use client";
import React, { createContext, useState } from "react";

export const VariantContext = createContext();

export const VariantProvider = ({ children }) => {
    const [activeText, setActiveText] = useState([]);

    return (
        <VariantContext.Provider value={{ activeText, setActiveText }}>
            {children}
        </VariantContext.Provider>
    );
};
