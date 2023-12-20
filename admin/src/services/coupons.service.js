// category.service.js

import request from "../utils/request";


const CouponsService = {
    getAllCoupons: async () => {
        try {
            const res = await request.get("coupons");
            return res;
        } catch (err) {
            throw err;
        }
    },
    getOneBrand: async (id) => {
        try {
            const res = await request.get(`brands/${id}`);
            return res;
        } catch (err) {
            throw err;
        }
    },
    createCoupon: async (data) => {
        try {
            const res = await request.post(`coupons`, data);
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
    updateBrandByID: async (id, data) => {
        try {
            const res = await request.put(`brands/${id}`, data);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
};

export default CouponsService;
