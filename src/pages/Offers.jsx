// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './Offers.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
// import { FaHeart } from 'react-icons/fa';
// import { useFavorites } from '../data/FavoritesContext';

// export default function Offers() {
//     const [showBottomSheet, setShowBottomSheet] = useState(false);
//     const [selectedType, setSelectedType] = useState('Offers');

//     const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

//     const types = ['Articles', 'Offers'];

//     const item = {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly1SlyJilx_6cUbIusa6ggJQa9ykMp_3sFgD42JGi9SENuHw0N3kaXIjh319zQ0KbIY8&usqp=CAU",
//         title: "Free Extra Scoop on Your Cone!",
//         category: "Offers",
//         description: "One cone, two scoops—on us! Get a free extra scoop with your gelato cone."
//     };

//     const isFavorite = favorites.some(fav => fav.title === item.title);

//     const handleHeartClick = (e) => {
//         e.stopPropagation();
//         if (isFavorite) {
//             removeFromFavorites(item.title);
//         } else {
//             addToFavorites(item);
//         }
//     };

//     const toggleBottomSheet = () => {
//         setShowBottomSheet(!showBottomSheet);
//     };

//     const handleClose = () => {
//         setShowBottomSheet(false);
//     };

//     const handleSelectType = (type) => {
//         setSelectedType(type);
//         handleClose();
//     };

//     const handleDragEnd = (event, info) => {
//         if (info.offset.y > 100) {
//             handleClose();
//         }
//     };

//     const renderContent = () => {
//         if (selectedType === 'Offers') {
//             return (
//                 <motion.div
//                     className="offers-card"
//                     drag="y"
//                     dragConstraints={{ top: 0, bottom: 0 }}
//                     dragElastic={0.3}
//                     whileTap={{ scale: 0.98 }}
//                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                 >
//                     <div className="offers-image-container" style={{ position: 'relative' }}>
//                         <img
//                             src={item.image}
//                             alt="Offer"
//                             className="offers-image"
//                         />
//                         <div
//                             className="offers-heart-icon"
//                             onClick={handleHeartClick}
//                             style={{
//                                 position: 'absolute',
//                                 top: '10px',
//                                 right: '10px',
//                                 cursor: 'pointer',
//                                 color: isFavorite ? 'red' : 'white',
//                                 fontSize: '20px',
//                                 backgroundColor: 'rgba(0, 0, 0, 0.4)',
//                             }}
//                         >
//                             <FaHeart />
//                         </div>
//                     </div>

//                     <div className="offers-details">
//                         <h3 className='title'>
//                             {item.title}
//                         </h3>
//                         <p className='description'>
//                             {item.description}
//                         </p>
//                     </div>
//                 </motion.div>
//             );
//         } else {
//             return (
//                 <div style={{ textAlign: 'center', padding: '16px' }}>
//                     <h2>No articles</h2>
//                     <p>No article has been written for the chosen city.</p>
//                 </div>
//             );
//         }
//     };

//     return (
//         <div style={{ fontFamily: 'sans-serif' }}>
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '16px',
//             }}>
//                 <h1 style={{ margin: 0, fontSize: '20px' }}>{selectedType}</h1>
//                 <div
//                     onClick={toggleBottomSheet}
//                     style={{ fontSize: '24px', cursor: 'pointer' }}
//                 >
//                     <FontAwesomeIcon icon={faEllipsis} />
//                 </div>
//             </div>

//             {renderContent()}

//             <AnimatePresence>
//                 {showBottomSheet && (
//                     <motion.div
//                         className="offers-bottom-sheet-backdrop"
//                         onClick={handleClose}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                     >
//                         <motion.div
//                             className="offers-bottom-sheet"
//                             onClick={(e) => e.stopPropagation()}
//                             initial={{ y: '100%' }}
//                             animate={{ y: 0 }}
//                             exit={{ y: '100%' }}
//                             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                             drag="y"
//                             dragConstraints={{ top: 0, bottom: 0 }}
//                             onDragEnd={handleDragEnd}
//                             dragElastic={0.2}
//                         >
//                             <div className="offers-handle-bar" />
//                             <div className="offers-filter-options">
//                                 {types.map((type) => (
//                                     <div
//                                         key={type}
//                                         className={`offers-radio-option ${selectedType === type ? 'offers-active' : ''}`}
//                                         onClick={() => handleSelectType(type)}
//                                     >
//                                         <div className="offers-radio-circle" />
//                                         {type}
//                                     </div>
//                                 ))}
//                                 <button className="offers-bottom-sheet-close-btn" onClick={handleClose}>
//                                     Close
//                                 </button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }





import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Offers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from '../data/FavoritesContext';

export default function Offers() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedType, setSelectedType] = useState('Offers');

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [showBubbles, setShowBubbles] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

  const types = ['Articles', 'Offers'];

  const item = {
    id: 'offer-1', // ✅ Add a unique and consistent ID
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly1SlyJilx_6cUbIusa6ggJQa9ykMp_3sFgD42JGi9SENuHw0N3kaXIjh319zQ0KbIY8&usqp=CAU',
    title: 'Free Extra Scoop on Your Cone!',
    category: 'Offers',
    description: 'One cone, two scoops—on us! Get a free extra scoop with your gelato cone.',
  };

  const isFavorite = favorites.some(fav => fav.id === item.id); // ✅ Check by ID

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(item.id); // ✅ Remove by ID
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
      return (
        <motion.div
          className="offers-card"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.3}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="offers-image-container" style={{ position: 'relative' }}>
            <img
              src={item.image}
              alt="Offer"
              className="offers-image"
            />

            {showBubbles && (
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
              onClick={handleHeartClick}
              animate={animateHeart ? { scale: [1, 1.4, 1] } : {}}
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
    } else {
      return (
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <h2>No articles</h2>
          <p>No article has been written for the chosen city.</p>
        </div>
      );
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '20px' }}>{selectedType}</h1>
        <div
          onClick={toggleBottomSheet}
          style={{ fontSize: '24px', cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
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
            >
              <div className="offers-handle-bar" />
              <div className="offers-filter-options">
                {types.map((type) => (
                  <div
                    key={type}
                    className={`offers-radio-option ${selectedType === type ? 'offers-active' : ''}`}
                    onClick={() => handleSelectType(type)}
                  >
                    <div className="offers-radio-circle" />
                    {type}
                  </div>
                ))}
                <button
                  className="offers-bottom-sheet-close-btn"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
