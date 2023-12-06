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
        const defaultData = {
            service_id: 53321,
            from_district_id: 1552,
            coupon: null,
            height: 5,
            length: 5,
            weight: 500,
            width: 5,
        };
        try {
            const payload = { ...defaultData, ...data };
            const res = await requestGHN.post("master-data/fee", payload);
            return res.data;
        } catch (err) {
            return err.response;
        }
    },
};

export default DeliveryService;
