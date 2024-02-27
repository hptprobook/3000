"use client";
import React, { createContext, useContext, useState } from "react";

export const PaymentMethodContext = createContext();

export const usePaymentMethodContext = () => useContext(PaymentMethodContext);

export const PaymentMethodProvider = ({ children }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");

    const updatePaymentMethod = (items) => {
        setSelectedPaymentMethod(items);
    };

    const PaymentMethodContextValue = {
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        updatePaymentMethod,
    };

    return (
        <PaymentMethodContext.Provider value={PaymentMethodContextValue}>
            {children}
        </PaymentMethodContext.Provider>
    );
};
