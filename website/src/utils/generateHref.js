export const generateProductHref = (productName, productId) => {
    const formattedName = encodeURIComponent(
        productName.toLowerCase().replace(/ /g, "-")
    );
    const formattedId = encodeURIComponent(productId);
    return `/product/${formattedName}-${formattedId}`;
};

export const generateCategoryHref = (categoryName, categoryId) => {
    const formattedName = encodeURIComponent(
        categoryName.toLowerCase().replace(/ /g, "-")
    );

    const formattedId = encodeURIComponent(categoryId);
    return `/category/${formattedName}-${formattedId}`;
};
