// import React from 'react';
// import { FaHeart } from 'react-icons/fa';
// import styles from './OfferCard.module.css';
// import { useFavorites } from '../data/FavoritesContext';
// import { useNavigate } from 'react-router-dom';
// import Image from '../assets/images.jpeg'
// import { fetchOffers } from '../data/fetchOffers';


// export default function OfferCard({ image, title, description }) {
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const isFavorite = favorites.some(item => item.title === title);
//   const [selectedType, setSelectedType] = useState('Offers');
//   const [offers, setOffers] = useState([]);

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



import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import styles from './OfferCard.module.css';
import { useFavorites } from '../data/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchOffers } from '../data/fetchOffers';

export default function OfferCard() {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [showBubbles, setShowBubbles] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(null);
  const [selectedType, setSelectedType] = useState('Offers');
  const [offers, setOffers] = useState([]);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const getOffers = async () => {
      if (selectedType === 'Offers') {
        const offersData = await fetchOffers();
        setOffers(offersData);
      }
    };

    getOffers();
  }, [selectedType]);

  const getImageUrlWithToken = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200';

    try {
      const baseUrl = window.location.origin;
      const fullUrl = new URL(url, baseUrl);
      if (token) {
        fullUrl.searchParams.set('token', token);
      }
      return fullUrl.toString();
    } catch (err) {
      console.error('Invalid image URL:', err);
      return 'https://via.placeholder.com/300x200';
    }
  };

  const handleHeartClick = (e, item) => {
    e.stopPropagation();
    const isFavorite = favorites.some(fav => fav.id === item.id);

    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
      setShowBubbles(true);
      setAnimateHeart(item.id);

      setTimeout(() => {
        setShowBubbles(false);
        setAnimateHeart(null);
      }, 1000);
    }
  };

  if (selectedType !== 'Offers') {
    return <div>No Offers Selected</div>;
  }

  if (offers.length === 0) {
    return <div style={{ padding: '16px', textAlign: 'center' }}>Loading offers...</div>;
  }

  return (
    <div className={styles.offerCardWrapper}>
      {offers.map((item) => {
        const imageUrl = getImageUrlWithToken(item.photo?.url);
        const isFavorite = favorites.some(fav => fav.id === item.id);

        return (
          <div key={item.id} className={styles.offerCard}>
            <div className={styles.offerImageContainer}>
              <img
                src={imageUrl}
                alt={item.title}
                className={styles.offerImage}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200';
                }}
              />

              {showBubbles && animateHeart === item.id && (
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

              <motion.div
                className={styles.offerHeartIcon}
                onClick={(e) => handleHeartClick(e, item)}
                animate={animateHeart === item.id ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.4 }}
                style={{
                  color: isFavorite ? 'red' : 'white',
                  cursor: 'pointer',
                }}
              >
                <FaHeart />
              </motion.div>

              <div className={styles.offerTextOverlay}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>

            <button
              className={styles.showOfferButton}
              onClick={() => navigate(`/offers/${item.id}`)}
            >
              Show Offer
            </button>
          </div>
        );
      })}
    </div>
  );
}
