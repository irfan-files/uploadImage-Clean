import React, { useState } from "react";
import axios from "axios";
import apiRoutes from "./apiRoutes";

const DeleteUpload = () => {
  const [message, setMessage] = useState("");

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(apiRoutes.deleteUpload);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error deleting files");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete All Upload File</h2>
      <button onClick={handleDeleteAll}>Delete All Upload File</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteUpload;
