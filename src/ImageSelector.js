import React, { useState } from "react";

const ImageSelector = ({ images, downloadSelectedImages }) => {
  const [selectedIndexes, setSelectedIndexes] = useState("");

  const handleInputChange = (event) => {
    setSelectedIndexes(event.target.value);
  };

  const handleDownloadClick = async () => {
    const indexes = selectedIndexes
      .split(",")
      .map(Number)
      .map((i) => i - 1);
    const selectedImages = indexes.map((index) => ({
      url: images[index],
      filename: `${index + 1}.jpg`,
    }));

    try {
      await downloadSelectedImages(selectedImages);
    } catch (error) {
      console.error("Kesalahan saat mengunduh gambar:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Masukkan Nomor Gambar yang Ingin Diunduh</h2>
      <input
        type="text"
        value={selectedIndexes}
        onChange={handleInputChange}
        placeholder="Contoh: 1, 3, 5"
        style={styles.input}
      />
      <button onClick={handleDownloadClick} style={styles.button}>
        Unduh Gambar Terpilih
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "16px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ImageSelector;
