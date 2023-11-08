import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectFilter() {
    const [age, setAge] = React.useState(5);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ m: 1 }}>
            <FormControl fullWidth
                sx={{
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(99, 102, 241) ',
                        transition: 'border 0.4s linear',
                        color: 'rgb(99, 102, 241) '
                    },
                    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                        color: 'rgb(99, 102, 241)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        transition: 'border .4s linear',
                    },
                    '& fieldset': {
                        borderColor: '#1a222f',
                        borderRadius: '12px'
                    },

                }}
            >
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                        color: '#6c737f',
                    }}>Sắp xếp</InputLabel>
                <Select
                    sx={{
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                            backgroundColor: 'rgba(243, 244, 246, 0.04)',
                        },
                        '& .MuiSelect-select': {
                            color: '#6c737f',
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#6c737f',
                        }
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Sắp xếp"
                    onChange={handleChange}
                >
                    <MenuItem value={5}>Mặc định</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
