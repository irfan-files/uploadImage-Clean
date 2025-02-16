import React, { useState } from "react";
import axios from "axios";
import apiRoutes from "./apiRoutes";

const DeleteAllSelectedImages = () => {
  const [message, setMessage] = useState("");

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(apiRoutes.deleteAllSelectedImages);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error deleting files");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete All Selected Images</h2>
      <button onClick={handleDeleteAll}>Delete All</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteAllSelectedImages;
