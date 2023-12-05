// category.service.js

import request from "../utils/request";


const BrandsService = {
    getAllBrand: async () => {
        try {
            const res = await request.get("brands");
            return res;
        } catch (err) {
            throw err;
        }
    },
};

export default BrandsService;
