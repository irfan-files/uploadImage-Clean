import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import apiRoutes from "./apiRoutes";

function ImageViewDownload() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial list of images from the backend
    fetchImages();

    // Polling interval setup
    const interval = setInterval(fetchImages, 1000); // Polling every 5 seconds

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, []);

  const fetchImages = () => {
    axios
      .get(apiRoutes.download)
      .then((response) => {
        setImages(response.data.files);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ImageViewDownload">
      <h1>Downloaded Images</h1>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image} className="image-item">
            <img src={apiRoutes.indexImages} alt={image} className="image" />
            <a href={apiRoutes.indexImages} download className="download-link">
              Download
            </a>
          </div>
        ))}
      </div>
      <div className="download-all">
        <a href={apiRoutes.downloadAll} download className="download-all-link">
          Download All
        </a>
      </div>
    </div>
  );
}

export default ImageViewDownload;
