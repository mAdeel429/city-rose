import React from 'react';
import './AttractionCard.css';
import { AiFillHeart } from 'react-icons/ai';

export default function AttractionCard({ image, title, category, distance, onClick }) {
  return (
    <div className="attraction-card" onClick={onClick}>
      <div className="attraction-card-image-container">
        <img src={image} alt={title} className="attraction-card-image" />
        <AiFillHeart className="attraction-card-heart-icon" />
        <div className="attraction-card-category">{category}</div>
      </div>
      <div className="attraction-card-details">
        <h3>{title}</h3>
        <p>{distance} KM</p>
      </div>
    </div>
  );
}
