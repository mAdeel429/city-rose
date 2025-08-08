import React, { useState } from 'react';
import styles from './AttractionCard.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useFavorites } from '../data/FavoritesContext';

export default function AttractionCard({
  id,
  image,
  title,
  category,
  distance,
  macros,
  fullItem,
  onClick
}) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [showBubbles, setShowBubbles] = useState(false);
  const isFavorite = favorites.some(item => item.id === id);

  // Safe fallback for category display
  const displayCategory =
    category?.trim?.() ||
    macros?.[0]?.name?.trim?.() ||
    'Unknown';

  // DEBUG: Check what's being received
  console.log('AttractionCard props:', { title, category, macros, displayCategory });

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (!isFavorite) {
      setShowBubbles(true);
      addToFavorites({ id, image, title, category: displayCategory, distance });
      setTimeout(() => setShowBubbles(false), 1000);
    } else {
      removeFromFavorites(id);
    }
  };

  const token = localStorage.getItem('token');

  let imageUrl = '/fallback.jpg';
  if (image && typeof image === 'string') {
    try {
      if (image.startsWith('http')) {
        const url = new URL(image);
        if (token) url.searchParams.append('token', token);
        imageUrl = url.toString();
      } else {
        imageUrl = image;
      }
    } catch (err) {
      console.error('Invalid image URL:', err);
    }
  }

  return (
    <div className={styles.attractionCard} onClick={() => onClick?.(fullItem)}>
      <div className={styles.attractionCardImageContainer}>
        <img
          src={imageUrl}
          alt={title}
          className={styles.attractionCardImage}
        />

        {showBubbles && (
          <div className={styles.bubblesContainer}>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                className={styles.bubble}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -40, scale: 0.5 }}
                transition={{
                  duration: 1,
                  delay: Math.random() * 0.3,
                  ease: 'easeOut',
                }}
                style={{ left: `${Math.random() * 20 - 10}px` }}
              />
            ))}
          </div>
        )}

        <motion.span
          onClick={handleHeartClick}
          className={styles.attractionCardHeartIcon}
          animate={isFavorite ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ color: isFavorite ? 'red' : 'white', cursor: 'pointer' }}
        >
          <AiFillHeart />
        </motion.span>

        <div className={styles.attractionCardCategory}>
          {displayCategory}
        </div>
      </div>

      <div className={styles.attractionCardDetails}>
        <h3>{title || 'Untitled'}</h3>
        <p>{distance || 'Unknown'}</p>
      </div>
    </div>
  );
}
