import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://103.183.75.171:3001/uploads");
      if (response.data && Array.isArray(response.data.files)) {
        const imageUrls = response.data.files.map(
          (file) => `http://103.183.75.171:3001/uploads/${file}`
        );
        setImages(imageUrls);
      } else {
        console.error(
          "Response does not contain an array of files:",
          response.data
        );
        setError("Response does not contain an array of files");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error fetching images");
    }
  };

  useEffect(() => {
    fetchImages();
    const interval = setInterval(fetchImages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery">
      {error && <p>{error}</p>}
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image} alt={`Gallery item ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
