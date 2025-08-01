// components/SecureImage.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../data/axiosInstance';

export default function SecureImage({ imageUrl, alt, className }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axiosInstance.get(imageUrl, {
          responseType: 'blob',
        });
        const url = URL.createObjectURL(response.data);
        setBlobUrl(url);
      } catch (err) {
        console.error('❌ Error loading secure image:', err);
      }
    };

    if (imageUrl) {
      fetchImage();
    }
  }, [imageUrl]);

  if (!blobUrl) return <div className={className} style={{ background: '#ccc', height: '100%' }} />;

  return <img src={blobUrl} alt={alt} className={className} />;
}
