import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './OfferCard.css';

export default function OfferCard() {
  return (
    <div className="offer-card">
      <div className="offer-image-container">
        <img
          className="offer-image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly1SlyJilx_6cUbIusa6ggJQa9ykMp_3sFgD42JGi9SENuHw0N3kaXIjh319zQ0KbIY8&usqp=CAU"
          alt="Free Extra Scoop Offer"
        />
        <div className="offer-heart-icon">
          <FaHeart />
        </div>
        <div className="offer-text-overlay">
          <h4>Free Extra Scoop on Your Cone!</h4>
          <p>One cone, two scoops—on us! Get a free extra scoop with your gelato cone.</p>
        </div>
      </div>
      <button className="show-offer-button">Show Offer</button>
    </div>
  );
}
