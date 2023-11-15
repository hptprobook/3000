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

const handleRequest = async (endpoint, config = {}) => {
    try {
        const res = await request({
            url: endpoint,
            ...config,
        });
        return res.data;
    } catch (err) {
        console.error(`Error fetching data from ${endpoint}:`, err);
        throw err;
    }
};

export default ProductService;
