import React, { useEffect, useState } from "react";
import "./style.css";
import InputEdit from "../../../components/common/TextField/InputEdit";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { Box, Grid } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";

export default function CreateCategoryPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data); // Access categories from Redux store

  const [categoryData, setCategoryData] = useState({
    name: "",
    parent_id: null,
    icon_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here.

    // Clear the form fields after submission if needed.
    setCategoryData({
      name: "",
      parent_id: null,
      icon_url: "",
    });
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Box>
      <HeaderPage
        namePage={"Tạo mới"}
        Breadcrumb={["Phân loại", "Tạo"]}
      />
      <Box sx={{
                marginTop: '32px'
            }}></Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputEdit
              type="text"
              name="name"
              label="Tên"
              value={categoryData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
          <SelectEdit
              label={'Phân loại'}
              data={categories} // Use categories fetched from Redux store
              value={categoryData.category_id} // Assuming this holds the selected category ID
              onChange={(e) => handleInputChange(e)} // Assuming the select value should be stored in category_id
            />
          </Grid>
          <Grid item xs={12}>
            <InputEdit
              type="text"
              name="icon_url"
              label="Đường dẫn"
              value={categoryData.icon_url}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonNormal
              variant="contained"
              label={"Thêm"}
              bg="true"
              type="submit"
              sx={{ marginTop: "16px" }}
            ></ButtonNormal>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
