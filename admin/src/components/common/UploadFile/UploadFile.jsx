import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileToServer } from '../../../services/uploadFileToServer'; // Adjust the import path

function UploadFile() {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.upload.uploading);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      dispatch(uploadStart()); // Start the upload process
      const uploadedFile = await uploadFileToServer(file); // Upload the file to the server

      dispatch(uploadSuccess(uploadedFile)); // Upload successful
    } catch (error) {
      dispatch(uploadFailure(error.message)); // Upload failed
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default UploadFile;
