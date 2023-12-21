import request from "@/utils/request";
import { ResetTvSharp } from "@mui/icons-material";

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

    checkCoupon: async (data) => {
        try {
            const res = await request.post("coupons/check", data);
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
