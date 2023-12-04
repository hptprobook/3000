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
    // ... Các hàm khác
    createCategory: async (categoryData) => {
      try {
        const res = await request.post("categories", categoryData);
        return res;
      } catch (err) {
        throw err;
      }
  },
};

export default CategoryService;
