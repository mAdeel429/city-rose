// import React, { useState } from 'react';
// import './AddToFavorite.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
// import { AiFillHeart } from 'react-icons/ai';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useFavorites } from '../data/FavoritesContext';

// export default function AddToFavorite() {
//   const [showBottomSheet, setShowBottomSheet] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('All');
//   const { favorites, removeFromFavorites, addToFavorites } = useFavorites();

//   const categoryMappedToPoints = [
//     'Food & Drink',
//     'Culture',
//     'Culture & Sights',
//     'Vegan Friendly',
//     'Vegan & Vegetarian',
//     'Activity & Wellness'
//   ];

//   const filters = ['Offers', 'Points', 'Events'];

//   const filteredItems =
//     selectedFilter === 'All'
//       ? favorites
//       : favorites.filter(item => {
//           if (selectedFilter === 'Points') {
//             return categoryMappedToPoints.includes(item.category);
//           } else {
//             return item.category === selectedFilter;
//           }
//         });

//   const toggleBottomSheet = () => {
//     setShowBottomSheet(!showBottomSheet);
//   };

//   const handleClose = () => {
//     setShowBottomSheet(false);
//   };

//   const handleSelectFilter = (filter) => {
//     setSelectedFilter(filter);
//     handleClose();
//   };

//   const handleHeartClick = (e, item) => {
//     e.stopPropagation();
//     if (favorites.some(fav => fav.id === item.id)) {
//       removeFromFavorites(item.id);
//     } else {
//       addToFavorites(item);
//     }
//   };

//   return (
//     <div style={{ marginLeft: '10px', marginRight: '10px', paddingBottom: '100px', height: 'calc(100vh - 70px)', // Adjust based on your header/footer
//       overflowY: 'auto', }}>
//       {/* Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '16px',
//       }}>
//         <h1 style={{ margin: 0, fontSize: '20px' }}>{selectedFilter}</h1>
//         <div onClick={toggleBottomSheet} style={{ fontSize: '24px', cursor: 'pointer' }}>
//           <FontAwesomeIcon icon={faEllipsis} />
//         </div>
//       </div>

//       {/* Cards */}
//       {filteredItems.length === 0 ? (
//         <p style={{ textAlign: 'center', marginTop: '20px' }}>
//           No saved {selectedFilter.toLowerCase()} yet!
//         </p>
//       ) : (
//         filteredItems.map((item, index) => (
//           <div key={index} className="attractionCardADF" style={{ marginBottom: '20px' }}>
//             <div className="attractionCardImageContainer">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="attractionCardImage"
//               />

//               <AiFillHeart
//                 className="attractionCardHeartIcon"
//                 onClick={(e) => handleHeartClick(e, item)}
//                 style={{ color: 'red', width: '25px',height: '25px', padding: '4px'}}
//               />

//               {item.category && item.category !== 'Offers' && (
//                 <div className="attractionCardCategoryADF">{item.category}</div>
//               )}
//             </div>

//             <div className="attractionCardDetails">
//               <h3 style={{ fontWeight: 500 }}>{item.title}</h3>
//               {item.description && <p>{item.description}</p>}
//               {item.distance && <p>{item.distance} KM</p>}
//               {item.buttonLabel && (
//                 <button className='showOfferButton'>{item.buttonLabel}</button>
//               )}
//             </div>
//           </div>
//         ))
//       )}

//       {/* Bottom Sheet */}
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
//               dragElastic={0.2}
//             >
//               <div className="offers-handle-bar" />
//               <div className="offers-filter-options">
//                 {filters.map((filter) => (
//                   <div
//                     key={filter}
//                     className={`offers-radio-option ${selectedFilter === filter ? 'offers-active' : ''}`}
//                     onClick={() => handleSelectFilter(filter)}
//                   >
//                     <div className="offers-radio-circle" />
//                     {filter}
//                   </div>
//                 ))}
//                 <button className="offers-bottom-sheet-close-btn" onClick={handleClose}>
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState } from 'react';
import './AddToFavorite.css';
import { AiFillHeart } from 'react-icons/ai';
import { useFavorites } from '../data/FavoritesContext';

// ✅ Utility to build image URL with token
const getImageUrlWithToken = (url, token) => {
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

export default function AddToFavorite() {
  const [selectedFilter, setSelectedFilter] = useState('Offers');
  const { favorites, removeFromFavorites, addToFavorites } = useFavorites();
  const token = localStorage.getItem('token');

  const categoryMappedToPoints = [
    'Food & Drink',
    'Culture',
    'Culture & Sights',
    'Vegan Friendly',
    'Vegan & Vegetarian',
    'Activity & Wellness',
    'Nature',
    'Culture & Landmarks',
    'Nightlife'
  ];

  const filters = ['Offers', 'Points', 'Events'];

  const filteredItems =
    selectedFilter === 'Offers'
      ? favorites.filter(item => item.category === 'Offers')
      : selectedFilter === 'Events'
        ? favorites.filter(item => item.category === 'Events')
        : favorites.filter(item => categoryMappedToPoints.includes(item.category));

  const handleHeartClick = (e, item) => {
    e.stopPropagation();
    if (favorites.some(fav => fav.id === item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <div
      style={{
        paddingBottom: '100px',
        height: 'calc(100vh - 70px)',
        overflowY: 'auto',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Filter Tabs */}
      <div className="offers-tab-bar">
        {filters.map((filter) => (
          <div
            key={filter}
            className={`offers-tab ${selectedFilter === filter ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </div>

      <div className="offers-text">Saved {selectedFilter}</div>

      {filteredItems.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No saved {selectedFilter.toLowerCase()} yet!
        </p>
      ) : (
        filteredItems.map((item, index) => {
          // ✅ Correct image URL resolution
          const rawUrl = item.image?.url || item.photo?.url || item.image || '';
          const imageUrl = getImageUrlWithToken(rawUrl, token);

          return (
            <div key={index} className="attractionCardADF" style={{ marginBottom: '20px' }}>
              <div className="attractionCardImageContainer">
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="attractionCardImage"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200';
                  }}
                />
                <AiFillHeart
                  className="attractionCardHeartIcon"
                  onClick={(e) => handleHeartClick(e, item)}
                  style={{ color: 'red', width: '25px', height: '25px', padding: '4px' }}
                />
                {item.category && item.category !== 'Offers' && (
                  <div className="attractionCardCategoryADF">{item.category}</div>
                )}
              </div>

              <div className="attractionCardDetails">
                <h3 style={{ fontWeight: 500 }}>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                {item.distance && <p>{item.distance} KM</p>}
                {item.buttonLabel && (
                  <button className="showOfferButton">{item.buttonLabel}</button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
