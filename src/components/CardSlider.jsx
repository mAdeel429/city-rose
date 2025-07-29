// import React, { useEffect, useRef, useState } from 'react';
// import { motion, animate, useMotionValue } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import { useFavorites } from '../data/FavoritesContext';
// import { AiFillHeart } from 'react-icons/ai';
// import { IoMdClose } from 'react-icons/io';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import './CardSlider.css';

// const HALF_HEIGHT = window.innerHeight * 0.6;
// const PEEK_HEIGHT = 120;
// const MAX_HEIGHT = window.innerHeight;

// export default function CardSlider({ show, points, activeMarker, setShowCardSheet, setBottomBarVisible, onHeightChange }) {
//   const y = useMotionValue(window.innerHeight - PEEK_HEIGHT);
//   const [heightState, setHeightState] = useState('half');
//   const containerRef = useRef(null);
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const [heartBubbles, setHeartBubbles] = useState({});
//   const [activeSlideIndexes, setActiveSlideIndexes] = useState({});

//   useEffect(() => {
//     if (onHeightChange) onHeightChange(heightState);
//   }, [heightState, onHeightChange]);

//   useEffect(() => {
//     if (!points || !points.length) return;
//     const initialIndexes = {};
//     points.forEach(point => {
//       initialIndexes[point.id] = 0;
//     });
//     setActiveSlideIndexes(initialIndexes);
//   }, [points]);

//   useEffect(() => {
//     setHeightState('half');
//     snapTo(HALF_HEIGHT);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = y.on("change", (latestY) => {
//       const currentHeight = window.innerHeight - latestY;

//       console.log("BottomSheet Height:", currentHeight);

//       if (Math.abs(currentHeight - PEEK_HEIGHT) < 5) {
//         console.log("Hiding BottomBar");
//         setBottomBarVisible(false);
//       } else {
//         console.log("Showing BottomBar");
//         setBottomBarVisible(true);
//       }
//     });
//     return () => unsubscribe();
//   }, [y, setBottomBarVisible]);


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
//     const newY = y.get() + info.delta.y;
//     const minY = window.innerHeight - MAX_HEIGHT;
//     const maxY = window.innerHeight - PEEK_HEIGHT;
//     if (newY >= minY && newY <= maxY) y.set(newY);
//   };

//   const handleDragEnd = (_, info) => {
//     const offsetY = info.offset.y;
//     const velocityY = info.velocity.y;
//     const DRAG_THRESHOLD = window.innerHeight * 0.15;

//     if (offsetY > DRAG_THRESHOLD || velocityY > 500) {
//       // drag down
//       if (heightState === 'full') {
//         setHeightState('half');
//         snapTo(HALF_HEIGHT);
//       } else {
//         setHeightState('peek');
//         snapTo(PEEK_HEIGHT);
//       }
//     } else if (offsetY < -DRAG_THRESHOLD || velocityY < -500) {
//       // drag up
//       setHeightState('full');
//       snapTo(MAX_HEIGHT);
//     } else {
//       if (heightState === 'full') {
//         snapTo(MAX_HEIGHT);
//       } else if (heightState === 'half') {
//         snapTo(HALF_HEIGHT);
//       } else {
//         snapTo(PEEK_HEIGHT);
//       }
//     }
//   };

//   const handleHeartClick = (e, point) => {
//     e.stopPropagation();
//     const isFav = favorites.some(fav => fav.id === point.id);
//     if (isFav) {
//       removeFromFavorites(point.id);
//     } else {
//       const favItem = {
//         id: point.id,
//         title: point.name,
//         image: point.images?.[0] || '',
//         description: point.tags?.join(', '),
//         category: point.macro || 'Attractions',
//       };
//       addToFavorites(favItem);
//     }
//     setHeartBubbles(prev => ({ ...prev, [point.id]: true }));
//     setTimeout(() => {
//       setHeartBubbles(prev => ({ ...prev, [point.id]: false }));
//     }, 1000);
//   };

