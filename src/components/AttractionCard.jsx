import React from 'react';
import './AttractionCard.css';
import { AiFillHeart } from 'react-icons/ai';
// import {Link} from 'react-router-dom'
export default function AttractionCard({ image, title, category, distance }) {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
        <AiFillHeart className="heart-icon" />
        <div className="card-category">{category}</div>
      </div>
      <div className="card-details">
        <h3>{title}</h3>
        <p>{distance} KM</p>
      </div>
    </div>
  );
}
