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