//   const handleToggleHeight = () => {
//     if (heightState === 'peek') {
//       setHeightState('half');
//       snapTo(HALF_HEIGHT);
//     } else if (heightState === 'half') {
//       setHeightState('full');
//       snapTo(MAX_HEIGHT);
//     } else {
//       setHeightState('peek');
//       snapTo(PEEK_HEIGHT);
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
//       <div className="sheet-drag-header" onClick={handleToggleHeight}>
//         <div className="handle-bar" />
//         <p className="sheet-heading">{points.length} places</p>
  
//       </div>

//       <div className="card-vertical-scroll" ref={containerRef}>
//         {points.map((point, index) => {
//           const isFavorite = favorites.some(fav => fav.id === point.id);
//           const showBubbles = heartBubbles[point.id];
//           return (
//             <div
//               key={point.id}
//               id={`card-${point.id}`}
//               className="card-vertical"
//               style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
//             >
//               <Swiper
//                 modules={[Pagination]}
//                 pagination={{ clickable: true }}
//                 className="swiper-container"
//                 onSlideChange={(swiper) =>
//                   setActiveSlideIndexes(prev => ({
//                     ...prev,
//                     [point.id]: swiper.activeIndex
//                   }))
//                 }
//               >
//                 {point.images.map((img, idx) => (
//                   <SwiperSlide key={idx}>
//                     <div className="attractionCardImageContainer">
//                       <img src={img} alt={`${point.name}-${idx}`} className="attractionCardImage" />

//                       {activeSlideIndexes[point.id] === idx && (
//                         <div className="attractionCardCategory">{point.macro}</div>
//                       )}

//                       {showBubbles && (
//                         <div className="bubblesContainer">
//                           {Array.from({ length: 5 }).map((_, i) => (
//                             <span
//                               key={i}
//                               className="bubble"
//                               style={{ left: `${10 + Math.random() * 20}px` }}
//                             />
//                           ))}
//                         </div>
//                       )}

//                       <div className="attractionCardHeartIcon" onClick={(e) => handleHeartClick(e, point)}>
//                         <AiFillHeart
//                           style={{
//                             color: isFavorite ? 'red' : 'white',
//                             fontSize: '22px',
//                           }}
//                           className={showBubbles ? 'heartAnimate' : ''}
//                         />
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>

//               <div className="attractionCardDetails">
//                 <h3>{point.name}</h3>
//                 <p>{point.tags?.join(', ')}</p>
//                 <p><strong>Hours:</strong> {point.openingHours}</p>
//                 <p><strong>Distance:</strong> {point.distance}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </motion.div>
//   );
// }


import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useMotionValue, useDragControls } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useFavorites } from '../data/FavoritesContext';
import { AiFillHeart } from 'react-icons/ai';

import 'swiper/css';
import 'swiper/css/pagination';
import './CardSlider.css';

const HALF_HEIGHT = window.innerHeight * 0.6;
const PEEK_HEIGHT = 120;
const MAX_HEIGHT = window.innerHeight * 1.0;

