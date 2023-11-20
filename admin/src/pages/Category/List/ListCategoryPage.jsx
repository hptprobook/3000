// ListCategoriesPage.js (React component)

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "~/redux/slices/categoriesSlice";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import { Box } from "@mui/material";

const ListCategoriesPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Loading categories...</p>;
  }

  if (status === "failed" || !categories) {
    console.log(categories)
    return <p>Error loading categories: {categories?.error || "Failed to load categories."}</p>;
  }

  return (
    <>
      <HeaderPage
                namePage={"Phân loại"}
                Breadcrumb={["Phân loại", "Danh sách"]}
                ButtonLink="/category/create"
      />
        <Box sx={{ width: '100%', mt: '16px', backgroundColor: '#111927', borderRadius: '13px' }}>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </Box>
    </>
  );
};

export default ListCategoriesPage;
