import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import color from '../../../config/colorConfig';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const ImageDropZone = () => {
    const [image, setImage] = useState(null);
    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            console.error('Invalid file extension. Please select a valid PNG file.');
            return;
        }
        const selectedImage = acceptedFiles[0];
        setImage(URL.createObjectURL(selectedImage));
    };

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: 'image/*',
        onDrop,
        maxFiles: 1, // Set to allow only one file
    });

    return (
        <div>
            <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <CloudUploadIcon fontSize="large" sx={{ marginBottom: '12px' }} />

                <p style={{ margin: 0 }}>Kéo thả hình ảnh ở đây hoặc chọn 1 hình ảnh bất kì</p>
            </div>
            {image && (
                <div>
                    <p>Ảnh được chọn:</p>
                    <img src={image} alt="Selected" style={imageStyle} />
                </div>
            )}
        </div>
    );
};

const dropzoneStyle = {
    border: '2px dashed ' + color.colorHover.hoverGray,
    borderRadius: '14px',
    padding: '32px',
    marginBottom: '32px',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: color.colorHover.hoverGray,
        // Add other hover styles as needed
    },
};

const imageStyle = {
    marginTop: '10px',
    maxWidth: '100%',
    maxHeight: '200px',
};

export default ImageDropZone;
