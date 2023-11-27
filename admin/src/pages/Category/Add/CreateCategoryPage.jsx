import React, { useState } from "react";
import "./style.css";
import InputEdit from "../../../components/common/TextField/InputEdit";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { Box, Grid } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";

export default function CreateCategoryPage() {
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

  return (
    <Box>
      <HeaderPage
        namePage={"Tạo mới"}
        Breadcrumb={["Phân loại", "Tạo"]}
      />
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
            <InputEdit
              type="number"
              name="parent_id"
              label="Phân loại cha"
              value={categoryData.parent_id || ""}
              onChange={handleInputChange}
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
