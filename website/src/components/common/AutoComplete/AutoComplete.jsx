import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoComplete({ data, label }) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data}
            getOptionLabel={(option) => option.name_with_type}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
}
