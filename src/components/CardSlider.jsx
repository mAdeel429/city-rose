// import React, { useEffect, useRef, useState } from 'react';
// import { motion, animate, useMotionValue } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import './CardSlider.css';
// import { AiFillHeart } from 'react-icons/ai';

// const PEEK_HEIGHT = 150;
// const MAX_HEIGHT = window.innerHeight;

// export default function CardSlider({ show, points, activeMarker, setShowCardSheet }) {
//   const y = useMotionValue(window.innerHeight - PEEK_HEIGHT);
//   const [isCollapsed, setIsCollapsed] = useState(true);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (show) {
//       setIsCollapsed(false);
//       snapTo(MAX_HEIGHT);
//     }
//   }, [show]);

//   // ✅ Scroll to active card
//   useEffect(() => {
//     if (!activeMarker || !containerRef.current) return;

//     const cardElement = document.getElementById(`card-${activeMarker}`);
//     if (cardElement) {
//       cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   }, [activeMarker]);

//   const snapTo = (targetHeight) => {
//     animate(y, window.innerHeight - targetHeight, {
//       type: 'spring',
//       stiffness: 200,
//       damping: 25,
//       mass: 0.5,
//     });
//   };

//   const handleDrag = (_, info) => {
//     if (!isCollapsed) return;
//     const newY = y.get() + info.delta.y;
//     const minY = window.innerHeight - MAX_HEIGHT;
//     const maxY = window.innerHeight - PEEK_HEIGHT;

//     if (newY >= minY && newY <= maxY) {
//       y.set(newY);
//     }
//   };

//   const handleDragEnd = (_, info) => {
//     const offsetY = info.offset.y;
//     const velocityY = info.velocity.y;
//     const DRAG_THRESHOLD = window.innerHeight * 0.15;

//     if (offsetY > DRAG_THRESHOLD || velocityY > 500) {
//       setIsCollapsed(true);
//       snapTo(PEEK_HEIGHT);
//     } else if (offsetY < -DRAG_THRESHOLD || velocityY < -500) {
//       setIsCollapsed(false);
//       snapTo(MAX_HEIGHT);
//     } else {
//       snapTo(isCollapsed ? PEEK_HEIGHT : MAX_HEIGHT);
//     }
//   };

//   if (!points?.length) return null;

//   return (
//     <motion.div
//       className="bottom-sheet-card"
//       style={{ y }}
//       drag="y"
//       dragElastic={0.1}
//       dragMomentum={false}
//       onDrag={handleDrag}
//       onDragEnd={handleDragEnd}
//     >
//       <div
//         className="sheet-drag-header"
//         onClick={() => {
//           const newState = !isCollapsed;
//           setIsCollapsed(newState);
//           snapTo(newState ? PEEK_HEIGHT : MAX_HEIGHT);
//         }}
//       >
//         <div className="handle-bar" />
//         <p className="sheet-heading">{points.length} places</p>
//       </div>

//       <div className="card-vertical-scroll" ref={containerRef}>
//         {points.map((point, index) => (
//           <div
//             key={point.id}
//             id={`card-${point.id}`} // 👈 needed for scrollIntoView
//             className="card-vertical"
//             style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
//           >
//             {/* ✅ Inner image Swiper */}
//             <Swiper
//               modules={[Pagination]}
//               pagination={{ clickable: true }}
//               className="swiper-container"
//             >
//               {point.images.map((img, idx) => (
//                 <SwiperSlide key={idx}>
//                   <div className="image-wrapper">
//                     <img src={img} alt={`${point.name}-${idx}`} className="swiper-img" />
//                     {idx === 0 && (
//                       <div className="attractionCardCategory">{point.macro}</div>
//                     )}
//                     <div className="icon-top-right">
//                       <AiFillHeart className="attractionCardHeartIcon" />
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <div className="card-info">
//               <h3>{point.name}</h3>
//               <p>{point.tags?.join(', ')}</p>
//               <p><strong>Hours:</strong> {point.openingHours}</p>
//               <p><strong>Distance:</strong> {point.distance}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }






import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useFavorites } from '../data/FavoritesContext';
import { AiFillHeart } from 'react-icons/ai';

import 'swiper/css';
import 'swiper/css/pagination';
import './CardSlider.css';

const PEEK_HEIGHT = 150;
const MAX_HEIGHT = window.innerHeight;

