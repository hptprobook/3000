// category.service.js

import request from "../utils/request";

const CategoryService = {
  getAllCategories: async () => {
    try {
      const res = await request.get("categories");
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};

export default CategoryService;
