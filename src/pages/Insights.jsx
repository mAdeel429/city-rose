import React from 'react';
import './Insights.css';
import { FiArrowLeft } from 'react-icons/fi';
import {Link} from 'react-router-dom'

export default function Insights() {
  return (
    <div className="insights-container">
      <div className="header">
      <Link to='/'>
        <FiArrowLeft className="back-icon" />
        </Link>
        <h2>Le tue offerte</h2>
      </div>
      <div className="offer-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly1SlyJilx_6cUbIusa6ggJQa9ykMp_3sFgD42JGi9SENuHw0N3kaXIjh319zQ0KbIY8&usqp=CAU"
          alt="Offer"
          className="offer-image"
        />
        <div className="offer-title">Free Extra Scoop on Your Cone!</div>
      </div>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-label">Visualizzazioni uniche</div>
          <div className="stat-value">6</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Offerte Salvate</div>
          <div className="stat-value">4</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Riscattate</div>
          <div className="stat-value">0</div>
        </div>
      </div>
    </div>
  );
}

