import React from "react";
import { styled } from "@mui/material/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportToExcel } from "../../../utils/excel";

const StyledExportButton = styled("button")(() => ({
    marginTop: "16px",
    border: "none",
    display: "flex",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#488aec",
    color: "#ffffff",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    verticalAlign: "middle",
    alignItems: "center",
    borderRadius: "0.5rem",
    userSelect: "none",
    gap: "0.75rem",
    boxShadow: "0 4px 6px -1px #488aec31, 0 2px 4px -1px #488aec17",
    transition: "all .6s ease",
    "&:hover": {
        boxShadow: "0 10px 15px -3px #488aec4f, 0 4px 6px -2px #488aec17",
    },
    "&:active": {
        opacity: ".85",
        boxShadow: "none",
    },
    "&:focus": {
        opacity: ".85",
        boxShadow: "none",
    },
}));

export default function ExportButton({ data }) {
    console.log("🚀 ~ ExportButton ~ data:", data);
    function handleClick() {
        exportToExcel(data, "DanhSachDonHang");
    }

    return (
        <StyledExportButton onClick={handleClick} aria-label="Xuất file Excel">
            <FileDownloadIcon />
            Export
        </StyledExportButton>
    );
}
