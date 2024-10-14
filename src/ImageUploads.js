import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import apiRoutes from "./apiRoutes";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const onFileUpload = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    axios
      .post(apiRoutes.upload, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error uploading the images!", error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h2>Image Upload</h2>
      <div
        {...getRootProps()}
        style={{
          border: "1px dashed black",
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <button onClick={onFileUpload} disabled={!selectedFiles.length}>
        Upload!
      </button>
      <div>
        {selectedFiles.map((file) => (
          <p key={file.path}>{file.path}</p>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
