import React from "react";
import axios from "axios";
import "./ImageViewSelectedDownload.css";
import apiRoutes from "./apiRoutes";

class ImageViewSelectedDownload extends React.Component {
  handleDownload = async () => {
    try {
      const response = await axios.get(apiRoutes.downloadAllImages, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "images.zip");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      alert("Download started successfully!");
    } catch (error) {
      console.error("Error downloading all images:", error);
      alert("Failed to download all images. Please try again later.");
    }
  };

  render() {
    return (
      <div className="image-download-container">
        <h1>Download All Selected Images</h1>
        <button className="download-button" onClick={this.handleDownload}>
          Download All
        </button>
      </div>
    );
  }
}

export default ImageViewSelectedDownload;
