import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ label, date }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={["DatePicker"]}
                sx={{
                    width: "100%",
                    "& .MuiFormControl-root": {
                        width: "100%",
                        marginTop: "20px",
                    },
                }}
            >
                <DatePicker defaultValue={dayjs(date)} label={label} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
