"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'

const UploadFileForm = ({ urlToUpload, redirectUrl=undefined, onUploadedFileIsBeingProcess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [uploadedFileSuccess, setUploadedFileSuccess] = useState(null);
  // const [uploadedFileError, setUploadedFileError] = useState(null);
  const [uploadedFileMessage, setUploadedFileMessage] = useState(null);
  const [uploadedFileIsBeingProcess, setUploadedFileIsBeingProcess] = useState(false);
  const router = useRouter()

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    setUploadedFileIsBeingProcess(true);
    onUploadedFileIsBeingProcess(true);
    setUploadedFileMessage(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(urlToUpload, {
        method: 'POST',
        body: formData,
      });

      setUploadedFileIsBeingProcess(false);
      onUploadedFileIsBeingProcess(false);

      if (response.ok) {
        setUploadedFileMessage('File uploaded successfully');
        if (redirectUrl != undefined) {
          router.push(redirectUrl);
        } else {
          const responseText = await response.text();
          setUploadedFileMessage(responseText);
        }
      } else {
        const responseBody = await response.json();
        setUploadedFileMessage(responseBody.error);
        console.error('Error uploading file:', response.status);
      }
    } catch (error) {
      setUploadedFileMessage('Error uploading file');
    }
  };

  return (
    <>
      {uploadedFileIsBeingProcess && (
        <div className="alert alert-warning" role="alert">
          File is being processed, please wait...
        </div>
      )}
      {!uploadedFileIsBeingProcess && (
        <>
          <div className="input-group">
            <input type="file" className="form-control" onChange={handleFileChange} accept="application/json" />
            <button className="btn btn-secondary" onClick={handleUpload}>Upload File</button>
          </div>
          {uploadedFileMessage && (
            <>
              <br />
              <div className="alert alert-info" role="alert">
                {uploadedFileMessage}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UploadFileForm;