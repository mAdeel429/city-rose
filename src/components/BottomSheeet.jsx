// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './bottomSheeet.css';

// const BottomSheet = ({ title, options, onClose, onSelect }) => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         className="offers-bottom-sheet-backdrop"
//         onClick={onClose}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           className="offers-bottom-sheet"
//           onClick={(e) => e.stopPropagation()}
//           initial={{ y: '100%' }}
//           animate={{ y: 0 }}
//           exit={{ y: '100%' }}
//           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//           drag="y"
//           dragConstraints={{ top: 0, bottom: 0 }}
//           dragElastic={0.2}
//         >
//           <div className="offers-handle-bar" />
//           <div className="offers-filter-options">
//             <h3 style={{ padding: '0 16px' }}>{title}</h3>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '10px 16px' }}>
//               {options.map((opt, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => onSelect(opt)}
//                   className="offers-radio-option"
//                   style={{
//                     padding: '8px 12px',
//                     border: '1px solid black',
//                     borderRadius: '20px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   {opt}
//                 </div>
//               ))}
//             </div>
//             <button className="offers-bottom-sheet-close-btn" onClick={onClose}>Close</button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default BottomSheet;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './bottomSheeet.css';

const BottomSheet = ({ title, options, selectedOption, onClose, onSelect }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="offers-bottom-sheet-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="offers-bottom-sheet"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
        >
          <div className="offers-handle-bar" />
          <div className="offers-filter-options">
            <h3 style={{ padding: '0 16px' }}>{title}</h3>
            <div>
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelect(opt)}
                  className={`offers-radio-option ${opt === selectedOption ? 'offers-active' : ''}`}
                >
                  <div className="offers-radio-circle" />
                  <span>{opt}</span>
                </div>
              ))}
            </div>
            <button className="offers-bottom-sheet-close-btn" onClick={onClose}>Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BottomSheet;
