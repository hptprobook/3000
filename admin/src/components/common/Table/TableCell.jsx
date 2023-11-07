import React from 'react'
const CustomTableCell = styled(TableCell)`
  background-color: lightblue; // Tùy chỉnh màu nền của ô bảng
  color: #333; // Tùy chỉnh màu văn bản của ô bảng
  font-weight: bold; // Tùy chỉnh độ đậm của văn bản
`;
const TableCell = () => {
    return (
        <div>TableCell</div>
    )
}

export default TableCell