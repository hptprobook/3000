import request from "@/utils/request";

const CouponService = {
    addCoupon: async (data) => {
        try {
            const res = await request.post("coupon_usages", data);
            return res;
        } catch (err) {
            return {
                error: true,
                message: err.response?.data?.error,
            };
        }
    },

    getAllCoupons: async () => {
        try {
            const res = await request.get("coupons");
            return res;
        } catch (err) {
            return err.response;
        }
    },
};

export default CouponService;
