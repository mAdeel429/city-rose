import React from 'react';
import { FaHeart } from 'react-icons/fa';
import styles from './OfferCard.module.css';
import { useFavorites } from '../data/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import Image from '../assets/images.jpeg'

export default function OfferCard({ image, title, description }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some(item => item.title === title);

  const navigate = useNavigate();

  const handleHeartClick = (e) => {
    e.stopPropagation();
    const item = {
      image: Image,
      title,
      category: 'Offers',
      description,
      buttonLabel: 'Show Offer'
    };

    if (isFavorite) {
      removeFromFavorites(title);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <div className={styles.offerCard}>
      <div className={styles.offerImageContainer}>
        <img
          src={Image}
          alt={title}
          className={styles.offerImage}
        />

        <div
          className={styles.offerHeartIcon}
          onClick={handleHeartClick}
          style={{ color: isFavorite ? 'red' : 'white', cursor: 'pointer', }}
        >
          <FaHeart />
        </div>

        <div className={styles.offerTextOverlay}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
      
      <button className={styles.showOfferButton}>Show Offer</button>
    </div>
  );
}
