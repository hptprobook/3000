"use client";
import React, { createContext, useState } from "react";

export const AddToCartContext = createContext();
export const AddToCartProvider = ({ children }) => {
    const [addToCartSuccess, setAddToCartSuccess] = useState(false);

    const resetAddToCartSuccess = () => {
        setAddToCartSuccess(false);
    };

    return (
        <AddToCartContext.Provider
            value={{
                addToCartSuccess,
                setAddToCartSuccess,
                resetAddToCartSuccess,
            }}
        >
            {children}
        </AddToCartContext.Provider>
    );
};
