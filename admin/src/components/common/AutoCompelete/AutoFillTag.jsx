import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const StyledInputTags = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiFormLabel-root': {
        color: '#edf2f7',

    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgb(99, 102, 241) !important',
        transition: 'border 0.4s linear',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        transition: 'border .4s linear',
    },
    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        color: 'rgb(99, 102, 241)',
    },
    '& fieldset': {
        borderColor: 'rgba(243, 244, 246, 0.04)',
        borderRadius: '12px'
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(243, 244, 246, 0.04)',
    },

    '& .MuiOutlinedInput-input': {
        color: '#edf2f7',
    },
    'svg': {
        color: '#edf2f7',
    },
    '.MuiButtonBase-root .MuiChip-root': {

        border: '1px solid ' + color.textGray,
    },
    '.MuiChip-label': {
        color: color.textColor.dark,
    },
    '&  .MuiChip-deleteIcon ': {
        color: color.textGray
    },
    '&:hover .MuiChip-deleteIcon ': {
        color: color.colorHover.hoverGray
    }
}));
export default function AutoFillTag({ data, handleFill }) {
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const handleOnChange = (_, value) => {
        setSelectedOptions(value);
    };

    React.useEffect(() => {
        handleFill(selectedOptions)
    }, [selectedOptions])
    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={data}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            onChange={handleOnChange}
            renderInput={(params) => (
                <StyledInputTags {...params} label="Nhãn sản phẩm" placeholder="Gõ gì đó đi" />
            )}
        />
    );
}


