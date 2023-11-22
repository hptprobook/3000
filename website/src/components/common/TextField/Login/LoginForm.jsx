import React from "react";
import TextField from "@mui/material/TextField";

export default function LoginForm({ label, type }) {
    return (
        <>
            <TextField
                type={type}
                sx={{
                    width: "100%",
                    marginTop: "12px",
                    "& .MuiFormLabel-root": {
                        fontFamily: "var(--font-family)",
                    },
                    "& .MuiInputBase-root": {
                        fontFamily: "var(--font-family)",
                    },
                }}
                id="outlined-basic"
                label={label}
                variant="outlined"
            />
        </>
    );
}
