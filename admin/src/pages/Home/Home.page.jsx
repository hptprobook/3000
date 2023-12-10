import React, { useEffect, useState } from "react";
import { Box, Grid, colors } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import { fetchCategoriesAsync } from "../../redux/slices/categoriesSlice";
import Loading from "../../components/common/Loading/Loading";
import HeaderDashBoard from "../../components/common/HeaderPage/HeaderDashBoard";
import PieChartDashboard from "../../components/common/Chart/PieChartDashboard";


export default function HomePage() {
    return (
        <Box>
            <HeaderDashBoard />
            <Box
                sx={{
                    width: "100%",
                    mt: "16px",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12}>
                        <PieChartDashboard />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        hêlo
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

