import request from "../utils/request";

const ReportService = {
    getBasicReport: async () => {
        try {
            const res = await request.get("dashboard/report");
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    getOrderReportToChart: async (data) => {
        try {
            const res = await request.post("report/chart/order", data);
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    getAmountReportToChart: async (data) => {
        try {
            const res = await request.post("report/chart/amount", data);
            return res.data;
        } catch (err) {
            throw err;
        }
    },
};

export default ReportService;
