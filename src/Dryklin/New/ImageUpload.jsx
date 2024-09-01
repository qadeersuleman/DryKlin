// ImageUpload.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./ImageUpload.css"
const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.size <= 5 * 1024 * 1024 && images.length < 5
    );
    setImages([...images, ...validFiles]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    navigate(`/view/${image.name}`);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <div className="upload-placeholder">
          <Button variant="primary">Choose Files</Button>
        </div>
      </label>

      <div className="image-thumbnails">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-thumbnail"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index + 1}`}
              style={{ width: '100px', height: '100px' }}
            />
          </div>
        ))}
        {images.length < 5 && (
          <div className="image-thumbnail">
            <Button variant="outline-secondary">+</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
