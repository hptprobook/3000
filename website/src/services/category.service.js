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
};

export default CategoryService;
