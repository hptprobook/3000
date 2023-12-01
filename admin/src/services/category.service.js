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
  getCategoryById: async (categoryId) => {
    try {
      const res = await request.get(`categories/${categoryId}`);
      return res;
    } catch (err) {
      throw err;
    }
  },
  getAllBrand: async () => {
    try {
      const res = await request.get("brands");
      return res;
    } catch (err) {
      throw err;
    }
  },
};

export default CategoryService;
