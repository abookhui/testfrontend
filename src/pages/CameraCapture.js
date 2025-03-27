import React, { useState } from 'react';

function CameraCapture() {
  const [photo, setPhoto] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPhoto(imageURL);
    }
  };

  return (
    <div>
      <h2>카메라로 촬영</h2>

      <input
        type="file"
        accept="image/*"
        capture="environment" // 후면 카메라 우선
        onChange={handleCapture}
        style={{ marginBottom: '1rem' }}
      />

      {photo && (
        <div>
          <h3>촬영한 사진</h3>
          <img src={photo} alt="촬영 이미지" style={{ width: '100%', maxWidth: '400px' }} />
        </div>
      )}
    </div>
  );
}

export default CameraCapture;


