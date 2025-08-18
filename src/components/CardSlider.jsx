// import React, { useEffect, useRef, useState } from 'react';
// import { motion, animate, useMotionValue, useDragControls } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import { useFavorites } from '../data/FavoritesContext';
// import { AiFillHeart } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import './CardSlider.css';

// const HALF_HEIGHT = window.innerHeight * 0.6;
// const PEEK_HEIGHT = 175;
// const MAX_HEIGHT = window.innerHeight * 1.0;

// export default function CardSlider({
//   show,
//   points,
//   activeMarker,
//   setShowCardSheet,
//   onHeightChange,
// }) {
//   const y = useMotionValue(window.innerHeight - HALF_HEIGHT);
//   const [heightState, setHeightState] = useState('half');
//   const [canDragSheet, setCanDragSheet] = useState(true);
//   const containerRef = useRef(null);
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const [heartBubbles, setHeartBubbles] = useState({});
//   const [activeSlideIndexes, setActiveSlideIndexes] = useState({});
//   const dragControls = useDragControls();
//   const navigate = useNavigate();

//   useEffect(() => {
//     setHeightState('half');
//     snapTo(HALF_HEIGHT, true);
//   }, []);

//   useEffect(() => {
//     if (!points || !points.length) return;
//     const initialIndexes = {};
//     points.forEach((point) => {
//       initialIndexes[point.id] = 0;
//     });
//     setActiveSlideIndexes(initialIndexes);
//   }, [points]);

//   useEffect(() => {
//     if (!activeMarker || !containerRef.current) return;

//     if (heightState !== 'half') {
//       setHeightState('half');
//       snapTo(HALF_HEIGHT, true);
//     }

//     setTimeout(() => {
//       const scrollContainer = containerRef.current;
//       const cardElement = document.getElementById(`card-${activeMarker}`);
//       if (cardElement && scrollContainer) {
//         const cardOffsetTop = cardElement.offsetTop;
//         scrollContainer.scrollTo({
//           top: cardOffsetTop - 20,
//           behavior: 'smooth',
//         });
//       }
//     }, 350);
//   }, [activeMarker]);

//   useEffect(() => {
//     const scrollContainer = containerRef.current;
//     if (!scrollContainer) return;

//     const handleScroll = () => {
//       const atTop = scrollContainer.scrollTop === 0;
//       setCanDragSheet(atTop);
//     };

//     scrollContainer.addEventListener('scroll', handleScroll);
//     return () => scrollContainer.removeEventListener('scroll', handleScroll);
//   }, []);

//   const snapTo = (targetHeight, isFinal = false) => {
//     animate(y, window.innerHeight - targetHeight, {
//       type: 'spring',
//       stiffness: 200,
//       damping: 25,
//       mass: 0.5,
//       onComplete: () => {
//         if (onHeightChange) onHeightChange(targetHeight, !!isFinal);
//       },
//     });
//   };

//   const handleDrag = (_, info) => {
//     const newY = y.get() + info.delta.y;
//     const minY = window.innerHeight - MAX_HEIGHT;
//     const maxY = window.innerHeight - PEEK_HEIGHT;
//     if (newY >= minY && newY <= maxY) {
//       y.set(newY);
//     }
//   };

//   const [height, setHeight] = useState(PEEK_HEIGHT);
//   const FULL_HEIGHT = window.innerHeight * 1.0;

//   const handleDragEnd = (event, info) => {
//     const offset = info.offset.y;
//     let newHeight;

//     if (offset < -100) {
//       newHeight = FULL_HEIGHT;
//       setHeightState('full');
//     } else if (offset > 100) {
//       newHeight = PEEK_HEIGHT;
//       setHeightState('peek');
//     } else {
//       newHeight = HALF_HEIGHT; 
//       setHeightState('half');
//     }

//     setHeight(newHeight);
//     snapTo(newHeight, true);
//   };

