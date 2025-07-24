// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import styles from './bottomSheeet.module.css';

// const BottomSheet = ({ title, options, selectedOption, onClose, onSelect }) => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         className={styles.offersBottomSheetBackdrop}
//         onClick={onClose}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           className={styles.offersBottomSheet}
//           onClick={(e) => e.stopPropagation()}
//           initial={{ y: '100%' }}
//           animate={{ y: 0 }}
//           exit={{ y: '100%' }}
//           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//           drag="y"
//           dragConstraints={{ top: 0, bottom: 0 }}
//           dragElastic={0.2}
//         >
//           <div className={styles.offersFilterOptions}>
//             <h3 style={{ padding: '0 16px' }}>{title}</h3>
//             <div>
//               {options.map((opt, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => onSelect(opt)}
//                   className={`${styles['offersRadioOption']} ${opt === selectedOption ? styles['offersActive'] : ''}`}
//                 >
//                   <div className={styles.offersRadioCircle}/>
//                   <span>{opt}</span>
//                 </div>
//               ))}
//             </div>
//             <button className={styles.offersBottomSheetCloseBtn} onClick={onClose}>Close</button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default BottomSheet;



import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './bottomSheeet.module.css'; // CSS Module import

const BottomSheet = ({ title, options, selectedOption, onClose, onSelect }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.offersBottomSheetBackdrop}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.offersBottomSheet}
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
        >
          <div className={styles.offersFilterOptions}>
            <h3 style={{ padding: '0 16px' }}>{title}</h3>
            <div>
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelect(opt)}
                  className={`${styles.offersRadioOption} ${opt === selectedOption ? styles.offersRadioActive : ''}`}
                >
                  <div className={styles.offersRadioCircle} />
                  <span>{opt}</span>
                </div>
              ))}
            </div>
            <button
              className={styles['offers-bottom-sheet-close-btn']}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BottomSheet;
