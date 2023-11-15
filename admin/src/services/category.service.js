// category.service.js

import request from "../utils/request";


const CategoryService = {
  getAllCategories: async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const res = await request.get("categories");
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};

export default CategoryService;