//   const handleHeartClick = (e, point) => {
//     e.stopPropagation();
//     const isFav = favorites.some((fav) => fav.id === point.id);
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
//     setHeartBubbles((prev) => ({ ...prev, [point.id]: true }));
//     setTimeout(() => {
//       setHeartBubbles((prev) => ({ ...prev, [point.id]: false }));
//     }, 1000);
//   };

//   const handleToggleHeight = () => {
//     if (heightState === 'peek') {
//       setHeightState('half');
//       snapTo(HALF_HEIGHT, true);
//     } else if (heightState === 'half') {
//       setHeightState('full');
//       snapTo(MAX_HEIGHT, true);
//     } else {
//       setHeightState('peek');
//       snapTo(PEEK_HEIGHT, true);
//     }
//   };

//   if (!points?.length) return null;

//   return (
//     <motion.div
//       className="bottom-sheet-card"
//       style={{
//         y,
//         position: 'fixed',
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 2,
//         touchAction: 'none',
//       }}
//       drag="y"
//       dragElastic={0.1}
//       dragMomentum={false}
//       dragControls={dragControls}
//       dragListener={canDragSheet}
//       onDrag={handleDrag}
//       onDragEnd={handleDragEnd}
//     >
//       <div
//         className="sheet-drag-header"
//         onClick={handleToggleHeight}
//         onPointerDown={(e) => dragControls.start(e)}
//       >
//         <div className="handle-bar" />
//       </div>

//       <div
//         className={`card-vertical-scroll ${heightState === 'peek' ? 'no-scroll' : ''}`}
//         ref={containerRef}
//       >
//         {points.map((point, index) => {
//           const isFavorite = favorites.some((fav) => fav.id === point.id);
//           const showBubbles = heartBubbles[point.id];
//           return (
//             <div
//               key={`${point.id}-${index}`}
//               id={`card-${point.id}`}
//               className="card-vertical"
//               style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
//               onClick={() => {
//                 const itemWithId = {
//                   id: point.id,
//                   title: point.name,
//                   image: point.images?.[0] || '',
//                   description: point.tags?.join(', '),
//                   category: point.macro || 'Attractions',
//                   distance: point.distance,
//                   fullItem: point,
//                 };
//                 setTimeout(() => {
//                   navigate('/details', { state: itemWithId });
//                 }, 50);
//               }}
//             >
//               <Swiper
//                 modules={[Pagination]}
//                 pagination={{ clickable: true }}
//                 className="swiper-container"
//                 onSlideChange={(swiper) =>
//                   setActiveSlideIndexes((prev) => ({
//                     ...prev,
//                     [point.id]: swiper.activeIndex,
//                   }))
//                 }
//               >
//                 {point.images.map((img, idx) => {
//                   const token = localStorage.getItem('token');
//                   let imageUrl = '/fallback.jpg';

//                   if (img) {
//                     try {
//                       const url = new URL(img);
//                       if (token) url.searchParams.append('token', token);
//                       imageUrl = url.toString();
//                     } catch (err) {
//                       console.error('Invalid image URL:', err);
//                     }
//                   }

//                   return (
//                     <SwiperSlide key={idx}>
//                       <div className="attractionCardImageContainer">
//                         <img
//                           src={imageUrl}
//                           alt={`${point.name}-${idx}`}
//                           className="attractionCardImage"
//                         />
//                         {activeSlideIndexes[point.id] === idx && (
//                           <div className="attractionCardCategory">
//                             {point.tags?.[0]}
//                           </div>
//                         )}
//                         {showBubbles && (
//                           <div className="bubblesContainer">
//                             {Array.from({ length: 5 }).map((_, i) => (
//                               <span
//                                 key={i}
//                                 className="bubble"
//                                 style={{ left: `${10 + Math.random() * 20}px` }}
//                               />
//                             ))}
//                           </div>
//                         )}
//                         <div
//                           className="attractionCardHeartIcon"
//                           onClick={(e) => handleHeartClick(e, point)}
//                         >
//                           <AiFillHeart
//                             style={{
//                               color: isFavorite ? 'red' : 'white',
//                               fontSize: '22px',
//                             }}
//                             className={showBubbles ? 'heartAnimate' : ''}
//                           />
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   );
//                 })}
//               </Swiper>

