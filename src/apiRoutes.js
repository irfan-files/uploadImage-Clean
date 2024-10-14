const BASE_URL = "http://103.183.75.171:3001";

const apiRoutes = {
  getAllImages: `${BASE_URL}/images`,
  downloadImage: (imageId) => `${BASE_URL}/images/${imageId}/download`,
  deleteImage: (imageId) => `${BASE_URL}/images/${imageId}`,

  download: `${BASE_URL}/download`,
  downloadSelectedImages: `${BASE_URL}/downloadSelectedImage`,
  deleteAllImages: `${BASE_URL}/delete-all`,
  deleteAllSelectedImages: `${BASE_URL}/delete-all-selected-images`,
  deleteUpload: `${BASE_URL}/deleteupload`,
  downloadAll: `${BASE_URL}/download-all`,
  downloadAllImages: `${BASE_URL}/downloadAllImages`,

  upload: `${BASE_URL}/upload`,
  uploads: `${BASE_URL}/uploads`,
  indexUpload: (file) => `${BASE_URL}/uploads/${file}`,
};

export default apiRoutes;
