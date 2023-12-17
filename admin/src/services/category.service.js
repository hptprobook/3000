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
    createCategory: async (data) => {
      try {
          const res = await request.post(`categories`, data);
          return res;
      } catch (err) {
          throw err;
      }
  },
  deleteCategoryByID: async (id) => {
    try {
        const res = await request.delete(`categories/${id}`);
        return res.data;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    }
},
    updateCategoryByID: async (categoryId, data) => {
      try {
          const res = await request.put(`categories/${categoryId}`, data);
          return res.data;
      } catch (err) {
          console.log("Error: ", err);
          throw err;
      }
  },
};

export default CategoryService;
