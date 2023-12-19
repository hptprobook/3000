import React from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css';
import BasicAlertl from '../Alert/BasicAlertl';
const ImageDropZone = ({ handleUpload }) => {

    const {
        fileRejections,
        acceptedFiles,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });
    const [uploadFile, setUploadFile] = React.useState([]);
    const [uploadFileError, setUploadFileError] = React.useState(false);

    React.useEffect(() => {
        if (fileRejections.length > 0) {
            setUploadFileError(true)
        }
        else {
            setUploadFileError(false)
        }
    }, [fileRejections])
    React.useEffect(() => {
        setUploadFile(acceptedFiles);
    }, [acceptedFiles]);
    React.useEffect(() => {
        handleUpload(uploadFile);
    }, [uploadFile])
    const removeFile = (index) => {
        const updatedFiles = [...uploadFile];
        updatedFiles.splice(index, 1);
        setUploadFile(updatedFiles);
    };

    const upload = uploadFile.map((file, index) => (
        <li key={file.path}>
            <div>
                <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                />
                {file.path.slice(0, 30) + '...'} - {file.size} B - {file.type}
            </div>
            <div className='DeletePreviewButton' onClick={() => removeFile(index)}>Xóa</div>
        </li>
    ));

    return (
        <section className="container ImageDropZone">
            {uploadFileError ? <BasicAlertl label={'Chỉ nhận tệp có đuôi PNG, JPEG'} severity={'error'} /> : ''}
            <div  {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className='DropZoneTitle' style={{ textAlign: 'center' }}>Kéo thả hoặc chọn ảnh bất kì</p>
                <p className='DropZoneTitle' style={{ textAlign: 'center' }}>(Chỉ nhận các ảnh có đuôi jpeg, png)</p>
            </div>
            <aside>
                <ul className='UploadImagePreview'>{upload}</ul>
            </aside>
        </section>
    );
}

export default ImageDropZone;
