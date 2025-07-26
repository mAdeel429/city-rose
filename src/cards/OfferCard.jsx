// import React from 'react';
// import { FaHeart } from 'react-icons/fa';
// import styles from './OfferCard.module.css';
// import { useFavorites } from '../data/FavoritesContext';
// import { useNavigate } from 'react-router-dom';
// import Image from '../assets/images.jpeg'

// export default function OfferCard({ image, title, description }) {
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const isFavorite = favorites.some(item => item.title === title);

//   const navigate = useNavigate();

//   const handleHeartClick = (e) => {
//     e.stopPropagation();
//     const item = {
//       image: Image,
//       title,
//       category: 'Offers',
//       description,
//       buttonLabel: 'Show Offer'
//     };

//     if (isFavorite) {
//       removeFromFavorites(title);
//     } else {
//       addToFavorites(item);
//     }
//   };

//   return (
//     <div className={styles.offerCard}>
//       <div className={styles.offerImageContainer}>
//         <img
//           src={Image}
//           alt={title}
//           className={styles.offerImage}
//         />

//         <div
//           className={styles.offerHeartIcon}
//           onClick={handleHeartClick}
//           style={{ color: isFavorite ? 'red' : 'white', cursor: 'pointer', }}
//         >
//           <FaHeart />
//         </div>

//         <div className={styles.offerTextOverlay}>
//           <h4>{title}</h4>
//           <p>{description}</p>
//         </div>
//       </div>
      
//       <button className={styles.showOfferButton}>Show Offer</button>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import styles from './OfferCard.module.css';
import { useFavorites } from '../data/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Image from '../assets/images.jpeg';

export default function OfferCard({ image, title, description }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some(item => item.title === title);

  const [showBubbles, setShowBubbles] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

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
      setShowBubbles(true);
      setAnimateHeart(true);

      setTimeout(() => {
        setShowBubbles(false);
        setAnimateHeart(false);
      }, 1000);
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

        {/* ❤️ Floating bubbles */}
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
              >
                ❤️
              </motion.span>
            ))}
          </div>
        )}

        {/* Heart icon with pop animation */}
        <motion.div
          className={styles.offerHeartIcon}
          onClick={handleHeartClick}
          animate={animateHeart ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 0.4 }}
          style={{
            color: isFavorite ? 'red' : 'white',
            cursor: 'pointer',
          }}
        >
          <FaHeart />
        </motion.div>

        <div className={styles.offerTextOverlay}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>

      <button className={styles.showOfferButton}>Show Offer</button>
    </div>
  );
}
