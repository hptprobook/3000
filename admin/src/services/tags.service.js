import request from "../utils/request";

const TagsService = {
    getAllTags: async () => {
        try {
            const res = await request.get("tags");
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    updateTagByID: async (id, data) => {
        try {
            const res = await request.put(`tags/${id}`, data);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    getTagByID: async (id) => {
        try {
            const res = await request.get(`tags/${id}`);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    deleteTagByID: async (id) => {
        try {
            const res = await request.delete(`tags/${id}`);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    createTag: async (dataCreate) => {
        try {
            const res = await request.post("tags", dataCreate);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
};

export default TagsService;
