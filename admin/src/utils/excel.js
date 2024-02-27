import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName = "data") => {
    const newData = data.map((item) => ({
        ID: item.id,
        "Tên khách hàng": item.address.name,
        "Số điện thoại": item.address.phone,
        "Tổng Tiền": item.total_amount,
        "Địa chỉ giao hàng": item.address.address_info,
        "Phí Vận Chuyển": item.ship_fee,
        "Giảm Giá": item.discount,
        "Trạng Thái": item.status,
        "Ghi Chú": item.note,
        "Ngày đặt hàng": item.created_at,
    }));

    const worksheet = XLSX.utils.json_to_sheet(newData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const exportFileName = `${fileName}.xlsx`;

    XLSX.writeFile(workbook, exportFileName, { compression: true });
};
