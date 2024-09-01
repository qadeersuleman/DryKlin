// ImageViewer.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ImageViewer = () => {
  const { imageName } = useParams();

  return (
    <div className="image-viewer">
      <img
        src={`/path-to-uploaded-images/${imageName}`}
        alt={imageName}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
};

export default ImageViewer;
