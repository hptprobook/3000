import request from "@/utils/request";

const handleRequest = async (endpoint, params = {}) => {
    try {
        const res = await request.get(endpoint, { params });
        return res.data;
    } catch (err) {
        console.error(`Error fetching data from ${endpoint}:`, err);
        throw err;
    }
};

const CategoryService = {
    getParentCategory: async () => {
        return handleRequest("categories/main");
    },

    getBestSellerCategory: async () => {
        return handleRequest("categories/best-seller");
    },

    getRecommendedCategory: async () => {
        return handleRequest("categories/recommended");
    },

    getProductByCatId: async (id) => {
        try {
            const res = await request.get(`categories/getProductByCatId/${id}`);
            return res.data;
        } catch (err) {
            return err.response;
        }
    },
};

export default CategoryService;
