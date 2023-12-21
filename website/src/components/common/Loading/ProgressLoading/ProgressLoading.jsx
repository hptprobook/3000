import { Box, LinearProgress } from "@mui/material";
import React from "react";

export default function ProgressLoading() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: "9999999999999999999999999",
            }}
        >
            <LinearProgress />
        </Box>
    );
}
