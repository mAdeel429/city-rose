// import React, { useEffect, useRef, useState } from 'react';
// import { motion, animate, useMotionValue } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
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
//     const scrollEl = containerRef.current;
//     if (!scrollEl) return;

//     const handleScroll = () => {
//       if (!isCollapsed) return;

//       const scrollTop = scrollEl.scrollTop;
//       const isAtTop = scrollTop <= 0;
//       const isAtBottom = scrollEl.scrollHeight - scrollEl.scrollTop === scrollEl.clientHeight;

//       if (isAtTop || isAtBottom) {
//         animate(y, y.get() + 20, {
//           type: 'spring',
//           stiffness: 150,
//           damping: 20,
//         }).then(() => {
//           animate(y, window.innerHeight - PEEK_HEIGHT, {
//             type: 'spring',
//             stiffness: 200,
//             damping: 30,
//           });
//         });
//       }
//     };

//     scrollEl.addEventListener('scroll', handleScroll);
//     return () => scrollEl.removeEventListener('scroll', handleScroll);
//   }, [y, isCollapsed]);

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
//     const velocityY = info.velocity.y;
//     const offsetY = info.offset.y;
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
//           if (isCollapsed) {
//             setIsCollapsed(false);
//             snapTo(MAX_HEIGHT);
//           } else {
//             setIsCollapsed(true);
//             snapTo(PEEK_HEIGHT);
//           }
//         }}
//       >
//         <div className="handle-bar" />
//         <p className="sheet-heading">{points.length} places</p>
//       </div>

//       <div
//         className="card-vertical-scroll"
//         ref={containerRef}
//         style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
//       >
//         {points.map((point, index) => (
//           <div
//             key={point.id}
//             className="card-vertical"
//             style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
//           >
//             <Swiper
//               modules={[Pagination]}
//               pagination={{ clickable: true }}
//               className="swiper-container"
//             >
//               {point.images.map((img, idx) => (
//                 <SwiperSlide key={idx}>
//                   <div className="image-wrapper">
//                     <img src={img} alt={`${point.name}-${idx}`} className="swiper-img" />

//                     {idx === 0 && <div className="attractionCardCategory">{point.macro}</div>}

//                     <div className="icon-top-right">
//                       <AiFillHeart
//                         className='attractionCardHeartIcon'
//                       />
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <div className="card-info">
//               <h3>{point.name}</h3>
//               <p><strong></strong> {point.tags?.join(', ')}</p>
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
import 'swiper/css';
import 'swiper/css/pagination';
import './CardSlider.css';
import { AiFillHeart } from 'react-icons/ai';

const PEEK_HEIGHT = 150;
const MAX_HEIGHT = window.innerHeight;

export default function CardSlider({ show, points, activeMarker, setShowCardSheet }) {
  const y = useMotionValue(window.innerHeight - PEEK_HEIGHT);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (show) {
      setIsCollapsed(false);
      snapTo(MAX_HEIGHT);
    }
  }, [show]);

  // ✅ Scroll to active card
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

    if (newY >= minY && newY <= maxY) {
      y.set(newY);
    }
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
        {points.map((point, index) => (
          <div
            key={point.id}
            id={`card-${point.id}`} // 👈 needed for scrollIntoView
            className="card-vertical"
            style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
          >
            {/* ✅ Inner image Swiper */}
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="swiper-container"
            >
              {point.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="image-wrapper">
                    <img src={img} alt={`${point.name}-${idx}`} className="swiper-img" />
                    {idx === 0 && (
                      <div className="attractionCardCategory">{point.macro}</div>
                    )}
                    <div className="icon-top-right">
                      <AiFillHeart className="attractionCardHeartIcon" />
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
        ))}
      </div>
    </motion.div>
  );
}
