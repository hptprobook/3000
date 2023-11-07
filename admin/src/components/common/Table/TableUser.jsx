import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InputSearch from '../TextField/InputSearch';
import { Divider, Grid } from '@mui/material';
import TableDataUser from './TableDataUser';
import SelectFilter from '../Select/SelectFilter';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}
function createData(id, name, status, created, order, spent) {
    return {
        id,
        name,
        status,
        created,
        order,
        spent,
    };
}

const rows = [
    createData(1, 'Cupcake', 'active', 3.7, 67, 4.3),
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
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TableUser(props) {
    const [value, setValue] = React.useState(0);
    const [userData, setUserData] = React.useState(props.data);
    const [dataSearch, setDataSearch] = React.useState(userData);

    const handleSearch = (searchValue) => {
        // Tạo một biểu thức chính quy để tìm kiếm "searchValue" trong các dữ liệu
        const regex = new RegExp(searchValue, 'i'); // 'i' để không phân biệt hoa thường

        // Sử dụng phương pháp `filter` để tạo một mảng kết quả

        const result = dataSearch.filter(item => regex.test(item.name));
        setUserData(result);
        setDataSearch(props.data);
        if (searchValue === '') {
            setUserData(props.data);
        }
    };
    console.log(props.data);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', mt: '16px', backgroundColor: '#111927', borderRadius: '13px' }}>
            <Box sx={{ padding: '0 12px' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Bảng người dùng"
                    textColor='inherit'
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        color: '#A0AEC0 !important',
                        fontSize: '12px !important',
                        '& .Mui-selected': {
                            color: 'rgb(99, 102, 241) !important',
                        },
                        '& .MuiButtonBase-root': {
                            minWidth: '0px !important',
                            fontSize: '14px',
                            textTransform: 'none !important',
                            margin: '0px 8px',
                            padding: '0px 16px',
                        },
                        '& .MuiTouchRipple-root': {
                            boderColor: 'rgb(99, 102, 241)'
                        }
                    }}

                >
                    <Tab label="Tất cả" {...a11yProps(0)} />
                    <Tab label="Đang hoạt động" {...a11yProps(1)} />
                    <Tab label="Cấm" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <Divider sx={{ borderColor: '#fff' }} />
            <Grid container spacing={0} sx={{ padding: '32px 0', margin: 0 }}>
                <Grid item xs={12} sx={{ p: '0 12px' }}>
                    <InputSearch onChange={handleSearch} />
                </Grid>
            </Grid>
            <CustomTabPanel value={value} index={0}>
                <TableDataUser data={userData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TableDataUser data={userData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <TableDataUser data={userData} />
            </CustomTabPanel>
        </Box>
    );
}