export default function CardSlider({
  show,
  points,
  activeMarker,
  setShowCardSheet,
  setBottomBarVisible,
  onHeightChange,
}) {
  const y = useMotionValue(window.innerHeight - PEEK_HEIGHT);
  const [heightState, setHeightState] = useState('half');
  const [canDragSheet, setCanDragSheet] = useState(true);
  const containerRef = useRef(null);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [heartBubbles, setHeartBubbles] = useState({});
  const [activeSlideIndexes, setActiveSlideIndexes] = useState({});
  const dragControls = useDragControls();

  useEffect(() => {
    if (onHeightChange) onHeightChange(heightState);
  }, [heightState, onHeightChange]);

  useEffect(() => {
    if (!points || !points.length) return;
    const initialIndexes = {};
    points.forEach(point => {
      initialIndexes[point.id] = 0;
    });
    setActiveSlideIndexes(initialIndexes);
  }, [points]);

  useEffect(() => {
    setHeightState('half');
    snapTo(HALF_HEIGHT);
  }, []);

  useEffect(() => {
    const unsubscribe = y.on('change', latestY => {
      const currentHeight = window.innerHeight - latestY;
      if (Math.abs(currentHeight - PEEK_HEIGHT) < 5) {
        setBottomBarVisible(false);
      } else {
        setBottomBarVisible(true);
      }
    });
    return () => unsubscribe();
  }, [y, setBottomBarVisible]);

  useEffect(() => {
    if (!activeMarker || !containerRef.current) return;
    const cardElement = document.getElementById(`card-${activeMarker}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeMarker]);
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const atTop = scrollContainer.scrollTop === 0;
      setCanDragSheet(atTop);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const snapTo = targetHeight => {
    animate(y, window.innerHeight - targetHeight, {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 0.5,
    });
  };

  const handleDrag = (_, info) => {
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
      if (heightState === 'full') {
        setHeightState('half');
        snapTo(HALF_HEIGHT);
      } else {
        setHeightState('peek');
        snapTo(PEEK_HEIGHT);
      }
    } else if (offsetY < -DRAG_THRESHOLD || velocityY < -500) {
      setHeightState('full');
      snapTo(MAX_HEIGHT);
    } else {
      if (heightState === 'full') {
        snapTo(MAX_HEIGHT);
      } else if (heightState === 'half') {
        snapTo(HALF_HEIGHT);
      } else {
        snapTo(PEEK_HEIGHT);
      }
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
    }
    setHeartBubbles(prev => ({ ...prev, [point.id]: true }));
    setTimeout(() => {
      setHeartBubbles(prev => ({ ...prev, [point.id]: false }));
    }, 1000);
  };

  const handleToggleHeight = () => {
    if (heightState === 'peek') {
      setHeightState('half');
      snapTo(HALF_HEIGHT);
    } else if (heightState === 'half') {
      setHeightState('full');
      snapTo(MAX_HEIGHT);
    } else {
      setHeightState('peek');
      snapTo(PEEK_HEIGHT);
    }
  };

  if (!points?.length) return null;

  return (
    <motion.div
      className="bottom-sheet-card"
      style={{ y }}
      drag="y"
      dragElastic={0.1}
      dragMomentum={false}
      dragControls={dragControls}
      dragListener={canDragSheet}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div className="sheet-drag-header" onClick={handleToggleHeight} onPointerDown={(e) => dragControls.start(e)}>
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
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="swiper-container"
                onSlideChange={swiper =>
                  setActiveSlideIndexes(prev => ({
                    ...prev,
                    [point.id]: swiper.activeIndex,
                  }))
                }
              >
                {point.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="attractionCardImageContainer">
                      <img src={img} alt={`${point.name}-${idx}`} className="attractionCardImage" />
                      {activeSlideIndexes[point.id] === idx && (
                        <div className="attractionCardCategory">{point.macro}</div>
                      )}
                      {showBubbles && (
                        <div className="bubblesContainer">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className="bubble"
                              style={{ left: `${10 + Math.random() * 20}px` }}
                            />
                          ))}
                        </div>
                      )}
                      <div className="attractionCardHeartIcon" onClick={e => handleHeartClick(e, point)}>
                        <AiFillHeart
                          style={{
                            color: isFavorite ? 'red' : 'white',
                            fontSize: '22px',
                          }}
                          className={showBubbles ? 'heartAnimate' : ''}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="attractionCardDetails">
                <h3>{point.name}</h3>
                <p>{point.tags?.join(', ')}</p>
                <p>
                  <strong>Hours:</strong> {point.openingHours}
                </p>
                <p>
                  <strong>Distance:</strong> {point.distance}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}



// import React, { useEffect, useRef, useState } from 'react';
// import { motion, animate, useMotionValue } from 'framer-motion';
// import { useFavorites } from '../data/FavoritesContext';
// import { IoMdClose } from 'react-icons/io';
// import AttractionCard from '../components/AttractionCard'; // ✅ import the real UI card
// import './CardSlider.css';

// const HALF_HEIGHT = window.innerHeight * 0.6;
// const PEEK_HEIGHT = 120;
// const MAX_HEIGHT = window.innerHeight;

// export default function CardSlider({ show, points, activeMarker, setShowCardSheet, setBottomBarVisible, onHeightChange }) {
//   const y = useMotionValue(window.innerHeight - PEEK_HEIGHT);
//   const [heightState, setHeightState] = useState('half');
//   const containerRef = useRef(null);
//   const { favorites } = useFavorites();

//   useEffect(() => {
//     if (onHeightChange) onHeightChange(heightState);
//   }, [heightState, onHeightChange]);

//   useEffect(() => {
//     setHeightState('half');
//     snapTo(HALF_HEIGHT);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = y.on("change", (latestY) => {
//       const currentHeight = window.innerHeight - latestY;
//       if (Math.abs(currentHeight - PEEK_HEIGHT) < 5) {
//         setBottomBarVisible(false);
//       } else {
//         setBottomBarVisible(true);
//       }
//     });
//     return () => unsubscribe();
//   }, [y, setBottomBarVisible]);

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
//     const newY = y.get() + info.delta.y;
//     const minY = window.innerHeight - MAX_HEIGHT;
//     const maxY = window.innerHeight - PEEK_HEIGHT;
//     if (newY >= minY && newY <= maxY) y.set(newY);
//   };

//   const handleDragEnd = (_, info) => {
//     const offsetY = info.offset.y;
//     const velocityY = info.velocity.y;
//     const DRAG_THRESHOLD = window.innerHeight * 0.15;

//     if (offsetY > DRAG_THRESHOLD || velocityY > 500) {
//       // drag down
//       if (heightState === 'full') {
//         setHeightState('half');
//         snapTo(HALF_HEIGHT);
//       } else {
//         setHeightState('peek');
//         snapTo(PEEK_HEIGHT);
//       }
//     } else if (offsetY < -DRAG_THRESHOLD || velocityY < -500) {
//       // drag up
//       setHeightState('full');
//       snapTo(MAX_HEIGHT);
//     } else {
//       if (heightState === 'full') {
//         snapTo(MAX_HEIGHT);
//       } else if (heightState === 'half') {
//         snapTo(HALF_HEIGHT);
//       } else {
//         snapTo(PEEK_HEIGHT);
//       }
//     }
//   };

//   const handleToggleHeight = () => {
//     if (heightState === 'peek') {
//       setHeightState('half');
//       snapTo(HALF_HEIGHT);
//     } else if (heightState === 'half') {
//       setHeightState('full');
//       snapTo(MAX_HEIGHT);
//     } else {
//       setHeightState('peek');
//       snapTo(PEEK_HEIGHT);
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
//       <div className="sheet-drag-header" onClick={handleToggleHeight}>
//         <div className="handle-bar" />
//         <p className="sheet-heading">{points.length} places</p>
//         {(heightState === 'half' || heightState === 'full') && (
//           <button
//             className="close-sheet-btn"
//             onClick={(e) => {
//               e.stopPropagation();
//               setHeightState('peek');
//               snapTo(PEEK_HEIGHT);
//               setShowCardSheet(false);
//             }}
//           >
//             <IoMdClose size={24} />
//           </button>
//         )}
//       </div>

//       <div className="card-vertical-scroll" ref={containerRef}>
//         {points.map((point, index) => (
//           <div
//             key={point.id}
//             id={`card-${point.id}`}
//             style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
//           >
//             <AttractionCard
//               id={point.id}
//               image={point.images?.[0] || ''}
//               title={point.name}
//               category={point.macro || 'Attraction'}
//               distance={point.distance}
//               onClick={() => {
//                 // Optional: add custom click behavior here
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }
