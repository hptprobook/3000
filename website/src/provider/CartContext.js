"use client";
import React, { createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [quantity, setQuantity] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItemIds, setCartItemIds] = useState();

    const updateCartItems = (items) => {
        setCartItems(items);
    };

    const cartContextValue = {
        quantity,
        setQuantity,
        totalPrice,
        setTotalPrice,
        cartItemIds,
        setCartItemIds,
        cartItems,
        updateCartItems,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};
