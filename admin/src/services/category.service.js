// category.service.js

import request from "../utils/request";


const CategoryService = {
  getAllCategories: async () => {
    try {
      const res = await request.get("categories");
      return res;
    } catch (err) {
      throw err;
    }
  },
};

export default CategoryService;
