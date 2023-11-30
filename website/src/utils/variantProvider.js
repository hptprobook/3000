import React, { createContext, useState, useContext } from "react";

const VariantSelectionContext = createContext();

export const useVariantSelection = () => {
    return useContext(VariantSelectionContext);
};

export const VariantSelectionProvider = ({ children }) => {
    const [selectedVariants, setSelectedVariants] = useState({});

    const setVariant = (variantType, optionName) => {
        setSelectedVariants((prev) => ({ ...prev, [variantType]: optionName }));
    };

    return (
        <VariantSelectionContext.Provider
            value={{ selectedVariants, setVariant }}
        >
            {children}
        </VariantSelectionContext.Provider>
    );
};
