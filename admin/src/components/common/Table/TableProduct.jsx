import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';
import { NavLink } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { BiSolidPencil } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid rgb(45, 55, 72)',
    color: '#edf2f7',
}));
const CustomTableCellHaed = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid rgb(45, 55, 72)',
    color: '#edf2f7',
}));


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Tên sản phẩm',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Giá',
    },
    {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'Số lượng',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Hàng động',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead
            sx={{
                backgroundColor: 'rgb(28, 37, 54)',
            }}>
            <TableRow
                sx={{
                    borderBottom: '1px solid rgb(45, 55, 72)',
                }}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            borderBottom: '1px solid rgb(45, 55, 72)',
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
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function TableProduct({ data, onDeleteProduct }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleDeleteProduct = (id) => {
        onDeleteProduct(id);
    }
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, data],
    );
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{
                width: '100%',
                position: 'relative',
                borderRadius: '0',
                backgroundColor: 'transparent',
            }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
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
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{
                                            cursor: 'pointer',
                                            color: '#edf2f7',
                                            '&:hover': {
                                                backgroundColor: '#151c26 !important',
                                            }
                                        }}
                                    >
                                        <CustomTableCell
                                            component="th"
                                            id={labelId}
                                            sx={{
                                                maxWidth: '400px',
                                                overflowX: 'hidden',
                                                paddingLeft: '16px'
                                            }}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.name}
                                        </CustomTableCell>
                                        <CustomTableCell align="right">{row.price}</CustomTableCell>
                                        <CustomTableCell align="right">{row.quantity}</CustomTableCell>
                                        <CustomTableCell align="right">
                                            {row.status}
                                        </CustomTableCell>
                                        <CustomTableCell align="right">

                                            <NavLink to={'/product/edit/' + row.id}>
                                                <Tooltip title="Sửa" >
                                                    <IconButton sx={{
                                                        color: '#9da4ae',
                                                        marginRight: '8px'
                                                    }}
                                                    >
                                                        <BiSolidPencil style={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </NavLink>
                                            <Tooltip title="Xóa" >
                                                <IconButton sx={{
                                                    color: '#9da4ae',
                                                    marginRight: '8px'
                                                }}
                                                    onClick={(e) => handleDeleteProduct(row.id)}
                                                >
                                                    <MdDelete style={{ fontSize: '16px' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </CustomTableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Số hàng mỗi trang:"
                    sx={{
                        color: color.textColor.dark,
                        backgroundColor: '#111927',
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px',
                        padding: 0,
                        '& .MuiSvgIcon-root': {
                            color: '#9da4ae',
                        },
                        '& .MuiTablePagination-selectLabel ,.MuiTablePagination-displayedRows ': {
                            m: 0,
                        },
                    }}
                />
            </Paper>
        </Box>
    );
}
