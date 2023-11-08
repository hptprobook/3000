import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InputSearch from "../TextField/InputSearch";
import { Divider, Grid } from "@mui/material";
import TableDataUser from "./TableDataUser";
import SelectFilter from "../Select/SelectFilter";

// Sample data with fields: id, title, content, author_id, tags, img
function createData(id, title, content, author_id, tags, img) {
    return {
        id,
        title,
        content,
        author_id,
        tags,
        img,
    };
}

const rows = [
    createData(1, "iphone 5", "Content 1", 1, "tag1,tag2", "img1.jpg"),
    createData(2, "iphone 6", "Content 2", 2, "tag3,tag4", "img2.jpg"),
];

export default function TablePost(props) {
    const [value, setValue] = React.useState(0);
    const [userData, setUserData] = React.useState(props.rows); // Use sampleData as initial data
    const [dataSearch, setDataSearch] = React.useState(userData);

    const handleSearch = (searchValue) => {
        // Tạo một biểu thức chính quy để tìm kiếm "searchValue" trong các dữ liệu
        const regex = new RegExp(searchValue, "i"); // 'i' để không phân biệt hoa thường

        // Sử dụng phương pháp `filter` để tạo một mảng kết quả

        const result = dataSearch.filter((item) => regex.test(item.title));
        setUserData(result);
        setDataSearch(props.rows);
        if (searchValue === "") {
            setUserData(props.rows);
        }
    };
    console.log(props.data);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        // <Box sx={{ width: '100%', mt: '16px', backgroundColor: '#111927', borderRadius: '13px' }}>
        //     <Box sx={{ padding: '0 12px' }}>
        //         <Tabs
        //             value={value}
        //             onChange={handleChange}
        //             aria-label="Bảng bài viết"
        //             textColor='inherit'
        //             variant="scrollable"
        //             scrollButtons="auto"
        //             sx={{
        //                 color: '#A0AEC0 !important',
        //                 fontSize: '12px !important',
        //                 '& .Mui-selected': {
        //                     color: 'rgb(99, 102, 241) !important',
        //                 },
        //                 '& .MuiButtonBase-root': {
        //                     minWidth: '0px !important',
        //                     fontSize: '14px',
        //                     textTransform: 'none !important',
        //                     margin: '0px 8px',
        //                     padding: '0px 16px',
        //                 },
        //                 '& .MuiTouchRipple-root': {
        //                     boderColor: 'rgb(99, 102, 241)'
        //                 }
        //             }}

        //         >
        //             <Tab label="Tất cả" {...a11yProps(0)} />
        //             <Tab label="Đang hoạt động" {...a11yProps(1)} />
        //             <Tab label="Cấm" {...a11yProps(2)} />
        //         </Tabs>
        //     </Box>
        //     <Divider sx={{ borderColor: '#fff' }} />
        //     <Grid container spacing={0} sx={{ padding: '32px 0', margin: 0 }}>
        //         <Grid item xs={12} sx={{ p: '0 12px' }}>
        //             <InputSearch onChange={handleSearch} />
        //         </Grid>
        //     </Grid>
        //     <CustomTabPanel value={value} index={0}>
        //         <TableDataUser data={userData} />
        //     </CustomTabPanel>
        //     <CustomTabPanel value={value} index={1}>
        //         <TableDataUser data={userData} />
        //     </CustomTabPanel>
        //     <CustomTabPanel value={value} index={2}>
        //         <TableDataUser data={userData} />
        //     </CustomTabPanel>
        // </Box>

        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation16 MuiCard-root css-r0tmw6">
            <h6 class="MuiTypography-root MuiTypography-subtitle1 css-ht96qr">
                Hello, Admin
            </h6>
            <a
                class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-kyxw2h"
                tabindex="0"
                href="/dashboard/blog/create"
            >
                New Post<span class="MuiTouchRipple-root css-w0pj6f"></span>
            </a>
        </div>
    );

    // ... Your existing code
}
