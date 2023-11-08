import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FaSearch } from 'react-icons/fa'
import React, { useState } from 'react'

const InputSearch = ({ onChange }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setSearchValue(newValue);

        // Gọi hàm onChange và truyền giá trị tìm kiếm mới
        if (onChange) {
            onChange(newValue);
        }
    };
    return (
        <div>
            <FormControl
                fullWidth
                sx={{
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
                        borderColor: '#1a222f',
                        borderRadius: '12px'
                    },

                }}>
                <InputLabel htmlFor="outlined-adornment-amount" sx={{ color: '#6c737f', }}>Tìm kiếm</InputLabel>
                <OutlinedInput
                    value={searchValue}
                    onChange={handleInputChange}
                    id="outlined-adornment-amount"
                    sx={{
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                            backgroundColor: 'rgba(243, 244, 246, 0.04)',
                        },
                        '& .MuiOutlinedInput-input': {
                            color: '#6c737f',
                        }
                    }}
                    label="Tìm kiếm"
                    startAdornment={
                        <InputAdornment
                            position="start"
                            sx={{
                                color: '#6c737f',

                            }}
                        ><FaSearch /></InputAdornment>
                    }
                />
            </FormControl>
        </div >
    )
}

export default InputSearch