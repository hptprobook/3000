import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { FaSearch } from 'react-icons/fa'
import React from 'react'

const InputSearch = () => {
    return (
        <div>
            <FormControl
                fullWidth
                sx={{
                    m: 1,
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid rgb(99, 102, 241) !important',
                        transition: 'border 0.4s linear',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        transition: 'border .4s linear',
                    },
                    '& fieldset': {
                        borderColor: '#1a222f',
                        borderRadius: '12px'
                    },

                }}>
                <OutlinedInput
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