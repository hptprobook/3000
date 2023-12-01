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
    // margin: '5px',
    // color: color.textColor.dark,
    // border: '1px solid ' + color.textGray,
    '&  .MuiChip-deleteIcon ': {
        color: color.textGray
    },
    '&:hover .MuiChip-deleteIcon ': {
        color: color.colorHover.hoverGray
    }
}));
export default function AutoFillTag({ data }) {
    const [selectedOptions, setSelectedOptions] = React.useState([]);

    const handleOnChange = (_, value) => {
        setSelectedOptions(value);

    };
    console.log(selectedOptions);
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
            style={{ width: 500 }}
            renderInput={(params) => (
                <StyledInputTags {...params} label="Nhãn sản phẩm" placeholder="Gõ gì đó đi" />
            )}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];
