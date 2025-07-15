import React from "react";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import "./CardDetailScreen.css";

const Header = () => (
  <div className="header-container">
    <img
      src="https://media.cnn.com/api/v1/images/stellar/prod/200416163203-03b-ice-cream-around-the-world-restricted.jpg?q=w_1110,c_fill"
      alt="Ice Cream"
      className="header-image"
    />

    <div className="icon no-bg back-icon">
      <FaArrowLeft />
    </div>

    <div className="icon heart-icon">
      <FaHeart className="heart-filled" />
    </div>

    <div className="tabs-card">
      {["Indicazioni", "Orari", "Sito"].map((tab) => (
        <button key={tab} className="pill-tab">
          {tab}
        </button>
      ))}
    </div>
  </div>
);

const CardDetailScreen = () => (
  <div className="screen-container">
    <Header />
    {/* Other content can go here */}
  </div>
);

export default CardDetailScreen;
