// import React, { useEffect, useState } from 'react';
// import { motion, animate, useMotionValue } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './CardSlider.css';

// const PEEK_HEIGHT = 150;
// const MAX_HEIGHT = window.innerHeight * 1;

// export default function CardSlider({ show, points, onClose }) {
//   const y = useMotionValue(0);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     if (show) {
//       setIsCollapsed(false);
//     }
//   }, [show]);

//   if (!show || !points?.length) {
//     console.log("CardSlider not shown");
//     return null;
//   }

//   const snapTo = (targetY) => {
//     animate(y, window.innerHeight - targetY, {
//       type: 'spring',
//       stiffness: 300,
//       damping: 30,
//     });
//   };

//   const handleDragEnd = (_, info) => {
//     if (info.offset.y > 100) {
//       setIsCollapsed(true);
//       snapTo(PEEK_HEIGHT);
//     } else if (info.offset.y < -100) {
//       setIsCollapsed(false);
//       snapTo(MAX_HEIGHT);
//     } else {
//       snapTo(isCollapsed ? PEEK_HEIGHT : MAX_HEIGHT);
//     }
//   };

//   return (
//     <motion.div
//       className="bottom-sheet-card"
//       style={{ y }}
//       drag="y"
//       dragConstraints={{ top: 0, bottom: 0 }}
//       onDragEnd={handleDragEnd}
//       dragElastic={0.2}
//     >
//       <div className="handle-bar" />
//       <div className="card-vertical-scroll">
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
//                   <img src={img} alt={`${point.name}-${idx}`} className="swiper-img" />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <div className="card-info">
//               {/* <h3>{point.name}</h3>
//               <p>{point.description}</p> */}
//               <h3>{point.name}</h3>
//               {/* <p>{point.description}</p> */}
//               <p><strong>Macro:</strong> {point.macro}</p>
//               <p><strong>Tags:</strong> {point.tags?.join(', ')}</p>
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
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CardSlider.css';

const PEEK_HEIGHT = 150;
const MAX_HEIGHT = window.innerHeight * 1;

export default function CardSlider({ show, points, activeMarker, setShowCardSheet }) {
  const y = useMotionValue(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (activeMarker && show) {
      setIsCollapsed(false);
      animate(y, window.innerHeight - MAX_HEIGHT, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });

      const index = points.findIndex((p) => p.id === activeMarker);
      if (index !== -1 && containerRef.current) {
        const child = containerRef.current.children[index];
        if (child) {
          child.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [activeMarker, show]);

  const snapTo = (targetY) => {
    animate(y, window.innerHeight - targetY, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100) {
      setIsCollapsed(true);
      snapTo(PEEK_HEIGHT);
    } else if (info.offset.y < -100) {
      setIsCollapsed(false);
      snapTo(MAX_HEIGHT);
    } else {
      snapTo(isCollapsed ? PEEK_HEIGHT : MAX_HEIGHT);
    }
  };

  if (!show || !points?.length) return null;

  return (
    <motion.div
      className="bottom-sheet-card"
      style={{ y }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      dragElastic={0.2}
    >
      <div className="handle-bar" />
      <div className="card-vertical-scroll" ref={containerRef}>
        {points.map((point, index) => (
          <div
            key={point.id}
            className="card-vertical"
            style={{ marginBottom: index === points.length - 1 ? '80px' : '12px' }}
          >
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="swiper-container"
            >
              {point.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={`${point.name}-${idx}`} className="swiper-img" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="card-info">
              <h3>{point.name}</h3>
              <p><strong>Macro:</strong> {point.macro}</p>
              <p><strong>Tags:</strong> {point.tags?.join(', ')}</p>
              <p><strong>Hours:</strong> {point.openingHours}</p>
              <p><strong>Distance:</strong> {point.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
