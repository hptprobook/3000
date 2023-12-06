import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import color from '../../../config/colorConfig';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as FileType from 'file-type';

const ImageDropZone = () => {
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const onDrop = async (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            const firstRejectedFile = rejectedFiles[0];
            const fileType = await FileType.fromFile(firstRejectedFile);

            if (!fileType || !fileType.mime.startsWith('image/png')) {
                setErrorMessage(`Invalid file: ${firstRejectedFile.name}. Please select a valid image file.`);
                return;
            }
        }

        if (acceptedFiles.length > 1) {
            setErrorMessage('You can upload only one image at a time.');
            return;
        }

        const selectedImage = acceptedFiles[0];
        setImage(URL.createObjectURL(selectedImage));
        setErrorMessage('');
    };

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: 'image/png',
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
            {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    <p>{errorMessage}</p>
                </div>
            )}
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
