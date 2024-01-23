import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import CategorySidebar from "@/components/layouts/Category/CategorySidebar";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import { CategoryProvider } from "@/provider/CategoryContext";
import { Grid } from "@mui/material";
import React from "react";

export default function CategoryLayout({ children }) {
    return (
        <>
            <Grid container className="appContainer__category">
                <Grid item xs={12}>
                    <Breadcrumb
                        link="/"
                        text1={"Trang chủ"}
                        text2={"Danh mục"}
                    />
                </Grid>
                <CategoryProvider>
                    <Grid item xs={2}>
                        <CategorySidebar />
                    </Grid>
                    <Grid item xs={10}>
                        {children}
                    </Grid>
                </CategoryProvider>
            </Grid>
            <div
                style={{
                    width: "100%",
                    padding: "0 300px",
                    margin: "0 auto",
                    backgroundColor: "#fff",
                }}
            >
                <HomeFooter />
            </div>
        </>
    );
}
