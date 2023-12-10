// category.service.js

import request from "../utils/request";


const OrdersService = {
    getAllOrders: async () => {
        try {
            const res = await request.get("orders/get_all");
            return res;
        } catch (err) {
            throw err;
        }
    },
    getOneOrder: async (id) => {
        try {
            const res = await request.get(`orders/${id}`);
            return res;
        } catch (err) {
            throw err;
        }
    },
};

export default OrdersService;
