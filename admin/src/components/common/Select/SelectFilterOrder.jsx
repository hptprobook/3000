import * as React from 'react';
import { Box, Menu } from '@mui/material';
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
import ChipFilter from '../Chip/ChipFilter';
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


export default function SelectFilterOrder({ data, filterReturn }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElStatus, setAnchorElStatus] = React.useState(null);

    const [checkedCategory, setChecked] = React.useState([]);

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
        filterReturn(checkedCategory);
    }, [checkedCategory])
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
                {checkedCategory.length > 0 ? (
                    checkedCategory.map((item) => {
                        const filteredCategories = data.filter((itemCat) => item === itemCat.id);

                        return filteredCategories.map((filteredItemCat) => (
                            <ChipFilter
                                key={filteredItemCat.id} // Make sure to use a unique key for each element
                                label={'Trạng thái:' + filteredItemCat.name}
                                funC={handleToggleCategory(filteredItemCat.id)}
                            />
                        ));
                    }).flat() // Use flat() to flatten the nested arrays
                ) : (
                    <p style={{ margin: 0, color: color.textGray, fontSize: '14px' }}>
                        Không có thẻ lọc áp dụng
                    </p>
                )}
            </div>
            <div>

                <ButtonOpenSelect
                    id={id}
                    onClick={handleClick}
                    label='Trạng thái'
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
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: color.backgroundColorSub.dark, paddingTop: 0, overflow: 'auto' }}>
                        {data.map((item) => {
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
                                        <ListItemText id={labelId} primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </MenuCategoryCustom>
            </div>
        </Box >
    );
}