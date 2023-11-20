import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import styled from '@emotion/styled';
import color from '~/config/colorConfig';
import { Box, Chip } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const FormSelectEdit = styled(FormControl)(({ theme }) => ({
    margin: 0,
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
        border: '2px solid' + color.colorHover.hoverGray,
        borderRadius: '14px',
        transition: 'border .4s linear',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: color.focusedColor.dark,
    },
    '& .Mui-focused.MuiFormLabel-root.MuiInputLabel-root': {
        color: color.focusedColor.dark,
    },
    '& .MuiFormLabel-root.MuiInputLabel-root ': {
        color: color.textGray,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '2px solid' + color.colorHover.hoverGray,
        borderRadius: '14px',
        transition: 'border .4s linear',
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
        padding: '8px',
        minHeight: '38px'
    },
    'svg': {
        color: color.textColor.dark
    }
}))
export default function SelectCategory() {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div style={{ padding: '16px' }}>
            <FormSelectEdit>
                <InputLabel id="demo-multiple-checkbox-label">Phân loại</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Phân loại" />}
                    renderValue={(selected) => (
                        <Box>
                            {selected.map((value) => (
                                <Chip sx={{ margin: 1 }} key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormSelectEdit>
        </div>
    );
}
