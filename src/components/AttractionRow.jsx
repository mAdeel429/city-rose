// import React, { useRef } from 'react';
// import { motion } from 'framer-motion';
// import AttractionCard from './AttractionCard';
// import styles from './AttractionRow.module.css';
// import { useNavigate } from 'react-router-dom';

// export default function AttractionRow({ title, data }) {
//   const constraintsRef = useRef(null);
//   const navigate = useNavigate();

//   return (
//     <div className={styles.pageContainer} style={{ margin: '20px 0' }}>
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
//               const id = `${title}-${item.title}-${index}`; // Unique id
//               return (
//                 <AttractionCard
//                   key={id}
//                   id={id}
//                   image={item.image}
//                   title={item.title}
//                   category={item.category}
//                   distance={item.distance}
//                   onClick={() => {
//                     navigate('/details', { state: item });
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



import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AttractionCard from './AttractionCard';
import styles from './AttractionRow.module.css';
import { useNavigate } from 'react-router-dom';

export default function AttractionRow({ title, data }) {
  const constraintsRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer} style={{ margin: '20px 0' }}>
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
              const id = `${title}-${item.title}-${index}`; // Unique id
              const itemWithId = { ...item, id }; // ✅ Add id to item before navigation

              return (
                <AttractionCard
                  key={id}
                  id={id}
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  distance={item.distance}
                  onClick={() => {
                    navigate('/details', { state: itemWithId }); // ✅ Pass full item with id
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
