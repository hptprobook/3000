import request from "@/utils/request";

const ReviewService = {
    addReview: async (data) => {
        try {
            const res = await request.post("reviews", data);
            return res;
        } catch (err) {
            return err.response;
        }
    },
};

export default ReviewService;
