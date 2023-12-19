import request from "@/utils/request";

const SearchService = {
    searchWithKeyword: async (searchValue) => {
        try {
            const endpoint = `search/${searchValue}`;
            const res = await request.get(endpoint);
            return res;
        } catch (err) {
            return err.response;
        }
    },
};

export default SearchService;
