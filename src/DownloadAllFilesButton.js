import React from "react";
import axios from "axios";
import apiRoutes from "./apiRoutes";

const DownloadAllFilesButton = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(apiRoutes.downloadAll, {
        responseType: "blob", // Important for handling binary data
      });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "allFiles.zip"); // Specify the name for the download
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up after the download
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  return <button onClick={handleDownload}>Download All Files as ZIP</button>;
};

export default DownloadAllFilesButton;
