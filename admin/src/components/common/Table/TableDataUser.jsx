import * as React from 'react';
import PropTypes from 'prop-types';
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
import Checkbox from '@mui/material/Checkbox';
import { MdDelete } from 'react-icons/md';
import { BiSolidPencil } from 'react-icons/bi';
import { visuallyHidden } from '@mui/utils';
import { Button, Chip, Collapse, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import styled from '@emotion/styled';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import FormatDateTime from '../Function/FormatDate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { ReadOnly } from '../TextField/ReadOnly';
import { NavLink } from 'react-router-dom';
const CustomTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid rgb(45, 55, 72)',
    color: '#edf2f7',
}));
const CustomTableCellHaed = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid rgb(45, 55, 72)',
    color: '#edf2f7',
}));
const CustomTableCellSub = styled(TableCell)(({ theme }) => ({
    padding: '24px 16px 24px 0',
    borderBottom: 'none',
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
        label: 'Tên',
    },

    {
        id: 'order',
        numeric: true,
        disablePadding: false,
        label: 'Đơn hàng',
    },
    {
        id: 'spent',
        numeric: true,
        disablePadding: false,
        label: 'Chi tiêu',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Vai trò',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Hành động',
    },
];
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, handleDelete, selected } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead
            sx={{
                backgroundColor: 'rgb(28, 37, 54)',
            }}>
            <TableRow>
                <TableCell
                    sx={{
                        borderBottom: '1px solid rgb(45, 55, 72)',
                    }}
                    padding="checkbox">
                    <Checkbox
                        sx={{
                            borderRadius: '50',
                        }}
                        icon={<CheckBoxOutlineBlankIcon sx={{ color: '#9da4ae' }} />}
                        checkedIcon={<CheckBoxIcon sx={{ color: '#6366f1' }} />}
                        indeterminateIcon={<IndeterminateCheckBoxIcon sx={{ color: '#6366f1' }} />}
                        indeterminate={numSelected > 0 && numSelected === rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {numSelected == 0 ? headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
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
                        {headCell.id !== 'action' ?
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
                            </TableSortLabel> : <div> {headCell.label}</div>
                        }
                    </TableCell>
                )) : <>
                    <TableCell
                        sx={{
                            borderBottom: '1px solid rgb(45, 55, 72)',
                            paddingLeft: 0,
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
                        component="th"
                        colSpan="1"
                    >
                        <TableSortLabel
                            active={orderBy === 'name'}
                            direction={orderBy === 'name' ? order : 'asc'}
                            onClick={createSortHandler('name')}

                        >
                            {numSelected} Được chọn

                        </TableSortLabel>
                    </TableCell>

                    <TableCell
                        sx={{
                            borderBottom: '1px solid rgb(45, 55, 72)',
                            padding: 0,
                            '& .MuiButtonBase-root.MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon': {
                                color: '#edf2f7 !important',
                            },
                            '& :hover ': {
                                color: '#edf2f7 !important',
                            }
                        }}
                        colSpan="5"
                        align="right"
                    >

                        <Tooltip title="Xóa" onClick={() => handleDelete(selected)} >
                            <IconButton sx={{
                                color: '#9da4ae',
                                marginRight: '8px'
                            }}
                            >
                                <MdDelete />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </>

                }
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
};


