import React, { useState } from "react";
import ProductDetailInfo from "../ProductDetailContainer/ProductDetailInfo/ProductDetailInfo";
import ProductDetailAdd from "../ProductDetailAdd/ProductDetailAdd";

export default function ProductPage() {
    const [selectedVariants, setSelectedVariants] = useState({});

    const handleVariantChange = (variantType, optionName) => {
        setSelectedVariants((prev) => ({ ...prev, [variantType]: optionName }));
    };

    return (
        <>
            <ProductDetailInfo onVariantChange={handleVariantChange} />
            <ProductDetailAdd selectedVariants={selectedVariants} />
        </>
    );
}
