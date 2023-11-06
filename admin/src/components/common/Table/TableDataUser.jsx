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
import Checkbox from '@mui/material/Checkbox';
import { MdDelete } from 'react-icons/md';
import { visuallyHidden } from '@mui/utils';
import { IconButton, Tooltip } from '@mui/material';

function createData(id, name, calories, fat, carbs, protein) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
    createData(2, 'Donut', 452, 25.0, 51, 4.9),
    createData(3, 'Eclair', 262, 16.0, 24, 6.0),
    createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
    createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
    createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
    createData(9, 'KitKat', 518, 26.0, 65, 7.0),
    createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
    createData(11, 'Marshmallow', 318, 0, 81, 2.0),
    createData(12, 'Nougat', 360, 19.0, 9, 37.0),
    createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

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
        label: 'Tên',
    },
    {
        id: 'location',
        numeric: true,
        disablePadding: false,
        label: 'Địa chỉ',
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
        id: 'created',
        numeric: false,
        disablePadding: false,
        label: 'Ngày tạo',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Hàng động',
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
                <TableCell padding="checkbox">
                    <Checkbox
                        sx={{
                            borderRadius: '12px',
                            color: '#9da4ae',
                            '& .MuiSvgIcon-root': {
                                borderRadius: '12px',
                            },
                        }}
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
                        colSpan="4"
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
                            padding: 0
                        }}
                        colSpan="1"
                        align="right"
                    >

                        <Tooltip title="Xóa" onClick={() => handleDelete(selected)} >
                            <IconButton sx={{
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


export default function TableDataUser() {
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

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Paper sx={{ width: '100%', mb: 2, position: 'relative', borderRadius: 0 }}>

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
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.calories}</TableCell>
                                    <TableCell align="left">{row.fat}</TableCell>
                                    <TableCell align="left">{row.carbs}</TableCell>
                                    <TableCell align="left">{row.protein}</TableCell>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số hàng mỗi trang:"
                sx={{
                    '& .MuiTablePagination-selectLabel ,.MuiTablePagination-displayedRows ': {
                        m: 0,

                    }
                }}
            />
        </Paper>
    );
}
