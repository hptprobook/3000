// category.service.js

import request from "../utils/request";


const OrdersService = {
    getAllOrders: async () => {
        try {
            const res = await request.get("orders");
            return res;
        } catch (err) {
            throw err;
        }
    },
};

export default OrdersService;