export default function CardSlider({ show, points, activeMarker, setShowCardSheet }) {
  const y = useMotionValue(window.innerHeight - PEEK_HEIGHT);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const containerRef = useRef(null);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [heartBubbles, setHeartBubbles] = useState({});
  const [activeSlideIndexes, setActiveSlideIndexes] = useState({});

  useEffect(() => {
    if (!points || !points.length) return;
  
    const initialIndexes = {};
    points.forEach(point => {
      initialIndexes[point.id] = 0; // default active slide index
    });
  
    setActiveSlideIndexes(initialIndexes);
  }, [points]);
  
  useEffect(() => {
    if (show) {
      setIsCollapsed(false);
      snapTo(MAX_HEIGHT);
    }
  }, [show]);

  useEffect(() => {
    if (!activeMarker || !containerRef.current) return;
    const cardElement = document.getElementById(`card-${activeMarker}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeMarker]);

  const snapTo = (targetHeight) => {
    animate(y, window.innerHeight - targetHeight, {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 0.5,
    });
  };

  const handleDrag = (_, info) => {
    if (!isCollapsed) return;
    const newY = y.get() + info.delta.y;
    const minY = window.innerHeight - MAX_HEIGHT;
    const maxY = window.innerHeight - PEEK_HEIGHT;
    if (newY >= minY && newY <= maxY) y.set(newY);
  };

  const handleDragEnd = (_, info) => {
    const offsetY = info.offset.y;
    const velocityY = info.velocity.y;
    const DRAG_THRESHOLD = window.innerHeight * 0.15;

    if (offsetY > DRAG_THRESHOLD || velocityY > 500) {
      setIsCollapsed(true);
      snapTo(PEEK_HEIGHT);
    } else if (offsetY < -DRAG_THRESHOLD || velocityY < -500) {
      setIsCollapsed(false);
      snapTo(MAX_HEIGHT);
    } else {
      snapTo(isCollapsed ? PEEK_HEIGHT : MAX_HEIGHT);
    }
  };

  const handleHeartClick = (e, point) => {
    e.stopPropagation();

    const isFav = favorites.some(fav => fav.id === point.id);

    if (isFav) {
      removeFromFavorites(point.id);
    } else {
      const favItem = {
        id: point.id,
        title: point.name,
        image: point.images?.[0] || '',
        description: point.tags?.join(', '),
        category: point.macro || 'Attractions',
      };
      addToFavorites(favItem);
      console.log('favorites', favorites)
    }

    // Trigger animation for both like and dislike
    setHeartBubbles(prev => ({ ...prev, [point.id]: true }));
    setTimeout(() => {
      setHeartBubbles(prev => ({ ...prev, [point.id]: false }));
    }, 1000);
  };

  if (!points?.length) return null;

  return (
    <motion.div
      className="bottom-sheet-card"
      style={{ y }}
      drag="y"
      dragElastic={0.1}
      dragMomentum={false}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div
        className="sheet-drag-header"
        onClick={() => {
          const newState = !isCollapsed;
          setIsCollapsed(newState);
          snapTo(newState ? PEEK_HEIGHT : MAX_HEIGHT);
        }}
      >
        <div className="handle-bar" />
        <p className="sheet-heading">{points.length} places</p>
      </div>

      <div className="card-vertical-scroll" ref={containerRef}>
        {points.map((point, index) => {
          const isFavorite = favorites.some(fav => fav.id === point.id);
          const showBubbles = heartBubbles[point.id];

          return (
            <div
              key={point.id}
              id={`card-${point.id}`}
              className="card-vertical"
              style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
            >
              {/* <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="swiper-container"
              > */}
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="swiper-container"
                onSlideChange={(swiper) =>
                  setActiveSlideIndexes(prev => ({
                    ...prev,
                    [point.id]: swiper.activeIndex
                  }))
                }
              >
                {point.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="image-wrapper">
                      <img
                        src={img}
                        alt={`${point.name}-${idx}`}
                        className="swiper-img"
                      />

                      {/* {idx === 0 && (
                        <div className="attractionCardCategory">{point.macro}</div>
                      )} */}
                      {activeSlideIndexes[point.id] === idx && (
                        <div className="attractionCardCategory">{point.macro}</div>
                      )}

                      {showBubbles && (
                        <div className="bubbles-container">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className="heart-bubble"
                              style={{
                                left: `${10 + Math.random() * 20}px`,
                              }}
                            >
                              ❤️
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className="icon-top-right"
                        onClick={(e) => handleHeartClick(e, point)}
                      >
                        <AiFillHeart
                          className={`attractionCardHeartIcon ${showBubbles ? 'heart-pop' : ''
                            }`}
                          style={{
                            color: isFavorite ? 'red' : 'white',
                            transition: 'color 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="card-info">
                <h3>{point.name}</h3>
                <p>{point.tags?.join(', ')}</p>
                <p><strong>Hours:</strong> {point.openingHours}</p>
                <p><strong>Distance:</strong> {point.distance}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
