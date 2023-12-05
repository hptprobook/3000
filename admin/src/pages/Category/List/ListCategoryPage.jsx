import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import Loading from "../../../components/common/Loading/Loading";
import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import TableDataCategory from "../../../components/common/Table/TableDataCategory";
import InputSearch from "../../../components/common/TextField/InputSearch";
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

const ListCategoriesPage = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0); // Initialize value state for tabs
    const categories = useSelector((state) => state.categories.data);
    const status = useSelector((state) => state.categories.status);
    const error = useSelector((state) => state.categories.error);
    const [filteredCategories, setFilteredCategories] = useState(categories); // State to store filtered categories
    //Bậc cao 
    const topLevelCategories = categories.filter(category =>
        categories.some(otherCategory => otherCategory.id === category.parent_id)
    );
    //Bậc thấp  
    const lowLevelCategories = categories.filter(category => category.parent_id === 0);


    const handleSearch = (searchValue) => {
        const regex = new RegExp(searchValue, 'i'); // 'i' để không phân biệt hoa thường

        const result = categories.filter(item => regex.test(item.name));
        setFilteredCategories(result);
    };
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch]);


    const handleChange = (event, newValue) => {
        setValue(newValue); // Update the value state when a tab is changed
    };
    if (status === "loading") {
        return <Loading />;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    // Ensure categories is an array before mapping
    const categoriesArray = Array.isArray(categories) ? categories : [];

    const rows = categoriesArray.map((category) => ({
        id: category.id,
        name: category.name,
        parent_id: category.parent_id,
        icon_url: category.icon_url,
        // Add other fields as needed
    }));

  


    return (
        <div>
            <HeaderPage
                namePage={'Phân loại'}
                Breadcrumb={['Phân loại', 'Danh sách']}
                ButtonLink='/category/create' />
            {/* Render the categories data in a table, list, or any other desired format */}
            {/* For example, you can map through categoriesArray to display them */}
            <Box sx={{ width: '100%', mt: '16px', backgroundColor: '#111927', borderRadius: '13px' }}>
                <Box sx={{ padding: '0 12px' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="Bảng phân loại"
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
                        <Tab label="Thể loại cấp cao nhất" {...a11yProps(1)} />
                        <Tab label="Thể loại cấp thấp hơn" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Divider sx={{ borderColor: '#fff' }} />
                <Grid container spacing={0} sx={{ padding: '32px 0', margin: 0 }}>
                    <Grid item xs={12} sx={{ p: '0 12px' }}>
                        <InputSearch onChange={handleSearch} />
                    </Grid>
                </Grid>
                <CustomTabPanel index={0} value={value}>
                    <TableDataCategory data={filteredCategories} /> {/* Use filteredCategories here */}
                </CustomTabPanel>
                <CustomTabPanel align='center' colSpan={7} index={1} value={value}>
                    <TableDataCategory data={topLevelCategories} />
                </CustomTabPanel>
                <CustomTabPanel align='center' colSpan={7} index={2} value={value}>
                    <TableDataCategory data={lowLevelCategories} />
                </CustomTabPanel>

            </Box>
        </div>
    );
};

export default ListCategoriesPage;
