import request from "@/utils/request";

const ProductService = {
    getAllProducts: async () => {
        return handleRequest("products");
    },
    getProductById: async (productId) => {
        return handleRequest(`products/${productId}`);
    },
    createProduct: async (productData) => {
        return handleRequest("products", { method: "post", data: productData });
    },
    getRecommendedProduct: async () => {
        return handleRequest("products/recommended");
    },
    updateProduct: async (productId, productData) => {
        return handleRequest(`products/${productId}`, {
            method: "put",
            data: productData,
        });
    },
    deleteProduct: async (productId) => {
        return handleRequest(`products/${productId}`, { method: "delete" });
    },
};

const handleRequest = async (endpoint, params = {}) => {
    try {
        const res = await request.get(endpoint, { params });
        return res.data;
    } catch (err) {
        console.error(`Error fetching data from ${endpoint}:`, err);
        throw err;
    }
};

export default ProductService;
