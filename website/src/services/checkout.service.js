import request from "@/utils/request";

const CheckoutService = {
    createVNPCheckout: async (data) => {
        try {
            const res = await request.post("order/vnpay", data);
            return res;
        } catch (err) {
            return err.response;
        }
    },

    returnVNPCheckout: async () => {
        try {
            const res = await request.get("order/vnpay/return");
            return res;
        } catch (err) {
            return err.response;
        }
    },
};

export default CheckoutService;
