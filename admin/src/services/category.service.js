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
        return res.data; // Trả về dữ liệu từ phản hồi API thay vì toàn bộ response
      } catch (err) {
        if (err.response) {
          // Xử lý khi nhận được phản hồi từ server với mã lỗi
          console.error('Error creating category:', err.response.data);
          throw new Error(err.response.data.message || 'Có lỗi xảy ra khi tạo danh mục.'); // Sử dụng thông điệp từ phản hồi hoặc một thông điệp mặc định
        } else if (err.request) {
          // Xử lý khi yêu cầu không nhận được phản hồi từ server
          console.error('No response received:', err.request);
          throw new Error('Không thể kết nối đến server.'); // Thông báo lỗi kết nối
        } else {
          // Xử lý lỗi không xác định
          console.error('Error creating category:', err);
          throw new Error('Đã xảy ra lỗi không xác định.'); // Thông báo lỗi không xác định
        }
      }
    },
};

export default CategoryService;
