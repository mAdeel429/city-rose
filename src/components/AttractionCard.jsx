// import React from 'react';
// import styles from './AttractionCard.module.css';
// import { AiFillHeart } from 'react-icons/ai';
// import { useFavorites } from '../data/FavoritesContext';

// export default function AttractionCard({ image, title, category, distance, onClick }) {
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

//   const isFavorite = favorites.some(item => item.title === title);

//   const handleHeartClick = (e) => {
//     e.stopPropagation();
//     if (isFavorite) {
//       removeFromFavorites(title);
//     } else {
//       addToFavorites({ image, title, category, distance });
//     }
//   };

//   return (
//     <div className={styles.attractionCard} onClick={onClick}>
//       <div className={styles.attractionCardImageContainer}>
//         <img src={image} alt={title} className={styles.attractionCardImage} />

//         <AiFillHeart
//           className={styles.attractionCardHeartIcon}
//           onClick={handleHeartClick}
//           style={{ color: isFavorite ? 'red' : 'white', cursor: 'pointer' }}
//         />

//         <div className={styles.attractionCardCategory}>{category}</div>
//       </div>

//       <div className={styles.attractionCardDetails}>
//         <h3>{title}</h3>
//         <p>{distance} KM</p>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import styles from './AttractionCard.module.css';
// import { AiFillHeart } from 'react-icons/ai';
// import { motion } from 'framer-motion';
// import { useFavorites } from '../data/FavoritesContext';

// export default function AttractionCard({ id, image, title, category, distance, onClick }) {
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const [showBubbles, setShowBubbles] = useState(false);

//   // const isFavorite = favorites.some(item => item.title === title);
//   const isFavorite = favorites.some(item => item.id === id);


//   const handleHeartClick = (e) => {
//     e.stopPropagation();

//     if (!isFavorite) {
//       // Like animation
//       setShowBubbles(true);
//       addToFavorites({ id, image, title, category, distance });


//       // Hide bubbles after animation ends
//       setTimeout(() => setShowBubbles(false), 1000);
//     } else {
//       // Unlike, no animation
//       removeFromFavorites(id);

//     }
//   };

//   return (
//     <div className={styles.attractionCard} onClick={onClick}>
//       <div className={styles.attractionCardImageContainer}>
//         <img src={image} alt={title} className={styles.attractionCardImage} />

//         {/* ❤️ Bubbles when liked */}
//         {showBubbles && (
//           <div className={styles.bubblesContainer}>
//             {Array.from({ length: 5 }).map((_, i) => (
//               <motion.span
//                 key={i}
//                 className={styles.bubble}
//                 initial={{ opacity: 1, y: 0, scale: 1 }}
//                 animate={{ opacity: 0, y: -40, scale: 0.5 }}
//                 transition={{
//                   duration: 1,
//                   delay: Math.random() * 0.3,
//                   ease: 'easeOut',
//                 }}
//                 style={{ left: `${Math.random() * 20 - 10}px` }}
//               />
//             ))}
//           </div>
//         )}

//         <motion.span
//           onClick={handleHeartClick}
//           className={styles.attractionCardHeartIcon}
//           animate={!isFavorite ? {} : { scale: [1, 1.4, 1] }}
//           transition={{ duration: 0.4, ease: 'easeOut' }}
//           style={{ color: isFavorite ? 'red' : 'white', cursor: 'pointer' }}
//         >
//           <AiFillHeart />
//         </motion.span>

//         <div className={styles.attractionCardCategory}>{category}</div>
//       </div>

//       <div className={styles.attractionCardDetails}>
//         <h3>{title}</h3>
//         <p>{distance} KM</p>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import styles from './AttractionCard.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useFavorites } from '../data/FavoritesContext';

export default function AttractionCard({ id, image, title, category, distance, onClick }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [showBubbles, setShowBubbles] = useState(false);

  const isFavorite = favorites.some(item => item.id === id);

  const handleHeartClick = (e) => {
    e.stopPropagation();

    if (!isFavorite) {
      setShowBubbles(true);
      addToFavorites({ id, image, title, category, distance });
      setTimeout(() => setShowBubbles(false), 1000);
    } else {
      removeFromFavorites(id);
    }
  };

  return (
    <div className={styles.attractionCard} onClick={onClick} style={{borderRadius: '12px',overflow: 'hidden'}}>
      <div className={styles.attractionCardImageContainer}>
        <img src={image} alt={title} className={styles.attractionCardImage} />

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

        <div className={styles.attractionCardCategory}>{category}</div>
      </div>

      <div className={styles.attractionCardDetails}>
        <h3>{title}</h3>
        <p>{distance} KM</p>
      </div>
    </div>
  );
}
