import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ImageLinkList.css"; // Import stylesheet for styling
import apiRoutes from "./apiRoutes";

const ImageLinkList = () => {
  const [linkString, setLinkString] = useState("");

  useEffect(() => {
    axios
      .get(apiRoutes.uploads)
      .then((response) => {
        if (Array.isArray(response.data.files)) {
          const sortedFiles = response.data.files.sort((a, b) => {
            const numA = parseInt(a.split(".")[0], 10);
            const numB = parseInt(b.split(".")[0], 10);
            return numA - numB;
          });
          // Combine sorted file links into one string with newline separation
          const combinedLinks = sortedFiles
            .map((file) => apiRoutes.indexUpload(file))
            .join("\n");
          setLinkString(combinedLinks);
        } else {
          console.error(
            'Response does not contain an array named "files":',
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the images!", error);
      });
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(linkString)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        alert("Failed to copy link to clipboard. Please try again.");
      });
  };

  return (
    <div className="container">
      <h1>Image Gallery Links</h1>
      <div className="textarea-container">
        <textarea value={linkString} readOnly className="link-textarea" />
        <button onClick={handleCopyClick} className="copy-button">
          Salin
        </button>
      </div>
    </div>
  );
};

export default ImageLinkList;
