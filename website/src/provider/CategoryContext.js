"use client";
import React, { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
    const [filterCriteria, setFilterCriteria] = useState({
        priceRange: null,
        rating: null,
        price: null,
    });

    const updateFilter = (newCriteria) => {
        setFilterCriteria({ ...filterCriteria, ...newCriteria });
    };

    return (
        <CategoryContext.Provider value={{ filterCriteria, updateFilter }}>
            {children}
        </CategoryContext.Provider>
    );
};
