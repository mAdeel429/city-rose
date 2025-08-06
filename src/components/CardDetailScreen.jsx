// import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaHeart } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import './CardDetailScreen.css';

// import OfferCard from '../cards/OfferCard';
// import MapCard from '../cards/MapCard';
// import UpcomingEventCard from '../cards/UpcomingEventCard';
// import { useFavorites } from '../data/FavoritesContext';

// export default function CardDetailScreen() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);

//   const [cardData, setCardData] = useState(null);
//   const [pullHeight, setPullHeight] = useState(0);
//   const [isPulling, setIsPulling] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(260);
//   const [showBubbles, setShowBubbles] = useState(false);
//   const [animateHeart, setAnimateHeart] = useState(false);

//   const hasElasticTriggered = useRef(false);
//   const userInteracted = useRef(false);

//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

//   // Load card data from navigation state
//   useLayoutEffect(() => {
//     if (location.state) {
//       setCardData(location.state);
//     }

//     const timeout = setTimeout(() => {
//       window.dispatchEvent(new Event('resize'));
//     }, 50);

//     return () => clearTimeout(timeout);
//   }, [location.key]);

//   // Handle scroll + pull effect
//   useEffect(() => {
//     const scrollArea = scrollRef.current;
//     if (!scrollArea) return;

//     let lastScrollTop = scrollArea.scrollTop;
//     let startY = 0;
//     let pulling = false;

//     const triggerElastic = () => {
//       if (hasElasticTriggered.current) return;
//       hasElasticTriggered.current = true;
//       setPullHeight(40);
//       setTimeout(() => {
//         setPullHeight(0);
//         hasElasticTriggered.current = false;
//       }, 300);
//     };

//     const onTouchStart = (e) => {
//       if (scrollArea.scrollTop === 0) {
//         startY = e.touches[0].clientY;
//         pulling = true;
//         setIsPulling(true);
//       }
//     };

//     const onTouchMove = (e) => {
//       userInteracted.current = true;
//       if (!pulling) return;
//       const diffY = e.touches[0].clientY - startY;
//       if (diffY > 0 && scrollArea.scrollTop === 0) {
//         e.preventDefault();
//         setPullHeight(Math.min(diffY, 100));
//       }
//     };

//     const onTouchEnd = () => {
//       if (pullHeight > 10) triggerElastic();
//       pulling = false;
//       setIsPulling(false);
//       setPullHeight(0);
//     };

//     const onUserScroll = () => {
//       userInteracted.current = true;
//     };

//     const onScroll = () => {
//       const currentScrollTop = scrollArea.scrollTop;

//       if (
//         userInteracted.current &&
//         lastScrollTop > 30 &&
//         currentScrollTop === 0 &&
//         !isPulling &&
//         !hasElasticTriggered.current
//       ) {
//         triggerElastic();
//       }

//       if (currentScrollTop > lastScrollTop && currentScrollTop > 60) {
//         setHeaderHeight(120);
//       } else if (currentScrollTop < lastScrollTop && currentScrollTop < 200) {
//         setHeaderHeight(260);
//       }

//       lastScrollTop = currentScrollTop;
//     };

//     scrollArea.addEventListener('scroll', onScroll);
//     scrollArea.addEventListener('wheel', onUserScroll);
//     scrollArea.addEventListener('touchstart', onTouchStart, { passive: false });
//     scrollArea.addEventListener('touchmove', onTouchMove, { passive: false });
//     scrollArea.addEventListener('touchend', onTouchEnd);
//     scrollArea.addEventListener('touchmove', onUserScroll);

//     return () => {
//       scrollArea.removeEventListener('scroll', onScroll);
//       scrollArea.removeEventListener('wheel', onUserScroll);
//       scrollArea.removeEventListener('touchstart', onTouchStart);
//       scrollArea.removeEventListener('touchmove', onTouchMove);
//       scrollArea.removeEventListener('touchend', onTouchEnd);
//       scrollArea.removeEventListener('touchmove', onUserScroll);
//     };
//   }, [pullHeight, isPulling]);

