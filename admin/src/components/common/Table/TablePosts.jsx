import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Checkbox, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { visuallyHidden } from '@mui/utils';
import { MdDelete } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { BiSolidPencil } from 'react-icons/bi';
// Other necessary imports...

// ... (Existing code remains unchanged up to the headCells definition)

// Replace 'title', 'order', 'spent', 'role', 'status' with 'Posttitle', 'description', etc.
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
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Tiêu đề',
    },
    {
        id: 'content',
        numeric: false,
        disablePadding: false,
        label: 'Nội dung',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Hàng động',
    },
    // Include other relevant category-specific columns
    // Adjust your TableCell components below accordingly
];

// The rest of the component remains mostly unchanged
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
                            active={orderBy === 'title'}
                            direction={orderBy === 'title' ? order : 'asc'}
                            onClick={createSortHandler('title')}

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

// The component title and the props it accepts are adjusted
export default function TablePosts({ data, onDeletePost }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleDeletePost = (id) => {
        onDeletePost(id);
    };
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
        <Paper
            sx={{
                width: '100%',
                position: 'relative',
                border: '0px solid black',
                borderRadius: '14px'
            }}
        >
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
                        rowCount={data.length}
                        selected={selected}
                        handleDelete={handleDelete}
                    />
                    {/* Render Table Head */}
                    <TableHead
                        sx={{
                            backgroundColor: 'rgb(28, 37, 54)',
                        }}
                    >

                    </TableHead>
                    {/* Render Table Body */}
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
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
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
                                        {row.title}
                                    </CustomTableCell>
                                    <CustomTableCell

                                    >
                                        <Typography
                                            sx={{
                                                width: '100px',/* Adjust the width as needed */
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {row.content}
                                        </Typography>


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
                                        align="right"
                                    >

                                        <NavLink to={'/post/edit/' + row.id}>
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
                                        <Tooltip title="Xóa" >
                                            <IconButton sx={{
                                                color: '#9da4ae',
                                                marginRight: '8px'
                                            }}
                                                onClick={(e) => handleDeletePost(row.id)}
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

TablePosts.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            // Add other PropTypes for additional fields
        })
    ),
    // Other PropTypes for additional props
};

TablePosts.propTypes = {
    data: PropTypes.array.isRequired, // Adjust PropTypes based on your category data structure
    // ... (Existing propTypes remain unchanged)
};
