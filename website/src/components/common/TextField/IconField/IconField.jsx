import React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

export default function IconField({
    text,
    icon,
    value,
    onBlur,
    onChange,
    error,
    helperText,
    name,
}) {
    return (
        <FormControl
            variant="standard"
            sx={{
                width: "270px",
                "& .MuiFormLabel-root": {
                    fontFamily: "var(--font-family)",
                },
                "& .MuiInputBase-input": {
                    fontFamily: "var(--font-family)",
                },
            }}
        >
            <InputLabel htmlFor="input-with-icon-adornment">{text}</InputLabel>
            <Input
                id="input-with-icon-adornment"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                helperText={helperText}
                name={name}
                startAdornment={
                    <InputAdornment position="start">{icon}</InputAdornment>
                }
            />
        </FormControl>
    );
}
