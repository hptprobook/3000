import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, Menu, MenuItem } from '@mui/material';
import './style.css';
import color from '../../../config/colorConfig';
import ButtonOpenSelect from '../Button/ButtonOpenSelect';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import styled from '@emotion/styled';
const CheckedCategoryCustom = styled(ListItem)(({ theme }) => ({
}))
const MenuCategoryCustom = styled(Menu)(({ theme }) => ({
    paddingBottom: 0,
    '& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper': {
        borderRadius: 0,
    },
    '& .MuiList-root.MuiMenu-list': {
        padding: 0
    },
    '& .MuiButtonBase-root.MuiCheckbox-root.Mui-checked': {
        color: color.focusedColor.dark,
    },
    '& .MuiButtonBase-root.MuiCheckbox-root': {
        color: color.colorHover.hoverGray,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
    },
    '& .MuiListItemText-primary': {
        color: color.textGray
    }
}))

const FakeCategories = [
    {
        id: 1,
        name: 'Category 1'
    },
    {
        id: 2,
        name: 'Category 2'
    },
    {
        id: 3,
        name: 'Category 3'
    },
    {
        id: 4,
        name: 'Category 4'
    },
    {
        id: 5,
        name: 'Category 5'
    },
    {
        id: 6,
        name: 'Category 6'
    },
    {
        id: 7,
        name: 'Category 7'
    },
    {
        id: 8,
        name: 'Category 8'
    },
    {
        id: 9,
        name: 'Category 9'
    },
    {
        id: 10,
        name: 'Category 10'
    },
    {
        id: 11,
        name: 'Category 11'
    },
];


export default function SelectFilterProduct() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElStatus, setAnchorElStatus] = React.useState(null);

    const [checkedCategory, setChecked] = React.useState([0]);

    const [fillerList, setFilterList] = React.useState(null);

    const handleToggleCategory = (value) => () => {
        const currentIndex = checkedCategory.indexOf(value);
        const newChecked = [...checkedCategory];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    React.useEffect(() => {
        map
    }, [checkedCategory]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickStatus = (event) => {
        setAnchorElStatus(event.currentTarget);
    };

    const handleCloseStatus = () => {
        setAnchorElStatus(null);
    };

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorElStatus);
    const id = open ? 'simple-popover' : undefined;
    const id2 = open2 ? 'simple-popover2' : undefined;
    return (
        <Box>
            <div className='ProductPage__filter' style={{ borderBottom: '1px solid' + color.colorHover.hoverGray }}>
                <p style={{ margin: 0, color: color.textGray, fontSize: '14px' }}>
                    Không có thẻ lọc áp dụng
                </p>
            </div>
            <div className='ProductPage__filter'>
                <>
                    <ButtonOpenSelect
                        id={id}
                        onClick={handleClick}
                        label='Loại'
                    />
                    <MenuCategoryCustom
                        id={id}
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: color.backgroundColorSub.dark, paddingTop: 0, }}>
                            {FakeCategories.map((item) => {
                                const labelId = `checkbox-list-label-${item.id}`;

                                return (
                                    <ListItem
                                        key={item.id}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleToggleCategory(item.id)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checkedCategory.indexOf(item.id) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`Line item ${item.name}`} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </MenuCategoryCustom>
                </>
                <ButtonOpenSelect id={id2} onClick={handleClickStatus} label='Trạng thái' />
                <Popover
                    id={id2}
                    open={open2}
                    anchorEl={anchorElStatus}
                    onClose={handleCloseStatus}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                </Popover>
            </div>
        </Box >
    );
}