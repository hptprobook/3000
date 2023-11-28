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

const BrandService = {
    getTopBrand: async () => {
        return handleRequest("brands/top-brands");
    },
};

export default BrandService;
