import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AttractionCard from './AttractionCard';
import styles from './AttractionRow.module.css';
import { useNavigate } from 'react-router-dom';

export default function AttractionRow({ title, data }) {
  const constraintsRef = useRef(null);
  const navigate = useNavigate();

  console.log('Row:', title, data);

  return (
    <div className={styles.pageContainer} style={{ margin: '10px 0' }}>
      <div className={styles.attractionsWrapper}>
        <h2>{title}</h2>

        <div className={styles.scrollContainer} ref={constraintsRef}>
          <motion.div
            className={styles.motionScroll}
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.2}
          >
            {data.map((item, index) => {
              const raw = item.fullItem || item.featured_pretty || item;

              const id = `${title}-${raw.title || 'no-title'}-${index}`;
              const itemWithId = { ...item, id };

              // DEBUG: check what is being passed
              console.log("Item being sent to AttractionCard:", item);

              return (
                <AttractionCard
                  key={id}
                  id={id}
                  image={item.image}
                  title={item.title}
                  category={item.category || item.fullItem?.category}
                  macros={item.macros || item.fullItem?.macros}  // ✅ fixed here
                  distance={item.distance}
                  fullItem={item.fullItem || item}  // ✅ pass full item for detail page
                  onClick={() => {
                    setTimeout(() => {
                      navigate('/details', { state: itemWithId });
                    }, 50);
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}




// import React, { useRef } from 'react';
// import { motion } from 'framer-motion';
// import AttractionCard from './AttractionCard';
// import styles from './AttractionRow.module.css';
// import { useNavigate } from 'react-router-dom';

// export default function AttractionRow({ title, data }) {
//   const constraintsRef = useRef(null);
//   const navigate = useNavigate();

//   console.log('Row:', title, data);

//   return (
//     <div className={styles.pageContainer} style={{ margin: '10px 0' }}>
//       <div className={styles.attractionsWrapper}>
//         <h2>{title}</h2>
//         <div className={styles.scrollContainer} ref={constraintsRef}>
//           <motion.div
//             className={styles.motionScroll}
//             drag="x"
//             dragConstraints={constraintsRef}
//             dragElastic={0.2}
//           >
//             {data.map((item, index) => {
//               const raw = item?.fullItem || item?.featured_pretty || item;

//               const name = item?.title || item?.name || item?.fullItem?.title || 'Untitled';
//               const image = item?.image || item?.fullItem?.image || '/fallback.jpg';
//               const distance = item?.distance || item?.fullItem?.distance || 'Unknown';
//               const category = item?.category || title;

//               // Note: Use actual item id for key to avoid conflicts
//               const keyId = item.id || `${title}-${name}-${index}`;

//               return (
//                 <AttractionCard
//                   key={keyId}
//                   id={item.id}
//                   title={name}
//                   image={image}
//                   distance={distance}
//                   category={category}
//                   fullItem={item.fullItem || item} 
//                   onClick={(data) => {
//                     navigate('/details', { state: data }); 
//                   }}
//                 />
//               );
//             })}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
