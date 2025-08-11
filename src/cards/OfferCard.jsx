// import React, { useState, useEffect } from 'react';
// import { FaHeart } from 'react-icons/fa';
// import styles from './OfferCard.module.css';
// import { useFavorites } from '../data/FavoritesContext';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { fetchOffers } from '../data/fetchOffers';

// export default function OfferCard() {
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const [showBubbles, setShowBubbles] = useState(false);
//   const [animateHeart, setAnimateHeart] = useState(null);
//   const [selectedType, setSelectedType] = useState('Offers');
//   const [offers, setOffers] = useState([]);

//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getOffers = async () => {
//       if (selectedType === 'Offers') {
//         const offersData = await fetchOffers();
//         setOffers(offersData);
//       }
//     };

//     getOffers();
//   }, [selectedType]);

//   const getImageUrlWithToken = (url) => {
//     if (!url) return 'https://via.placeholder.com/300x200';

//     try {
//       const baseUrl = window.location.origin;
//       const fullUrl = new URL(url, baseUrl);
//       if (token) {
//         fullUrl.searchParams.set('token', token);
//       }
//       return fullUrl.toString();
//     } catch (err) {
//       console.error('Invalid image URL:', err);
//       return 'https://via.placeholder.com/300x200';
//     }
//   };

//   const handleHeartClick = (e, item) => {
//     e.stopPropagation();
//     const isFavorite = favorites.some(fav => fav.id === item.id);

//     if (isFavorite) {
//       removeFromFavorites(item.id);
//     } else {
//       addToFavorites(item);
//       setShowBubbles(true);
//       setAnimateHeart(item.id);

//       setTimeout(() => {
//         setShowBubbles(false);
//         setAnimateHeart(null);
//       }, 1000);
//     }
//   };

//   if (selectedType !== 'Offers') {
//     return <div>No Offers Selected</div>;
//   }

//   if (offers.length === 0) {
//     return <div style={{ padding: '16px', textAlign: 'center' }}>Loading offers...</div>;
//   }

//   return (
//     <div className={styles.offerCardWrapper} >
//       {offers.map((item) => {
//         const imageUrl = getImageUrlWithToken(item.photo?.url);
//         const isFavorite = favorites.some(fav => fav.id === item.id);

//         return (
//           <div key={item.id} className={styles.offerCard} onClick={() => navigate(`/offersQR/${item.id}`, { state: { offer: item } })}
//           >
//             <div className={styles.offerImageContainer}>
//               <img
//                 src={imageUrl}
//                 alt={item.title}
//                 className={styles.offerImage}
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/300x200';
//                 }}
//               />

//               {showBubbles && animateHeart === item.id && (
//                 <div className={styles.bubblesContainer}>
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <motion.span
//                       key={i}
//                       className={styles.bubble}
//                       initial={{ opacity: 1, y: 0, scale: 1 }}
//                       animate={{ opacity: 0, y: -40, scale: 0.5 }}
//                       transition={{
//                         duration: 1,
//                         delay: Math.random() * 0.3,
//                         ease: 'easeOut',
//                       }}
//                       style={{ left: `${Math.random() * 20 - 10}px` }}
//                     >
//                       ❤️
//                     </motion.span>
//                   ))}
//                 </div>
//               )}

//               <motion.div
//                 className={styles.offerHeartIcon}
//                 onClick={(e) => handleHeartClick(e, item)}
//                 animate={animateHeart === item.id ? { scale: [1, 1.4, 1] } : {}}
//                 transition={{ duration: 0.4 }}
//                 style={{
//                   color: isFavorite ? 'red' : 'white',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <FaHeart />
//               </motion.div>

//               <div className={styles.offerTextOverlay}>
//                 <h4>{item.title}</h4>
//                 <p>{item.description}</p>
//               </div>
//             </div>

//             <button
//               className={styles.showOfferButton}
//               onClick={() => navigate(`/offers/${item.id}`)}
//             >
//               Show Offer
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import styles from './OfferCard.module.css';
import { useFavorites } from '../data/FavoritesContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchOffers } from '../data/fetchOffers';

export default function OfferCard({ offerId, category }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [showBubbles, setShowBubbles] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(null);
  const [offers, setOffers] = useState([]);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const passedOfferId = location.state?.offerId || offerId;

  useEffect(() => {
    const getOffers = async () => {
      const offersData = await fetchOffers();
      console.log("All Offers from API:", offersData);
      console.log("offerId:", passedOfferId, "category:", category);
  
      let filtered = [];
      if (passedOfferId) {
        filtered = offersData.filter(o => o.id === passedOfferId);
        console.log("Filtered by offerId:", filtered);
      }
  
      if ((!passedOfferId || filtered.length === 0) && category) {
        filtered = offersData.filter(o =>
          o?.macros?.some(m => m.name?.toLowerCase() === category.toLowerCase())
        );
        console.log("Filtered by category:", filtered);
      }
  
      // 3️⃣ Agar dono se kuch nahi mila to sab me se ek random offer
      if (filtered.length === 0) {
        filtered = offersData;
      }
  
      // 4️⃣ Sirf ek offer select karo
      if (filtered.length > 0) {
        const singleOffer = filtered[Math.floor(Math.random() * filtered.length)];
        setOffers([singleOffer]);
      } else {
        setOffers([]);
      }
    };
  
    getOffers();
  }, [passedOfferId, category]);
  

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

  if (offers.length === 0) {
    return <div style={{ padding: '16px', textAlign: 'center' }}>No offer found</div>;
  }

  return (
    <div className={styles.offerCardWrapper}>
      {offers.map((item) => {
        const imageUrl = getImageUrlWithToken(item.photo?.url);
        const isFavorite = favorites.some(fav => fav.id === item.id);

        return (
          <div
            key={item.id}
            className={styles.offerCard}
            // onClick={() =>
            //   navigate(`/offersQR/${item.id}`, { state: { offerId: item.id } })
            // }
          >
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
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/offersQR/${item.id}`, { state: { offerId: item.id, offer: item } });
              }}
              
            >
              Show Offer
            </button>
          </div>
        );
      })}
    </div>
  );
}