//   // Handle case where no data is available
//   if (!cardData) {
//     return <div>No data found. Please go back and select a card.</div>;
//   }

//   const { id, image, title, category, distance } = cardData;
//   const isFavorite = favorites.some(item => item.id === id);

//   const handleHeartClick = () => {
//     if (isFavorite) {
//       removeFromFavorites(id);
//     } else {
//       addToFavorites({ id, image, title, category, distance });
//       setShowBubbles(true);
//       setAnimateHeart(true);
//       setTimeout(() => {
//         setShowBubbles(false);
//         setAnimateHeart(false);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="full-page">
//       <div className="scroll-area" ref={scrollRef}>
//         {/* Header with pull/stretch animation */}
//         <motion.div
//           className="header-container elastic-header"
//           animate={{ height: headerHeight + pullHeight }}
//           transition={{
//             type: isPulling ? 'tween' : 'spring',
//             stiffness: 150,
//             damping: 20,
//           }}
//         >
//           <motion.div
//             style={{ overflow: 'hidden' }}
//             animate={{ scale: 1 + pullHeight / 500 }}
//             transition={{ type: 'spring', stiffness: 120 }}
//           >
//             <img
//               src={image}
//               alt={title}
//               className="headers-image"
//               onLoad={() => window.dispatchEvent(new Event('resize'))}
//             />
//           </motion.div>

//           <div className="cds-back-icon" onClick={() => navigate(-1)}>
//             <FaArrowLeft />
//           </div>

//           <motion.div
//             className="cds-heart-icon"
//             onClick={handleHeartClick}
//             style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
//             animate={animateHeart ? { scale: [1, 1.4, 1] } : {}}
//             transition={{ duration: 0.4 }}
//           >
//             <FaHeart
//               className="cds-heart-filled"
//               style={{
//                 color: isFavorite ? 'red' : 'white',
//                 cursor: 'pointer',
//                 fontSize: '18px',
//               }}
//             />
//           </motion.div>

//           {showBubbles && (
//             <div className="cds-bubbles-container">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <motion.span
//                   key={i}
//                   className="cds-bubble"
//                   initial={{ opacity: 1, y: 0, scale: 1 }}
//                   animate={{ opacity: 0, y: -40, scale: 0.5 }}
//                   transition={{
//                     duration: 1,
//                     delay: Math.random() * 0.3,
//                     ease: 'easeOut',
//                   }}
//                   style={{ left: `${Math.random() * 20 - 10}px` }}
//                 >
//                   ❤️
//                 </motion.span>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Tabs UI */}
//         <div className="tabs-card">
//           {['Indicazioni', 'Orari', 'Sito'].map((tab) => (
//             <button key={tab} className="pill-tab">
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Main content */}
//         <div className="cart-container">
//           <div className="info">
//             <h3>{title}</h3>
//             <p className="category">{category}</p>
//             <p className="distance">{distance} KM</p>
//           </div>

//           <div className="gallery-grid-custom">
//             {[1, 2, 3, 4].map((_, i) => (
//               <div
//                 key={i}
//                 className={`grid-item image-${i + 1}${i === 3 ? ' with-overlay' : ''}`}
//               >
//                 <img
//                   src="https://media.cnn.com/api/v1/images/stellar/prod/200416163203-03b-ice-cream-around-the-world-restricted.jpg?q=w_1110,c_fill"
//                   alt={`Image ${i + 1}`}
//                 />
//                 {i === 3 && <div className="overlay-text">+4</div>}
//               </div>
//             ))}
//           </div>

//           <div style={{ margin: '20px 0px' }}>
//             <OfferCard />
//           </div>
//           <div style={{ marginTop: '20px' }}>
//             <MapCard lat={43.7780} lng={11.2486} placeName="Gelato Shop" />
//           </div>
//           <div style={{ marginBottom: '120px' }}>
//             <UpcomingEventCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// CardDetailScreen.js
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './CardDetailScreen.css';
import { fetchPointDetailsWithPhotos } from '../data/mockData';

