import request from "@/utils/request";

const CartService = {
    addToCart: async (data) => {
        try {
            const res = await request.post("carts", data);
            return res;
        } catch (err) {
            return {
                error: true,
                message: err.response?.data?.errors,
            };
        }
    },
    fetchAllCart: async () => {
        try {
            const res = await request.get("carts");
            return res;
        } catch (err) {
            return err.response;
        }
    },
    fetchWithIds: async (data) => {
        try {
            const res = await request.post("carts/get_cart_with_ids", data);
            return res;
        } catch (err) {
            return err.response;
        }
    },
    updateCart: async (data) => {
        try {
            const res = await request.post("carts/ids", data);
            return res;
        } catch (err) {
            return err.response;
        }
    },
    deleteCart: async (id) => {
        try {
            const res = await request.delete(`carts/${id}`);
            return res;
        } catch (err) {
            return err.response;
        }
    },
};

export default CartService;
