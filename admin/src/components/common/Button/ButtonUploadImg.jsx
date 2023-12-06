import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BasicAlertl from '../Alert/BasicAlertl';
import color from '../../../config/colorConfig';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storageFirebase } from '../../../config/firebaseConfig';

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

export default function ButtonUploadImg({ handleOnChange }) {
    const [erroUpload, setErrorUpload] = React.useState('');
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Kiểm tra loại file
            if (file.type.startsWith('image/')) {
                setErrorUpload('');
                handleOnChange(file);
            } else {
                // Nếu không phải là file ảnh, hiển thị thông báo hoặc thực hiện xử lý khác
                setErrorUpload('Vui lòng chọn một file ảnh!')
            }
        }
    };

    return (
        <div>
            <label>

                {erroUpload ? <BasicAlertl label={erroUpload} severity={"error"} /> : null}
                <Button
                    component="div"
                    variant="contained"
                    sx={{
                        borderRadius: '14px',
                        padding: '8px 24px',
                        backgroundColor: color.focusedColor.dark,
                    }}
                    startIcon={<CloudUploadIcon />}
                >
                    Tải file
                </Button>
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*" // Chỉ cho phép chọn file ảnh
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}
