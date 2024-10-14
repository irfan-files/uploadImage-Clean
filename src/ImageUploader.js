import React, { useState } from "react";

const ImageUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile ? uploadedFile.name : "");
  };

  const handleUpload = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        onUpload(json);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Invalid JSON file.");
      }
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div style={styles.uploader}>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={styles.fileInput}
        id="fileInput"
      />
      <label htmlFor="fileInput" style={styles.fileInputLabel}>
        {fileName || "Choose JSON File"}
      </label>
      <button
        onClick={handleUpload}
        style={styles.uploadButton}
        disabled={!file}
      >
        Upload JSON
      </button>
    </div>
  );
};

const styles = {
  uploader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "24px",
  },
  fileInput: {
    display: "none",
  },
  fileInputLabel: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
    textAlign: "center",
    width: "200px",
  },
  uploadButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    width: "200px",
    textAlign: "center",
  },
};

export default ImageUploader;
