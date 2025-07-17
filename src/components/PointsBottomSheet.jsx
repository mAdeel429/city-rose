// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './PointsBottomSheet.css';

// const macroOptions = {
//   Food: {
//     title: "CUISINE",
//     tags: ["Indian", "Chinese", "Vegan", "Macrobiotic"],
//   },
//   Nightlife: {
//     title: "TYPE",
//     tags: ["Clubs", "Bars", "Live Music", "Lounge"],
//   },
//   Tours: {
//     title: "CATEGORIES",
//     tags: ["City Tour", "Historical", "Boat Ride", "Adventure"],
//   },
// };

// export default function PointsBottomSheet({
//   show,
//   onClose,
//   setActiveFiltersCount,
//   setMacro,
//   setTags
// }) {
//   const [dragY, setDragY] = useState(0);
//   const [localMacro, setLocalMacro] = useState(null);
//   const [activeTags, setActiveTags] = useState([]);

//   const handleDragEnd = (event, info) => {
//     if (info.offset.y > 100) {
//       onClose();
//     } else {
//       setDragY(0);
//     }
//   };

//   const handleTagToggle = (tag) => {
//     if (activeTags.includes(tag)) {
//       setActiveTags(activeTags.filter((t) => t !== tag));
//     } else {
//       setActiveTags([...activeTags, tag]);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           className="points-sheet-backdrop"
//           onClick={onClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="points-sheet-container"
//             onClick={(e) => e.stopPropagation()}
//             initial={{ y: '100%' }}
//             animate={{ y: dragY }}
//             exit={{ y: '100%' }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//             drag="y"
//             dragConstraints={{ top: 0, bottom: 0 }}
//             onDragEnd={handleDragEnd}
//             dragElastic={0.2}
//           >
//             <div className="points-sheet-handle" />

//             <div className="macro-section">
//               <p className="macro-title">Choose Macro</p>
//               <div className="macro-options">
//                 {Object.keys(macroOptions).map((macro) => (
//                   <button
//                     key={macro}
//                     className={`macro-btn ${localMacro === macro ? 'selected' : ''}`}
//                     onClick={() => {
//                       setLocalMacro(macro);
//                       setActiveTags([]);
//                     }}
//                   >
//                     {macro}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {localMacro && (
//               <div className="filter-bubbles">
//                 <p className="bubble-group-title">
//                   {macroOptions[localMacro].title}
//                 </p>
//                 <div className="bubble-tags">
//                   {macroOptions[localMacro].tags.map((tag) => (
//                     <button
//                       key={tag}
//                       className={`bubble-tag ${activeTags.includes(tag) ? 'active' : ''}`}
//                       onClick={() => handleTagToggle(tag)}
//                     >
//                       {tag}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="bottom-actions">
//               <button className="close-btn" onClick={onClose}>Close</button>
//               <button
//                 className="apply-btn"
//                 onClick={() => {
//                   setMacro(localMacro);
//                   setTags(activeTags);
//                   const filterCount = [localMacro, ...activeTags].filter(Boolean).length;
//                   setActiveFiltersCount(filterCount);
//                   onClose();
//                 }}
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PointsBottomSheet.css';
import { IoClose } from 'react-icons/io5'; // Importing cross icon

const macroOptions = {
  Food: {
    title: "CUISINE",
    tags: ["Indian", "Chinese", "Vegan", "Macrobiotic"],
  },
  Nightlife: {
    title: "TYPE",
    tags: ["Clubs", "Bars", "Live Music", "Lounge"],
  },
  Tours: {
    title: "CATEGORIES",
    tags: ["City Tour", "Historical", "Boat Ride", "Adventure"],
  },
};

export default function PointsBottomSheet({
  show,
  onClose,
  setActiveFiltersCount,
  setMacro,
  setTags
}) {
  const [dragY, setDragY] = useState(0);
  const [localMacro, setLocalMacro] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  const hasActiveFilters = !!localMacro || activeTags.length > 0;

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  const handleTagToggle = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const handleResetFilters = () => {
    setLocalMacro(null);
    setActiveTags([]);
    setMacro(null);
    setTags([]);
    setActiveFiltersCount(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="points-sheet-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="points-sheet-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: dragY }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            dragElastic={0.2}
          >
            <div className="points-sheet-handle" />

            {/* Cross Icon Button in Top Right */}
            <button className="sheet-close-icon" onClick={onClose}>
              <IoClose size={24} />
            </button>

            <div className="macro-section">
              <p className="macro-title">Choose Macro</p>
              <div className="macro-options">
                {Object.keys(macroOptions).map((macro) => (
                  <button
                    key={macro}
                    className={`macro-btn ${localMacro === macro ? 'selected' : ''}`}
                    onClick={() => {
                      setLocalMacro(macro);
                      setActiveTags([]);
                    }}
                  >
                    {macro}
                  </button>
                ))}
              </div>
            </div>

            {localMacro && (
              <div className="filter-bubbles">
                <p className="bubble-group-title">
                  {macroOptions[localMacro].title}
                </p>
                <div className="bubble-tags">
                  {macroOptions[localMacro].tags.map((tag) => (
                    <button
                      key={tag}
                      className={`bubble-tag ${activeTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bottom-actions">
              {/* Show Reset button only if filters are active */}
              {hasActiveFilters && (
                <button className="reset-btn" onClick={handleResetFilters}>
                  Clear all
                </button>
              )}

              <button
                className="apply-btn"
                onClick={() => {
                  setMacro(localMacro);
                  setTags(activeTags);
                  const filterCount = [localMacro, ...activeTags].filter(Boolean).length;
                  setActiveFiltersCount(filterCount);
                  onClose();
                }}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
