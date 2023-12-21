import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InputSearch from '../TextField/InputSearch';
import { Divider, Grid } from '@mui/material';
import TableDataUser from './TableDataUser';
import SelectFilter from '../Select/SelectFilter';
import TableDataCategory from './TableDataCategory';
import { deleteCategoryByID } from '../../../redux/slices/categoriesSlice';
import { useDispatch } from 'react-redux';

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

export default function TableCategory(props) {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const [categoryData, setCategoryData] = React.useState(props.data);
    const [dataSearch, setDataSearch] = React.useState(categoryData);
    const topLevel = categoryData.filter(item => categoryData.some(otherCategory => otherCategory.id === item.parent_id));
    const lowLevel = categoryData.filter(item => item.parent_id === 0);
    const handleSearch = (searchValue) => {
        const regex = new RegExp(searchValue, 'i'); // 'i' để không phân biệt hoa thường
        const result = dataSearch.filter(item => regex.test(item.name));
        setCategoryData(result);
        setDataSearch(props.data);
        if (searchValue === '') {
            setCategoryData(props.data);
        }
    };
    const handleDeleteCategory = (value) =>{
        dispatch(deleteCategoryByID({id : value}));
        console.log(value);
    }
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
                    <Tab label="Phân loại cấp cao" {...a11yProps(1)} />
                    <Tab label="Phân loại cấp thấp" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <Divider sx={{ borderColor: '#fff' }} />
            <Grid container spacing={0} sx={{ padding: '32px 0', margin: 0 }}>
                <Grid item xs={12} sx={{ p: '0 12px' }}>
                    <InputSearch onChange={handleSearch} />
                </Grid>
            </Grid>
            <CustomTabPanel value={value} index={0}>
                <TableDataCategory data={categoryData} onDeleteCategory={handleDeleteCategory} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TableDataCategory data={topLevel} onDeleteCategory={handleDeleteCategory} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <TableDataCategory data={lowLevel} onDeleteCategory={handleDeleteCategory} />
            </CustomTabPanel>
        </Box>
    );
}
