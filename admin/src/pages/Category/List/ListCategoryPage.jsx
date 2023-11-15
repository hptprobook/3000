// ListCategoriesPage.js (React component)

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "~/redux/slices/categoriesSlice";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";

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
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ListCategoriesPage;
