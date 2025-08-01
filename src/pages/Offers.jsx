// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './Offers.css';
// import { FaHeart } from 'react-icons/fa';
// import { useFavorites } from '../data/FavoritesContext';

// export default function Offers() {
//   const [showBottomSheet, setShowBottomSheet] = useState(false);
//   const [selectedType, setSelectedType] = useState('Offers');

//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const [showBubbles, setShowBubbles] = useState(false);
//   const [animateHeart, setAnimateHeart] = useState(false);

//   const item = {
//     id: 'offer-1',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly1SlyJilx_6cUbIusa6ggJQa9ykMp_3sFgD42JGi9SENuHw0N3kaXIjh319zQ0KbIY8&usqp=CAU',
//     title: 'Free Extra Scoop on Your Cone!',
//     category: 'Offers',
//     description: 'One cone, two scoops—on us! Get a free extra scoop with your gelato cone.',
//   };

//   const isFavorite = favorites.some(fav => fav.id === item.id); // ✅ Check by ID

//   const handleHeartClick = (e) => {
//     e.stopPropagation();
//     if (isFavorite) {
//       removeFromFavorites(item.id); // ✅ Remove by ID
//     } else {
//       addToFavorites(item);
//       setShowBubbles(true);
//       setAnimateHeart(true);
//       setTimeout(() => {
//         setShowBubbles(false);
//         setAnimateHeart(false);
//       }, 1000);
//     }
//   };

//   const toggleBottomSheet = () => {
//     setShowBottomSheet(!showBottomSheet);
//   };

//   const handleClose = () => {
//     setShowBottomSheet(false);
//   };

//   const handleSelectType = (type) => {
//     setSelectedType(type);
//     handleClose();
//   };

//   const handleDragEnd = (event, info) => {
//     if (info.offset.y > 100) {
//       handleClose();
//     }
//   };

//   const renderContent = () => {
//     if (selectedType === 'Offers') {
//       return (
//         <motion.div
//           className="offers-card"
//           drag="y"
//           dragConstraints={{ top: 0, bottom: 0 }}
//           dragElastic={0.3}
//           whileTap={{ scale: 0.98 }}
//           transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//         >
//           <div className="offers-image-container" style={{ position: 'relative' }}>
//             <img
//               src={item.image}
//               alt="Offer"
//               className="offers-image"
//             />

//             {showBubbles && (
//               <div className="offers-bubbles-container">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <motion.span
//                     key={i}
//                     className="offers-bubble"
//                     initial={{ opacity: 1, y: 0, scale: 1 }}
//                     animate={{ opacity: 0, y: -40, scale: 0.5 }}
//                     transition={{
//                       duration: 1,
//                       delay: Math.random() * 0.3,
//                       ease: 'easeOut',
//                     }}
//                     style={{ left: `${Math.random() * 20 - 10}px` }}
//                   >
//                     ❤️
//                   </motion.span>
//                 ))}
//               </div>
//             )}

//             <motion.div
//               className="offers-heart-icon"
//               onClick={handleHeartClick}
//               animate={animateHeart ? { scale: [1, 1.4, 1] } : {}}
//               transition={{ duration: 0.4 }}
//               style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 cursor: 'pointer',
//                 color: isFavorite ? 'red' : 'white',
//                 fontSize: '20px',
//                 backgroundColor: 'rgba(0, 0, 0, 0.4)',
//               }}
//             >
//               <FaHeart />
//             </motion.div>
//           </div>

//           <div className="offers-details">
//             <h3 className="title">{item.title}</h3>
//             <p className="description">{item.description}</p>
//           </div>
//         </motion.div>
//       );
//      }
//   else if (selectedType === 'Events') {
//     return (
//       <div style={{ textAlign: 'center', padding: '16px' }}>
//         <h2>No Events</h2>
//         <p>No events available right now.</p>
//       </div>
//     );
//   } else if (selectedType === 'Services') {
//     return (
//       <div style={{ textAlign: 'center', padding: '16px' }}>
//         <h2>No Services</h2>
//         <p>No services available in this city.</p>
//       </div>
//     );
//   }
// };


//   return (
//     <div style={{ fontFamily: 'sans-serif' }}>
//       <div className="offers-tab-bar">
//         {['Offers', 'Events', 'Services'].map((type) => (
//           <div
//             key={type}
//             className={`offers-tab ${selectedType === type ? 'active' : ''}`}
//             onClick={() => setSelectedType(type)}
//           >
//             {type}
//           </div>
//         ))}
//       </div>

//       {renderContent()}

//       <AnimatePresence>
//         {showBottomSheet && (
//           <motion.div
//             className="offers-bottom-sheet-backdrop"
//             onClick={handleClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="offers-bottom-sheet"
//               onClick={(e) => e.stopPropagation()}
//               initial={{ y: '100%' }}
//               animate={{ y: 0 }}
//               exit={{ y: '100%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               drag="y"
//               dragConstraints={{ top: 0, bottom: 0 }}
//               onDragEnd={handleDragEnd}
//               dragElastic={0.2}
//             >
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Offers.css';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from '../data/FavoritesContext';
import { fetchOffers } from '../data/fetchOffers';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedType, setSelectedType] = useState('Offers');
  const [showBubbles, setShowBubbles] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(null);

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    const getOffers = async () => {
      console.log('🔍 useEffect triggered for selectedType:', selectedType);
      if (selectedType === 'Offers') {
        const offersData = await fetchOffers();
        console.log('📦 Offers fetched:', offersData);
        setOffers(offersData);
      }
    };

    getOffers();
  }, [selectedType]);

  const token = localStorage.getItem('token');

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

  const toggleBottomSheet = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  const handleClose = () => {
    setShowBottomSheet(false);
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    handleClose();
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      handleClose();
    }
  };

  const renderContent = () => {
    if (selectedType === 'Offers') {
      if (offers.length === 0) {
        return (
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <p>Loading offers...</p>
          </div>
        );
      }

      return offers.map((item) => {
        const isFavorite = favorites.some(fav => fav.id === item.id);
        // const imageUrl = getImageUrlWithToken(item.image);
        const imageUrl = getImageUrlWithToken(item.photo?.url);

        return (
          <motion.div
            key={item.id}
            className="offers-card"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.3}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="offers-image-container" style={{ position: 'relative' }}>
              <img
                src={imageUrl}
                alt={item.title || 'Offer'}
                className="offers-image"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }}
              />

              {showBubbles && animateHeart === item.id && (
                <div className="offers-bubbles-container">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="offers-bubble"
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
                className="offers-heart-icon"
                onClick={(e) => handleHeartClick(e, item)}
                animate={animateHeart === item.id ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  cursor: 'pointer',
                  color: isFavorite ? 'red' : 'white',
                  fontSize: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}
              >
                <FaHeart />
              </motion.div>
            </div>

            <div className="offers-details">
              <h3 className="title">{item.title}</h3>
              <p className="description">{item.description}</p>
            </div>
          </motion.div>
        );
      });
    } else if (selectedType === 'Events') {
      return (
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <h2>No Events</h2>
          <p>No events available right now.</p>
        </div>
      );
    } else if (selectedType === 'Services') {
      return (
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <h2>No Services</h2>
          <p>No services available in this city.</p>
        </div>
      );
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div className="offers-tab-bar">
        {['Offers', 'Events', 'Services'].map((type) => (
          <div
            key={type}
            className={`offers-tab ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </div>
        ))}
      </div>

      {renderContent()}

      <AnimatePresence>
        {showBottomSheet && (
          <motion.div
            className="offers-bottom-sheet-backdrop"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="offers-bottom-sheet"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              dragElastic={0.2}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
