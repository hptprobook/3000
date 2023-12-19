export const generateProductHref = (productName, productId) => {
    const formattedName = encodeURIComponent(
        productName.toLowerCase().replace(/ /g, "-")
    );
    const formattedId = encodeURIComponent(productId);
    return `/product/${formattedName}-${formattedId}`;
};
