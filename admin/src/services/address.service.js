import request from "../utils/request";

const AddressService = {
    getProvinces: async () => {
        try {
            const res = await request.get("addresses/getProvinces");
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    getDistricts: async (id) => {
        try {
            const res = await request.get(`addresses/getDistricts/${id}`);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    getWards: async (id) => {
        try {
            const res = await request.get(`addresses/getWards/${id}`);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
};

export default AddressService;
