import { useState, useCallback } from "react";

export const useVariantSelection = () => {
    const [selectedVariants, setSelectedVariants] = useState({});

    const setVariant = useCallback((variantType, optionName) => {
        setSelectedVariants((prev) => ({ ...prev, [variantType]: optionName }));
    }, []);

    return { selectedVariants, setVariant };
};
