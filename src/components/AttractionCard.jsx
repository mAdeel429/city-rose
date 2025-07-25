import React from 'react';
import styles from './AttractionCard.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { useFavorites } from '../data/FavoritesContext';

export default function AttractionCard({ image, title, category, distance, onClick }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = favorites.some(item => item.title === title);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(title);
    } else {
      addToFavorites({ image, title, category, distance });
    }
  };

  return (
    <div className={styles.attractionCard} onClick={onClick}>
      <div className={styles.attractionCardImageContainer}>
        <img src={image} alt={title} className={styles.attractionCardImage} />

        <AiFillHeart
          className={styles.attractionCardHeartIcon}
          onClick={handleHeartClick}
          style={{ color: isFavorite ? 'red' : 'white', cursor: 'pointer' }}
        />

        <div className={styles.attractionCardCategory}>{category}</div>
      </div>

      <div className={styles.attractionCardDetails}>
        <h3>{title}</h3>
        <p>{distance} KM</p>
      </div>
    </div>
  );
}


// import React, { useState, useRef } from 'react';
// import Lottie from 'lottie-react';
// import { AiFillHeart } from 'react-icons/ai';
// import styles from './AttractionCard.module.css';
// import { useFavorites } from '../data/FavoritesContext';
// import heartAnimation from '../assets/heart.json';

// export default function AttractionCard({ image, title, category, distance, onClick }) {
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const isFavorite = favorites.some(item => item.title === title);
//   const lottieRef = useRef();

//   const handleHeartClick = (e) => {
//     e.stopPropagation();

//     if (isFavorite) {
//       removeFromFavorites(title);
//     } else {
//       addToFavorites({ image, title, category, distance });
//     }

//     if (lottieRef.current) {
//       lottieRef.current.stop();
//       lottieRef.current.play();
//     }
//   };

//   return (
//     <div className={styles.attractionCard} onClick={onClick}>
//       <div className={styles.attractionCardImageContainer}>
//         <img src={image} alt={title} className={styles.attractionCardImage} />
//         <div className={styles.attractionCardHeartIcon} onClick={handleHeartClick}>
//           {isFavorite && (
//             <AiFillHeart
//               className={styles.staticHeart}
//               style={{
//                 position: 'absolute',
//                 color: 'red',
//                 fontSize: 40,
//                 zIndex: 1,
//               }}
//             />
//           )}

//           {/* Lottie animation */}
//           <Lottie
//             lottieRef={lottieRef}
//             animationData={heartAnimation}
//             loop={false}
//             autoplay={false}
//             style={{
//               width: 40,
//               height: 40,
//               position: 'relative',
//               zIndex: 2,
//             }}
//           />
//         </div>

//         <div className={styles.attractionCardCategory}>{category}</div>
//       </div>

//       <div className={styles.attractionCardDetails}>
//         <h3>{title}</h3>
//         <p>{distance} KM</p>
//       </div>
//     </div>
//   );
// }
