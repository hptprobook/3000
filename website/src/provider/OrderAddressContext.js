"use client";
import React, { createContext, useState, useContext } from "react";

const OrderAddressContext = createContext();

export const OrderAddressProvider = ({ children }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressesList, setAddressesList] = useState([]);
    const [deliveryFee, setDeliveryFee] = useState(0);

    const selectAddress = (address) => {
        setSelectedAddress(address);
    };

    return (
        <OrderAddressContext.Provider
            value={{
                selectedAddress,
                selectAddress,
                deliveryFee,
                setDeliveryFee,
                addressesList,
                setAddressesList,
            }}
        >
            {children}
        </OrderAddressContext.Provider>
    );
};

export const useOrderAddressContext = () => useContext(OrderAddressContext);
