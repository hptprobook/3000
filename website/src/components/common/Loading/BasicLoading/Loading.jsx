import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function BasicLoading() {
    return (
        <Box
            sx={{
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "9999999999999999999999999",
            }}
        >
            <CircularProgress />
        </Box>
    );
}
