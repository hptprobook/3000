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
};

export default ProductsService;
