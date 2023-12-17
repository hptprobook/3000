import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';
import './style.css';
import FormatVND from '../Function/FormatVND';
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const CustomCellHead = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid rgb(45, 55, 72)',
    padding: '16px 16px 16px 24px',
    color: '#9da4ae',
    '& .MuiButtonBase-root.MuiTableSortLabel-root.Mui-active': {
        color: '#edf2f7 !important',
    },
    '& .MuiButtonBase-root.MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon': {
        color: '#edf2f7 !important',
    },
    '& :hover ': {
        color: '#edf2f7 !important',
    }
}));
const CustomTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid rgb(45, 55, 72)',
    color: '#edf2f7',
    padding: '16px 16px 16px 24px'
}));
export default function TableOrderProducts({ data }) {
    return (
        <div className='TableListProductOrder' style={{ backgroundColor: color.backgroundColorSub.dark }}>
            <h6 style={{ color: color.textColor.dark }}>Danh sách sản phẩm</h6>
            <TableContainer component={Paper} sx={{ borderRadius: '0px', boxShadow: 'none' }}>
                <Table sx={{
                    minWidth: 650,
                }}
                    aria-label="Danh sách sản phẩm">
                    <TableHead
                        sx={{
                            backgroundColor: 'rgb(28, 37, 54)',
                        }}>
                        <TableRow>
                            <CustomCellHead>Tên sản phẩm</CustomCellHead>
                            <CustomCellHead align="right">Hình ảnh</CustomCellHead>
                            <CustomCellHead align="right">Số lượng</CustomCellHead>
                            <CustomCellHead align="right">Giá</CustomCellHead>
                            <CustomCellHead align="right">Giảm giá</CustomCellHead>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            '& .MuiTableRow-root': {
                                backgroundColor: '#111927',
                            },
                            '& .MuiTableRow-root.Mui-selected': {
                                backgroundColor: '#1b223f !important',
                            },
                        }}
                    >
                        {data.length > 0 ? (
                            data.map((row) => (
                                <TableRow
                                    key={row.product.id}
                                    sx={{
                                        cursor: 'pointer',
                                        color: color.textColor.dark,
                                        '&:hover': {
                                            backgroundColor: '#151c26 !important',
                                        }
                                    }}
                                >
                                    <CustomTableCell component="th" scope="row" sx={{ maxWidth: '300px' }}>

                                        {row.product.name}
                                    </CustomTableCell>
                                    <CustomTableCell align="right">
                                        <img
                                            src={row.product.thumbnail}
                                            alt={row.product.name}
                                            style={{ width: '30px', height: '30px' }}
                                        /></CustomTableCell>
                                    <CustomTableCell align="right">{row.quantity}</CustomTableCell>
                                    <CustomTableCell align="right">{FormatVND(row.product.price)}</CustomTableCell>
                                    <CustomTableCell align="right">{row.discount}</CustomTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow
                                sx={{
                                    cursor: 'pointer',
                                    color: color.textColor.dark,
                                    '&:hover': {
                                        backgroundColor: '#151c26 !important',
                                    }
                                }}>
                                <CustomTableCell align='center' colSpan={5}>Trống</CustomTableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}
