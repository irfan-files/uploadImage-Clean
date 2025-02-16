import React, { useState } from "react";
import axios from "axios";
import ImageSelector from "./ImageSelector";
import ImageUploader from "./ImageUploader";
import apiRoutes from "./apiRoutes";

const App = () => {
  const [imageData, setImageData] = useState(null);

  const retryDownload = async (url, filename, retries = 20) => {
    let attempt = 0;
    let success = false;

    while (attempt < retries) {
      try {
        const response = await axios.post(apiRoutes.download, {
          url,
          filename,
        });
        console.log(response.data.message);
        success = true;
        break;
      } catch (error) {
        attempt++;
        console.error(`Attempt ${attempt} to download image failed: ${error.message}`);
        if (attempt >= retries) {
          console.error(`Failed to download image after ${retries} attempts.`);
        }
      }
    }

    return success;
  };

  const downloadAllImages = async () => {
    if (!imageData) {
      alert("No image data available. Please upload a JSON file first.");
      return;
    }
    const images = imageData.Products.map((product) => product.item_image);
    let failedDownloads = [];

    for (let i = 0; i < images.length; i++) {
      const success = await retryDownload(images[i], `${i + 1}.jpg`);
      if (!success) {
        failedDownloads.push(images[i]);
      }
    }

    if (failedDownloads.length > 0) {
      console.log("List of URLs that failed to download:", failedDownloads);
      alert(`Failed to download some images. Check the console for details.`);
    } else {
      alert("All images downloaded and saved successfully.");
    }
  };

  const downloadImages = async (selectedImages) => {
    let failedDownloads = [];

    for (let i = 0; i < selectedImages.length; i++) {
      const success = await retryDownload(
        selectedImages[i].url,
        selectedImages[i].filename
      );
      if (!success) {
        failedDownloads.push(selectedImages[i].url);
      }
    }

    if (failedDownloads.length > 0) {
      console.log("List of URLs that failed to download:", failedDownloads);
      alert(`Failed to download some images. Check the console for details.`);
    } else {
      alert("All selected images downloaded and saved successfully.");
    }
  };

  const handleUpload = (uploadedData) => {
    setImageData(uploadedData);
  };

  const images = imageData
    ? imageData.Products.map((product) => product.item_image)
    : [];

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Image Downloader</h1>
      <ImageUploader onUpload={handleUpload} />
      <button onClick={downloadAllImages} style={styles.downloadAllButton}>
        Download All Images
      </button>

      <h2 style={styles.header}>Download Selected Images</h2>

      {imageData && (
        <ImageSelector
          images={images}
          downloadSelectedImages={downloadImages}
        />
      )}
    </div>
  );
};

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "24px",
  },
  downloadAllButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "24px",
  },
};

export default App;
