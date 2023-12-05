import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ButtonUploadImg() {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {

            // Bạn có thể thực hiện xử lý với file ở đây, ví dụ: hiển thị ảnh, gửi lên server, ...
            console.log('Đã chọn file:', file.type);
        }
    };

    return (
        <label>
            <Button
                component="div"
                variant="contained"
                sx={{
                    borderRadius: '14px',
                    padding: '8px 24px',
                }}
                startIcon={<CloudUploadIcon />}
            >
                Tải file
            </Button>
            <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
            />
        </label>
    );
}