//               <div className="attractionCardDetails">
//                 <h3>{point.name}</h3>
//                 <p>{point.tags?.join(', ')}</p>
//                 <p>{point.distance}</p>
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
import { useNavigate, useLocation } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import './CardSlider.css';

const HALF_HEIGHT = window.innerHeight * 0.6;
const PEEK_HEIGHT = 175;
const MAX_HEIGHT = window.innerHeight * 1.0;

export default function CardSlider({
  show,
  points,
  activeMarker,
  setShowCardSheet,
  onHeightChange,
}) {
  const y = useMotionValue(window.innerHeight - HALF_HEIGHT);
  const [heightState, setHeightState] = useState('half');
  const [canDragSheet, setCanDragSheet] = useState(true);
  const containerRef = useRef(null);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [heartBubbles, setHeartBubbles] = useState({});
  const [activeSlideIndexes, setActiveSlideIndexes] = useState({});
  const dragControls = useDragControls();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    setHeightState('half');
    snapTo(HALF_HEIGHT, true);
  }, []);

  useEffect(() => {
    if (!points || !points.length) return;
    const initialIndexes = {};
    points.forEach((point) => {
      initialIndexes[point.id] = 0;
    });
    setActiveSlideIndexes(initialIndexes);
  }, [points]);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
  
    if (location.state?.restoreScroll !== undefined) {
      scrollContainer.scrollTo({
        top: location.state.restoreScroll,
        behavior: "instant",
      });
  
      if (location.state.activeCardId) {
        const cardElement = document.getElementById(`card-${location.state.activeCardId}`);
        if (cardElement) {
          scrollContainer.scrollTo({
            top: cardElement.offsetTop - 20,
            behavior: "smooth",
          });
        }
      }
    }
  }, [points, location.state]);
  

  useEffect(() => {
    if (!activeMarker || !containerRef.current) return;

    if (heightState !== 'half') {
      setHeightState('half');
      snapTo(HALF_HEIGHT, true);
    }

    setTimeout(() => {
      const scrollContainer = containerRef.current;
      const cardElement = document.getElementById(`card-${activeMarker}`);
      if (cardElement && scrollContainer) {
        const cardOffsetTop = cardElement.offsetTop;
        scrollContainer.scrollTo({
          top: cardOffsetTop - 20,
          behavior: 'smooth',
        });
      }
    }, 350);
  }, [activeMarker]);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
  
    if (location.state?.restoreScroll !== undefined) {
      scrollContainer.scrollTo({
        top: location.state.restoreScroll,
        behavior: "instant"
      });
    }
  }, [points, location.state]);

  const snapTo = (targetHeight, isFinal = false) => {
    animate(y, window.innerHeight - targetHeight, {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 0.5,
      onComplete: () => {
        if (onHeightChange) onHeightChange(targetHeight, !!isFinal);
      },
    });
  };

  const handleDrag = (_, info) => {
    const newY = y.get() + info.delta.y;
    const minY = window.innerHeight - MAX_HEIGHT;
    const maxY = window.innerHeight - PEEK_HEIGHT;
    if (newY >= minY && newY <= maxY) {
      y.set(newY);
    }
  };

  const [height, setHeight] = useState(PEEK_HEIGHT);
  const FULL_HEIGHT = window.innerHeight * 1.0;

  const handleDragEnd = (event, info) => {
    const offset = info.offset.y;
    let newHeight;

    if (offset < -100) {
      newHeight = FULL_HEIGHT;
      setHeightState('full');
    } else if (offset > 100) {
      newHeight = PEEK_HEIGHT;
      setHeightState('peek');
    } else {
      newHeight = HALF_HEIGHT;
      setHeightState('half');
    }

    setHeight(newHeight);
    snapTo(newHeight, true);
  };

  const handleHeartClick = (e, point) => {
    e.stopPropagation();
    const isFav = favorites.some((fav) => fav.id === point.id);
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
    setHeartBubbles((prev) => ({ ...prev, [point.id]: true }));
    setTimeout(() => {
      setHeartBubbles((prev) => ({ ...prev, [point.id]: false }));
    }, 1000);
  };

  const handleToggleHeight = () => {
    if (heightState === 'peek') {
      setHeightState('half');
      snapTo(HALF_HEIGHT, true);
    } else if (heightState === 'half') {
      setHeightState('full');
      snapTo(MAX_HEIGHT, true);
    } else {
      setHeightState('peek');
      snapTo(PEEK_HEIGHT, true);
    }
  };

  if (!points?.length) return null;

  return (
    <motion.div
      className="bottom-sheet-card"
      style={{
        y,
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        touchAction: 'none',
      }}
      drag="y"
      dragElastic={0.1}
      dragMomentum={false}
      dragControls={dragControls}
      dragListener={canDragSheet}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div
        className="sheet-drag-header"
        onClick={handleToggleHeight}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="handle-bar" />
      </div>

      <div
        className={`card-vertical-scroll ${heightState === 'peek' ? 'no-scroll' : ''}`}
        ref={containerRef}
      >
        {points.map((point, index) => {
          const isFavorite = favorites.some((fav) => fav.id === point.id);
          const showBubbles = heartBubbles[point.id];
          return (
            <div
              key={`${point.id}-${index}`}
              id={`card-${point.id}`}
              className="card-vertical"
              style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
              // onClick={() => {
              //   const itemWithId = {
              //     id: point.id,
              //     title: point.name,
              //     image: point.images?.[0] || '',
              //     description: point.tags?.join(', '),
              //     category: point.macro || 'Attractions',
              //     distance: point.distance,
              //     fullItem: point,
              //   };
              //   const scrollContainer = containerRef.current;
              //   const scrollPos = scrollContainer ? scrollContainer.scrollTop : 0;

              //   setTimeout(() => {
              //     navigate('/details', { state: { ...itemWithId, prevScroll: scrollPos } });
              //   }, 50);
              // }}
              onClick={() => {
                const itemWithId = {
                  id: point.id,
                  title: point.name,
                  image: point.images?.[0] || '',
                  description: point.tags?.join(', '),
                  category: point.macro || 'Attractions',
                  distance: point.distance,
                  fullItem: point,
                };
                const scrollContainer = containerRef.current;
                const scrollPos = scrollContainer ? scrollContainer.scrollTop : 0;
              
                // 🔥 prevScroll bhejna zaroori
                navigate('/details', { state: { ...itemWithId, prevScroll: scrollPos } });
              }}
            >
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="swiper-container"
                onSlideChange={(swiper) =>
                  setActiveSlideIndexes((prev) => ({
                    ...prev,
                    [point.id]: swiper.activeIndex,
                  }))
                }
              >
                {point.images.map((img, idx) => {
                  const token = localStorage.getItem('token');
                  let imageUrl = '/fallback.jpg';

                  if (img) {
                    try {
                      const url = new URL(img);
                      if (token) url.searchParams.append('token', token);
                      imageUrl = url.toString();
                    } catch (err) {
                      console.error('Invalid image URL:', err);
                    }
                  }

                  return (
                    <SwiperSlide key={idx}>
                      <div className="attractionCardImageContainer">
                        <img
                          src={imageUrl}
                          alt={`${point.name}-${idx}`}
                          className="attractionCardImage"
                        />
                        {activeSlideIndexes[point.id] === idx && (
                          <div className="attractionCardCategory">
                            {point.tags?.[0]}
                          </div>
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
                        <div
                          className="attractionCardHeartIcon"
                          onClick={(e) => handleHeartClick(e, point)}
                        >
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
                  );
                })}
              </Swiper>

              <div className="attractionCardDetails">
                <h3>{point.name}</h3>
                <p>{point.tags?.join(', ')}</p>
                <p>{point.distance}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
