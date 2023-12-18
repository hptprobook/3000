// category.service.js

import request from "../utils/request";

const ProductsService = {
    getAllProducts: async () => {
        try {
            const res = await request.get("products");
            return res.data;
        } catch (err) {
            throw err;
        }
    },
    createProduct: async (data) => {
        try {
            const res = await request.post(`products`, data);
            return res.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};

export default ProductsService;
