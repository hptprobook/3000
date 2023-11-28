import { Grid } from "@mui/material";
import React from "react";

export default function ProductDetail({ params }) {
    const productId = params.slug ? params.slug.split("-").pop() : null;

    return (
        <>
            <div
                style={{
                    width: "var(--max-width)",
                    margin: "auto",
                    padding: "15px 0",
                }}
                className="appBreadcrumb"
            >
                Trang chủ - Sản phẩm số {productId}
            </div>
            <Grid className="appContainer" container>
                <Grid item xs={3.5}>
                    Tab 1
                </Grid>
                <Grid item xs={5}>
                    Tab 2
                </Grid>
                <Grid item xs={3.5}>
                    Tab 3
                </Grid>
            </Grid>
        </>
    );
}
