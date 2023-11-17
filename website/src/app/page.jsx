"use client";

import Sidebar from "@/components/layouts/Sidebar/Sidebar";
import { Grid } from "@mui/material";
import "@/styles/app.css";
import Banner from "@/components/common/Home/Banner/Banner";

export default function Home() {
    return (
        <Grid className="appContainer" container>
            <Grid item xs={2} className="appContainer__sidebar">
                <Sidebar />
            </Grid>
            <Grid item xs={10} className="appContainer__content">
                <Banner />
            </Grid>
        </Grid>
    );
}
