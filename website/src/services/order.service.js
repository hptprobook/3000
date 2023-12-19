import request from "@/utils/request";

const OrderService = {
    getAllOrders: async () => {
        try {
            const res = await request.get("orders");
            return res;
        } catch (err) {
            return err.response;
        }
    },
    addOrder: async (data) => {
        try {
            const res = await request.post("orders", data);
            return res;
        } catch (err) {
            return err.response;
        }
    },
    getOrderById: async (id) => {
        try {
            const res = await request.get(`orders/${id}`);
            return res;
        } catch (err) {
            return err.response;
        }
    },
    updateOrder: async (data, id) => {
        try {
            const res = await request.put(`orders/${id}`, data);
            return res;
        } catch (err) {
            return err.response;
        }
    },
    deleteOrder: async (id) => {
        try {
            const res = await request.delete(`orders/${id}`);
            return res;
        } catch (err) {
            return err.response;
        }
    },
};

export default OrderService;
