import React from "react";
import TextField from "@mui/material/TextField";

export default function LoginForm({
    label,
    type,
    onChange,
    value,
    name,
    onBlur,
    error,
    helperText,
    mt = "12px",
    disabled = false,
}) {
    return (
        <TextField
            onChange={onChange}
            type={type}
            value={value}
            name={name}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            disabled={disabled}
            sx={{
                width: "100%",
                marginTop: mt,
                "& .MuiFormLabel-root": {
                    fontFamily: "var(--font-family)",
                },
                "& .MuiInputBase-root": {
                    fontFamily: "var(--font-family)",
                },
                "& .MuiFormHelperText-root.Mui-error": {
                    fontFamily: "var(--font-family)",
                    fontSize: "12px",
                    fontWeight: 500,
                },
            }}
            id="outlined-basic"
            label={label}
            variant="outlined"
        />
    );
}
