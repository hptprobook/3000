import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import CategorySidebar from "@/components/layouts/Category/CategorySidebar";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import { Grid } from "@mui/material";
import React from "react";

export default function CategoryLayout({ children }) {
    return (
        <Grid container className="appContainer__category">
            <Grid item xs={12}>
                <Breadcrumb />
            </Grid>
            <Grid item xs={2}>
                <CategorySidebar />
            </Grid>
            <Grid item xs={10}>
                {children}
            </Grid>
            <Grid item xs={12}>
                <HomeFooter />
            </Grid>
        </Grid>
    );
}
