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
    getCoupon: async (id) => {
        try {
            const res = await request.get(`coupons/${id}`);
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
    deleteCouponByID: async (id) => {
        try {
            const res = await request.delete(`coupons/${id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    },
    updateCouponByID: async (id, data) => {
        try {
            const res = await request.put(`coupons/${id}`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    },
};

export default CouponsService;
