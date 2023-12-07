import React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function IconField({ text, icon, value }) {
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
                startAdornment={
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}
