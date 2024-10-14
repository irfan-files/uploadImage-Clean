import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ImageViewSelectedDownload from "./ImageViewSelectedDownload";
import ImageUpload from "./ImageUploads";
import DownloadAllFilesButton from "./DownloadAllFilesButton";
import DeleteAllImages from "./DeleteAllImages";
import DeleteAllSelectedImages from "./DeleteAllSelectedImages";
import ImageLinkList from "./ImageLinkList";
import DeleteUpload from "./DeleteUpload";
import ImageGallery from "./ImageGallery";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ImageViewSelectedDownload />
    <ImageUpload />
    <DownloadAllFilesButton />
    <DeleteAllImages />
    <DeleteAllSelectedImages />
    <ImageLinkList />
    <ImageGallery />

    <DeleteUpload />
  </React.StrictMode>
);

reportWebVitals();
