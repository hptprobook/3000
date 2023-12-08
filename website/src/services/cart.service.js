import request from "@/utils/request";

const CartService = {
    addToCart: async (data) => {
        try {
            const res = await request.post("carts", data);
            return res;
        } catch (err) {
            return err.response;
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
};

export default CartService;