import OfferCard from '../cards/OfferCard';
import MapCard from '../cards/MapCard';
import UpcomingEventCard from '../cards/UpcomingEventCard';
import { useFavorites } from '../data/FavoritesContext';

export default function CardDetailScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [pullHeight, setPullHeight] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(260);
  const [showBubbles, setShowBubbles] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const hasElasticTriggered = useRef(false);
  const userInteracted = useRef(false);

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  useLayoutEffect(() => {
    if (location.state) {
      setCardData(location.state);
    }

    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);

    return () => clearTimeout(timeout);
  }, [location.key]);

  useEffect(() => {
    const loadImages = async () => {
      if (!cardData?.fullItem?.id) return;
  
      const pointId = cardData.fullItem.id;
      console.log('📌 Fetching more images for pointId:', pointId);
  
      try {
        const data = await fetchPointDetailsWithPhotos(pointId);
        console.log('✅ Response from /point/{id}?expand=photos:', data);
  
        const photos = data?.point?.photos;
        if (photos?.length) {
          const token = localStorage.getItem('token');
          const urls = photos.map(photo => {
            const url = new URL(photo.url);
            url.searchParams.append('token', token);
            return url.toString();
          });
  
          setImageUrls(urls);
        } else {
          console.warn('🚫 No photos found.');
        }
      } catch (err) {
        console.error('❌ Error while fetching images:', err);
      }
    };
  
    loadImages();
  }, [cardData]);
  

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (!scrollArea) return;

    let lastScrollTop = scrollArea.scrollTop;
    let startY = 0;
    let pulling = false;

    const triggerElastic = () => {
      if (hasElasticTriggered.current) return;
      hasElasticTriggered.current = true;
      setPullHeight(40);
      setTimeout(() => {
        setPullHeight(0);
        hasElasticTriggered.current = false;
      }, 300);
    };

    const onTouchStart = (e) => {
      if (scrollArea.scrollTop === 0) {
        startY = e.touches[0].clientY;
        pulling = true;
        setIsPulling(true);
      }
    };

    const onTouchMove = (e) => {
      userInteracted.current = true;
      if (!pulling) return;
      const diffY = e.touches[0].clientY - startY;
      if (diffY > 0 && scrollArea.scrollTop === 0) {
        e.preventDefault();
        setPullHeight(Math.min(diffY, 100));
      }
    };

    const onTouchEnd = () => {
      if (pullHeight > 10) triggerElastic();
      pulling = false;
      setIsPulling(false);
      setPullHeight(0);
    };

    const onScroll = () => {
      const currentScrollTop = scrollArea.scrollTop;

      if (
        userInteracted.current &&
        lastScrollTop > 30 &&
        currentScrollTop === 0 &&
        !isPulling &&
        !hasElasticTriggered.current
      ) {
        triggerElastic();
      }

      if (currentScrollTop > lastScrollTop && currentScrollTop > 60) {
        setHeaderHeight(120);
      } else if (currentScrollTop < lastScrollTop && currentScrollTop < 200) {
        setHeaderHeight(260);
      }

      lastScrollTop = currentScrollTop;
    };

    scrollArea.addEventListener('scroll', onScroll);
    scrollArea.addEventListener('touchstart', onTouchStart, { passive: false });
    scrollArea.addEventListener('touchmove', onTouchMove, { passive: false });
    scrollArea.addEventListener('touchend', onTouchEnd);

    return () => {
      scrollArea.removeEventListener('scroll', onScroll);
      scrollArea.removeEventListener('touchstart', onTouchStart);
      scrollArea.removeEventListener('touchmove', onTouchMove);
      scrollArea.removeEventListener('touchend', onTouchEnd);
    };
  }, [pullHeight, isPulling]);

  if (!cardData) return <div>No data found. Please go back and select a card.</div>;

  const { id, image, title, category, distance, fullItem } = cardData;
  const isFavorite = favorites.some(item => item.id === id);

  const token = localStorage.getItem('token');
  let imageUrl = '/fallback.jpg';

  if (image && image.startsWith('http')) {
    try {
      const url = new URL(image);
      url.searchParams.append('token', token);
      imageUrl = url.toString();
    } catch (err) {
      console.error('Invalid image URL:', err);
    }
  } else if (image) {
    imageUrl = image;
  }

  const handleHeartClick = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, image, title, category, distance });
      setShowBubbles(true);
      setAnimateHeart(true);
      setTimeout(() => {
        setShowBubbles(false);
        setAnimateHeart(false);
      }, 1000);
    }
  };

  return (
    <div className="full-page">
      <div className="scroll-area" ref={scrollRef}>
        <motion.div
          className="header-container elastic-header"
          animate={{ height: headerHeight + pullHeight }}
          transition={{
            type: isPulling ? 'tween' : 'spring',
            stiffness: 150,
            damping: 20,
          }}
        >
          <motion.div
            style={{ overflow: 'hidden' }}
            animate={{ scale: 1 + pullHeight / 500 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="headers-image"
              onLoad={() => setImageLoaded(true)}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
              }}
            />
            {!imageLoaded && (
              <div className="image-placeholder">
                <p>Loading image...</p>
              </div>
            )}
          </motion.div>

          <div className="cds-back-icon" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </div>

          <motion.div
            className="cds-heart-icon"
            onClick={handleHeartClick}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            animate={animateHeart ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <FaHeart
              style={{
                color: isFavorite ? 'red' : 'white',
                fontSize: '18px',
              }}
            />
          </motion.div>

          {showBubbles && (
            <div className="cds-bubbles-container">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="cds-bubble"
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
        </motion.div>

        {/* Buttons */}
        {fullItem?.buttons &&
          (fullItem.buttons.start_label || fullItem.buttons.center_label || fullItem.buttons.end_label) && (
            <div className="tabs-card">
              {['start', 'center', 'end'].map((pos, idx) => {
                const label = fullItem.buttons[`${pos}_label`];
                const icon = fullItem.buttons[`${pos}_icon`];
                const link = fullItem.buttons[`${pos}_link`];

                return label ? (
                  <button
                    key={idx}
                    className="pill-tab"
                    onClick={() => link && window.open(link, '_blank')}
                  >
                    {icon && <img src={icon} alt="" style={{ height: 14, marginRight: 6 }} />}
                    {label}
                  </button>
                ) : null;
              })}
            </div>
          )}

        <div className="cart-container">
          <div className="info">
            <h3>{title}</h3>
            <p className="category">{category}</p>
            <p className="distance">{distance}</p>
          </div>

          {/* 🔥 Images Grid */}
          <div className="gallery-grid-custom">
            {imageUrls.length > 0 ? (
              imageUrls.slice(0, 4).map((url, index) => (
                <div
                  key={index}
                  className={`grid-item image-${index + 1}${index === 3 && imageUrls.length > 4 ? ' with-overlay' : ''}`}
                >
                  <img src={url} alt={`Image ${index + 1}`} />
                  {index === 3 && imageUrls.length > 4 && (
                    <div className="overlay-text">+{imageUrls.length - 4}</div>
                  )}
                </div>
              ))
            ) : (
              <div>No images found</div>
            )}
          </div>

          {/* OfferCard */}
          {category === 'Food & Drink' ? (
            <div style={{ margin: '20px 0px' }}>
              <OfferCard />
            </div>
          ) : (
            <div style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
              No relevant offers found for this category.
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <MapCard
              lat={fullItem.lat || 0}
              lng={fullItem.lng || 0}
              placeName={fullItem.macros?.[0]?.name || title}
            />
          </div>

          <div style={{ marginBottom: '120px' }}>
            <UpcomingEventCard />
          </div>
        </div>
      </div>
    </div>
  );
}
