import requestGHN from "@/utils/requestGHN";

const DeliveryService = {
    getProvinces: async () => {
        try {
            const res = await requestGHN.get("master-data/province");
            return res.data;
        } catch (err) {
            return err.response;
        }
    },
    getDistricts: async (provinceId) => {
        try {
            const res = await requestGHN.post(
                "master-data/district",
                provinceId
            );
            return res.data;
        } catch (err) {
            return err.response;
        }
    },
    getWards: async (districtId) => {
        try {
            const res = await requestGHN.post("master-data/ward", districtId);
            return res.data;
        } catch (err) {
            return err.response;
        }
    },
    getFee: async (data) => {
        try {
            const res = await requestGHN.post("v2/shipping-order/fee", data);
            return res.data;
        } catch (err) {
            return err.response;
        }
    },
    getService: async (data) => {
        try {
            const res = await requestGHN.post(
                "v2/shipping-order/available-services",
                data
            );
            return res.data;
        } catch (err) {
            return err.response;
        }
    },
};

export default DeliveryService;
