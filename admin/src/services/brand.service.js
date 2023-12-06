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
    createBrand: async (data) => {
        try {
            const res = await request.post(`brands`, data);
            return res;
        } catch (err) {
            throw err;
        }
    },
    deleteBrandByID: async (id) => {
        try {
            const res = await request.delete(`brands/${id}`);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
};

export default BrandsService;
