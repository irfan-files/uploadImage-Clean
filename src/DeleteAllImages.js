import React, { useState } from "react";
import axios from "axios";
import apiRoutes from "./apiRoutes";

const DeleteAllImages = () => {
  const [message, setMessage] = useState("");

  const handleDeleteAll = async () => {
    try {
      // Log the URL before making the request
      console.log("API URL:", apiRoutes.deleteAllImages);

      // Log request details
      console.log("Request details:", {
        url: apiRoutes.deleteAllImages,
        method: 'delete',
        headers: {
          // Include any headers you're sending, if applicable
        },
      });

      // Make the delete request
      const response = await axios.delete(apiRoutes.deleteAllImages);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error deleting files");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete All Images</h2>
      <button onClick={handleDeleteAll}>Delete All</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteAllImages;
