import request from "@/utils/request";

const handleRequest = async (endpoint, params = {}) => {
    try {
        const res = await request.get(endpoint, { params });
        return res.data;
    } catch (err) {
        console.error(`Error fetching data from ${endpoint}:`, err);
        throw err;
    }
};

const AddressService = {
    getAddress: async () => {
        return handleRequest("addresses");
    },
    getProvinceGHN: async () => {
        try {
            const res = await request.get("addresses/getProvinceGHN");
            return res;
        } catch (err) {
            return err.response;
        }
    },
    getAddressById: async (id) => {
        try {
            const res = await request.get(`addresses/${id}`);
            return res;
        } catch (err) {
            return err.response;
        }
    },
    postAddress: async (data) => {
        try {
            const res = await request.post("addresses", data);
            return res;
        } catch (err) {
            return err.response;
        }
    },
    updateAddress: async (data, id) => {
        try {
            const res = await request.put(`addresses/${id}`, data);
            return res;
        } catch (err) {
            return err.response;
        }
    },
    deleteAddress: async (id) => {
        try {
            const res = await request.delete(`addresses/${id}`);
            return res;
        } catch (err) {
            return err.response;
        }
    },
};

export default AddressService;