export default function TableDataUser(props) {
    const rows = props.data;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleDelete = (value) => {
        console.log(value);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRow = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );
    const [visibleRows, setVisibleRows] = React.useState(visibleRow);
    const [open, setOpen] = React.useState(0);
    function handleOpen(key) {
        if (open === key) {
            setOpen(0);
        }
        else {
            setOpen(key);
        }
    }
    React.useEffect(() => {
        // Tính toán visibleRows từ props.data
        const newVisibleRows = stableSort(props.data, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );

        setVisibleRows(newVisibleRows);
    }, [props.data, order, orderBy, page, rowsPerPage]);

    return (
        <Paper sx={{
            width: '100%',
            position: 'relative',
            border: '0px solid black',
            borderRadius: '14px'
        }}>

            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        selected={selected}
                        handleDelete={handleDelete}
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
                        {visibleRows.length ? (
                            visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <React.Fragment key={row.id}>
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{
                                                cursor: 'pointer',
                                                color: '#edf2f7',
                                                '&:hover': {
                                                    backgroundColor: '#151c26 !important',
                                                }
                                            }}
                                        >
                                            <CustomTableCell

                                                padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.id)}

                                                    checked={isItemSelected}
                                                    icon={<CheckBoxOutlineBlankIcon sx={{ color: '#9da4ae' }} />}
                                                    checkedIcon={<CheckBoxIcon sx={{ color: '#5154c6' }} />}
                                                    indeterminateIcon={<IndeterminateCheckBoxIcon sx={{ color: '#5154c6' }} />}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    sx={{
                                                        borderRadius: '50',
                                                        color: '#9da4ae',
                                                        '& .MuiSvgIcon-root': {
                                                            borderRadius: '12px',
                                                        },
                                                    }}
                                                />
                                            </CustomTableCell>
                                            <CustomTableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </CustomTableCell>

                                            <CustomTableCell align="left">Comingson</CustomTableCell>
                                            <CustomTableCell align="left">Comingson</CustomTableCell>
                                            <CustomTableCell align="left">
                                                <Chip
                                                    sx={{
                                                        backgroundColor: row.role == 'USER' ? '#162f34' : '#183343',
                                                        color: row.role == 'USER' ? '#10b981' : '#d32f2f',
                                                        textTransform: 'uppercase',
                                                        fontWeight: '600'
                                                    }}
                                                    label={row.role} /></CustomTableCell>
                                            <CustomTableCell align="left">
                                                <Chip
                                                    sx={{
                                                        backgroundColor: row.status == 'active' ? '#162f34' : '#31212b',
                                                        color: row.status == 'active' ? '#10b981' : '#d32f2f',
                                                        textTransform: 'uppercase',
                                                        fontWeight: '600'
                                                    }}
                                                    label={row.status} />
                                            </CustomTableCell>
                                            <CustomTableCell
                                                sx={{
                                                    '& .MuiButtonBase-root.MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon': {
                                                        color: '#edf2f7 !important',
                                                    },
                                                    '& :hover ': {
                                                        color: '#edf2f7 !important',
                                                    }
                                                }}
                                                colSpan="5"
                                                align="center"
                                            >
                                                <NavLink to={'/user/edit/' + row.id}>
                                                    <Tooltip title="Sửa" onClick={() => handleDelete(selected)} >

                                                        <IconButton sx={{
                                                            color: '#9da4ae',
                                                            marginRight: '8px'
                                                        }}
                                                        >
                                                            <BiSolidPencil style={{ fontSize: '16px' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </NavLink>

                                                <Tooltip title="Mở" >

                                                    <IconButton
                                                        sx={{
                                                            color: '#9da4ae',
                                                            marginRight: '8px'
                                                        }}
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => handleOpen(row.id)}
                                                    >
                                                        {open == row.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                            </CustomTableCell>
                                        </TableRow>
                                        <TableRow>
                                            <CustomTableCell
                                                sx={{
                                                    paddingTop: 0,
                                                    paddingBottom: 0,
                                                }}
                                                colSpan={7}>
                                                <Collapse in={open == row.id ? true : false} timeout="auto" unmountOnExit>
                                                    <Box
                                                        sx={{
                                                            padding: '24px'
                                                        }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <CustomTableCellHaed colSpan={2}>
                                                                                Địa chỉ
                                                                            </CustomTableCellHaed>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <CustomTableCellSub>  <ReadOnly label={'Email'} value={row.email} /></CustomTableCellSub>
                                                                            <CustomTableCellSub>  <ReadOnly label={'Số điện thoại'} value={row.phone_number ? row.phone_number : 'Trống'} /></CustomTableCellSub>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <CustomTableCellSub colSpan={2}>  <ReadOnly label={'Địa chỉ'} value={row.phone_number ? row.phone_number : 'Trống'} /></CustomTableCellSub>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <CustomTableCellHaed colSpan={2}>
                                                                                Trạng thái
                                                                            </CustomTableCellHaed>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <CustomTableCellSub>  <ReadOnly label={'Giới tính'} value={row.gender ? row.gender : 'Trống'} /></CustomTableCellSub>
                                                                            <CustomTableCellSub>  <ReadOnly label={'Ngày sinh'} value={row.birth_date ? FormatDateTime(row.birth_date) : 'Trống'} /></CustomTableCellSub>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <CustomTableCellSub>  <ReadOnly label={'Ngày tạo'} value={row.created_at ? FormatDateTime(row.created_at) : 'Trống'} /></CustomTableCellSub>
                                                                            <CustomTableCellSub>  <ReadOnly label={'Ngày cập nhật'} value={row.update_at ? FormatDateTime(row.update_at) : 'Trống'} /></CustomTableCellSub>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </Grid>
                                                        </Grid>


                                                    </Box>
                                                </Collapse>
                                            </CustomTableCell>
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })) : <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                            <CustomTableCell align='center' colSpan={7} >Trống</CustomTableCell>
                        </TableRow>}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <CustomTableCell align='center' colSpan={7} >Trống</CustomTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số hàng mỗi trang:"
                sx={{
                    color: 'white',
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
    );
}
