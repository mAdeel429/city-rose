// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './PointsBottomSheet.css';
// import { IoClose } from 'react-icons/io5';

// export const filterOptions = {
//   'Food & Drink': {
//     Category: ['Cafe', 'Restaurant', 'Street Food', 'Lounge Bar'],
//     Type: ['Ice Cream Shop', 'Pizzeria', 'Casual Dinning', 'Pub', 'Shushi', 'Sandwich'],
//     Cuisine: ['Italian', 'Asian', 'Indian', 'American'],
//     Price: ['$', '$$', '$$$'],
//     Tags: ['Popular', 'New', 'Family Friendly', 'Romantic'],
//   },
//   'Shopping': {
//     Category: ['Boutique', 'Mall', 'Souvenir Shop'],
//     Type: ['Clothing', 'Electronics', 'Jewelry'],
//     Price: ['$', '$$', '$$$'],
//     Tags: ['Local', 'Luxury', 'Discounted'],
//   },
//   'Culture & Sights': {
//     Category: ['Museum', 'Theatre', 'Gallery', 'Historic Site'],
//     Tags: ['Historical', 'Architecture', 'UNESCO'],
//     Genre: ['Art', 'History', 'Religious', 'Performing Arts', 'Classic Cinema', 'Modern Architecture'],
//     Price: ['$', '$$', '$$$'],
//   },
//   'Nightlife': {
//     Category: ['Bar', 'Club', 'Live Music'],
//     Type: ['Pub', 'Lounge'],
//     Tags: ['Dance Floor', 'Happy Hour', 'Cocktails'],
//     Price: ['$', '$$', '$$$'],
//   },
//   'Activity & Wellness': {
//     Category: ['Gym', 'Yoga', 'Spa', 'Hiking'],
//     Type: ['Indoor', 'Outdoor', 'Group Class'],
//     Tags: ['Relaxation', 'Fitness', 'Mindfulness'],
//     Price: ['$', '$$', '$$$'],
//   },
// };

// export default function PointsBottomSheet({
//   show,
//   onClose,
//   setActiveFiltersCount,
//   setMacro,
//   setTags,
//   macro,
//   onApplyFilters,
// }) {
//   const [dragY, setDragY] = useState(0);
//   const [localMacro, setLocalMacro] = useState(null);
//   const [activeTags, setActiveTags] = useState({});

//   useEffect(() => {
//     if (macro) {
//       setLocalMacro(macro);
//       if (!activeTags[macro]) {
//         setActiveTags((prev) => ({ ...prev, [macro]: {} }));
//       }
//     }
//   }, [macro]);

//   const handleDragEnd = (_, info) => {
//     if (info.offset.y > 100) {
//       onClose();
//     } else {
//       setDragY(0);
//     }
//   };

//   const handleMacroSelect = (macroKey) => {
//     setLocalMacro(macroKey);
//     if (!activeTags[macroKey]) {
//       setActiveTags((prev) => ({ ...prev, [macroKey]: {} }));
//     }
//   };

//   const handleTagToggle = (section, tag) => {
//     setActiveTags((prev) => {
//       const sectionTags = prev[localMacro]?.[section] || [];
//       const updatedSectionTags = sectionTags.includes(tag)
//         ? sectionTags.filter((t) => t !== tag)
//         : [...sectionTags, tag];

//       return {
//         ...prev,
//         [localMacro]: {
//           ...prev[localMacro],
//           [section]: updatedSectionTags,
//         },
//       };
//     });
//   };

//   const handleResetFilters = () => {
//     setLocalMacro(null);
//     setTags([]);
//     setMacro(null);
//     setActiveFiltersCount(0);
//     onClose();
//   };

//   const handleApply = () => {
//     const macroToUse = localMacro || macro; // fallback to existing macro
//     const selectedTags = activeTags[macroToUse] || {};
//     const allSelected = Object.values(selectedTags).flat();

//     setMacro(macroToUse);
//     setTags(allSelected);
//     setActiveFiltersCount(allSelected.length + (macroToUse ? 1 : 0));

//     if (onApplyFilters) {
//       onApplyFilters(macroToUse, allSelected);
//     }

//     onClose();
//   };

//   const selectedMacroFilters = localMacro ? filterOptions[localMacro] : null;
//   const hasFiltersSelected = selectedMacroFilters && Object.values(activeTags[localMacro] || {}).flat().length > 0;

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
//             <button className="sheet-close-icon" onClick={onClose}>
//               <IoClose size={24} />
//             </button>

//             <div className="points-scrollable-content">
//               {selectedMacroFilters &&
//                 Object.entries(selectedMacroFilters).map(([sectionName, tags]) => (
//                   <div key={sectionName} className="filter-section">
//                     <h4 className="section-title">{sectionName}</h4>
//                     <div className="checkbox-list">
//                       {tags.map((tag) => (
//                         <label key={tag} className="checkbox-option">
//                           <input
//                             type="checkbox"
//                             checked={
//                               activeTags[localMacro]?.[sectionName]?.includes(tag) || false
//                             }
//                             onChange={() => handleTagToggle(sectionName, tag)}
//                           />
//                           {tag}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <div className="bottom-actions sticky-actions" style={{ marginBottom: '80px' }}>
//               {(localMacro || hasFiltersSelected) && (
//                 <button className="reset-btn" onClick={handleResetFilters}>
//                   Clear all
//                 </button>
//               )}
//               <button className="apply-btn" onClick={handleApply}>
//                 Show results
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './PointsBottomSheet.css';
// import { IoClose } from 'react-icons/io5';

// export const filterOptions = {
//   'Food & Drink': {
//     Category: ['Cafe', 'Restaurant', 'Street Food', 'Lounge Bar'],
//     Type: ['Ice Cream Shop', 'Pizzeria', 'Casual Dinning', 'Pub', 'Shushi', 'Sandwich'],
//     Cuisine: ['Italian', 'Asian', 'Indian', 'American'],
//     Price: ['$', '$$', '$$$'],
//     Tags: ['Popular', 'New', 'Family Friendly', 'Romantic'],
//   },
//   Shopping: {
//     Category: ['Boutique', 'Mall', 'Souvenir Shop'],
//     Type: ['Clothing', 'Electronics', 'Jewelry'],
//     Price: ['$', '$$', '$$$'],
//     Tags: ['Local', 'Luxury', 'Discounted'],
//   },
//   'Culture & Sights': {
//     Category: ['Museum', 'Theatre', 'Gallery', 'Historic Site'],
//     Tags: ['Historical', 'Architecture', 'UNESCO'],
//     Genre: ['Art', 'History', 'Religious', 'Performing Arts', 'Classic Cinema', 'Modern Architecture'],
//     Price: ['$', '$$', '$$$'],
//   },
//   Nightlife: {
//     Category: ['Bar', 'Club', 'Live Music'],
//     Type: ['Pub', 'Lounge'],
//     Tags: ['Dance Floor', 'Happy Hour', 'Cocktails'],
//     Price: ['$', '$$', '$$$'],
//   },
//   'Activity & Wellness': {
//     Category: ['Gym', 'Yoga', 'Spa', 'Hiking'],
//     Type: ['Indoor', 'Outdoor', 'Group Class'],
//     Tags: ['Relaxation', 'Fitness', 'Mindfulness'],
//     Price: ['$', '$$', '$$$'],
//   },
// };

// export default function PointsBottomSheet({
//   show,
//   onClose,
//   setActiveFiltersCount,
//   setMacro,
//   setTags,
//   macro,
//   onApplyFilters,
//   onClearFilters,
//   allPoints = [],
// }) {
//   const [dragY, setDragY] = useState(0);
//   const [localMacro, setLocalMacro] = useState(null);
//   const [activeTags, setActiveTags] = useState({});
//   const [matchCount, setMatchCount] = useState(0);

//   useEffect(() => {
//     if (macro) {
//       setLocalMacro(macro);
//       if (!activeTags[macro]) {
//         setActiveTags((prev) => ({ ...prev, [macro]: {} }));
//       }
//     }
//   }, [macro]);

//   useEffect(() => {
//     const macroToUse = localMacro || macro;
//     const selectedTags = activeTags[macroToUse] || {};
//     const allSelected = Object.values(selectedTags).flat().map((tag) => tag.toLowerCase());

//     const matches = allPoints.filter((p) => {
//       const macroMatch =
//         !macroToUse || p.macro?.toLowerCase().trim() === macroToUse.toLowerCase().trim();

//       const combinedTags = [
//         ...(p.tags || []),
//         p.category,
//         p.type,
//         p.cuisine,
//         p.price,
//         ...(Array.isArray(p.genre) ? p.genre : [p.genre]),
//       ]
//         .filter(Boolean)
//         .map((t) => t.toLowerCase());

//       const tagMatch =
//         allSelected.length === 0 ||
//         allSelected.some((tag) => combinedTags.includes(tag.toLowerCase()));

//       return macroMatch && tagMatch;
//     });

//     setMatchCount(matches.length);
//   }, [activeTags, localMacro, macro, allPoints]);

//   const handleDragEnd = (_, info) => {
//     if (info.offset.y > 100) {
//       onClose();
//     } else {
//       setDragY(0);
//     }
//   };

//   const handleTagToggle = (section, tag) => {
//     setActiveTags((prev) => {
//       const sectionTags = prev[localMacro]?.[section] || [];
//       const updatedSectionTags = sectionTags.includes(tag)
//         ? sectionTags.filter((t) => t !== tag)
//         : [...sectionTags, tag];

//       return {
//         ...prev,
//         [localMacro]: {
//           ...prev[localMacro],
//           [section]: updatedSectionTags,
//         },
//       };
//     });
//   };

//   const handleResetFilters = () => {
//     setLocalMacro(null);
//     setTags([]);
//     setMacro(null);
//     setActiveFiltersCount(0);
//     setMatchCount(0);
//     if (onClearFilters) onClearFilters();
//     onClose();
//   };

//   const handleApply = () => {
//     const macroToUse = localMacro || macro;
//     const selectedTags = activeTags[macroToUse] || {};
//     const allSelected = Object.values(selectedTags).flat();

//     setMacro(macroToUse);
//     setTags(allSelected);
//     setActiveFiltersCount(allSelected.length + (macroToUse ? 1 : 0));

//     if (onApplyFilters) {
//       onApplyFilters(macroToUse, allSelected);
//     }

//     onClose();
//   };

//   const selectedMacroFilters = localMacro ? filterOptions[localMacro] : null;

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
//             <button className="sheet-close-icon" onClick={onClose}>
//               <IoClose size={24} />
//             </button>

//             <div className="points-scrollable-content">
//               {selectedMacroFilters && (
//                 <>
//                   <h3 className="macro-title">{localMacro}</h3>
//                   {Object.entries(selectedMacroFilters).map(([section, tags]) => (
//                     <div key={section} className="filter-section">
//                       <h4>{section}</h4>
//                       <div className="checkbox-list">
//                         {tags.map((tag) => (
//                           <label key={tag} className="checkbox-option">
//                             <input
//                               type="checkbox"
//                               checked={
//                                 activeTags[localMacro]?.[section]?.includes(tag) || false
//                               }
//                               onChange={() => handleTagToggle(section, tag)}
//                             />
//                             {tag}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>

//             <div className="bottom-actions sticky-actions" style={{ marginBottom: '100px' }}>
//               {(localMacro || Object.values(activeTags[localMacro] || {}).flat().length > 0) && (
//                 <button className="reset-btn" onClick={handleResetFilters}>
//                   Clear all
//                 </button>
//               )}
//               <button className="apply-btn" onClick={handleApply}>
//                 Show results ({matchCount})
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PointsBottomSheet.css';
import { IoClose } from 'react-icons/io5';

export const filterOptions = {
  'Food & Drink': {
    Category: ['Cafe', 'Restaurant', 'Street Food', 'Lounge Bar'],
    Type: ['Ice Cream Shop', 'Pizzeria', 'Casual Dinning', 'Pub', 'Shushi', 'Sandwich'],
    Cuisine: ['Italian', 'Asian', 'Indian', 'American'],
    Price: ['$', '$$', '$$$'],
    Tags: ['Popular', 'New', 'Family Friendly', 'Romantic'],
  },
  'Shopping': {
    Category: ['Boutique', 'Mall', 'Souvenir Shop'],
    Type: ['Clothing', 'Electronics', 'Jewelry'],
    Price: ['$', '$$', '$$$'],
    Tags: ['Local', 'Luxury', 'Discounted'],
  },
  'Culture & Sights': {
    Category: ['Museum', 'Theatre', 'Gallery', 'Historic Site'],
    Tags: ['Historical', 'Architecture', 'UNESCO'],
    Genre: ['Art', 'History', 'Religious', 'Performing Arts', 'Classic Cinema', 'Modern Architecture'],
    Price: ['$', '$$', '$$$'],
  },
  'Nightlife': {
    Category: ['Bar', 'Club', 'Live Music'],
    Type: ['Pub', 'Lounge'],
    Tags: ['Dance Floor', 'Happy Hour', 'Cocktails'],
    Price: ['$', '$$', '$$$'],
  },
  'Activity & Wellness': {
    Category: ['Gym', 'Yoga', 'Spa', 'Hiking'],
    Type: ['Indoor', 'Outdoor', 'Group Class'],
    Tags: ['Relaxation', 'Fitness', 'Mindfulness'],
    Price: ['$', '$$', '$$$'],
  },
};

export default function PointsBottomSheet({
  show,
  onClose,
  setActiveFiltersCount,
  setMacro,
  setTags,
  macro,
  onApplyFilters,
  onClearFilters,
  allPoints = [],
}) {
  const [dragY, setDragY] = useState(0);
  const [localMacro, setLocalMacro] = useState(null);
  const [activeTags, setActiveTags] = useState({});
  const [filteredCount, setFilteredCount] = useState(0);


  

  useEffect(() => {
    if (macro) {
      setLocalMacro(macro);
      if (!activeTags[macro]) {
        setActiveTags((prev) => ({ ...prev, [macro]: {} }));
      }
    }
  }, [macro]);

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  const handleMacroSelect = (macroKey) => {
    setLocalMacro(macroKey);
    if (!activeTags[macroKey]) {
      setActiveTags((prev) => ({ ...prev, [macroKey]: {} }));
    }
  };

  const handleTagToggle = (section, tag) => {
    setActiveTags((prev) => {
      const sectionTags = prev[localMacro]?.[section] || [];
      const updatedSectionTags = sectionTags.includes(tag)
        ? sectionTags.filter((t) => t !== tag)
        : [...sectionTags, tag];

      return {
        ...prev,
        [localMacro]: {
          ...prev[localMacro],
          [section]: updatedSectionTags,
        },
      };
    });
  };

  useEffect(() => {
    if (!localMacro || !filterOptions[localMacro]) {
      setFilteredCount(0);
      return;
    }
  
    const selectedTags = activeTags[localMacro] || {};
    const flattenedSelectedTags = Object.entries(selectedTags).reduce((acc, [section, tags]) => {
      acc[section] = tags;
      return acc;
    }, {});
  
    const filtered = allPoints.filter((point) => {
      if (point.macro !== localMacro) return false;
  
      // Check each selected filter section
      for (const section in flattenedSelectedTags) {
        const selectedValues = flattenedSelectedTags[section];
        if (selectedValues.length === 0) continue;
  
        // Check if point has matching tags
        const pointValue = point[section.toLowerCase()]; // e.g. point.category
        if (!selectedValues.includes(pointValue)) {
          return false;
        }
      }
  
      return true;
    });
  
    setFilteredCount(filtered.length);
  }, [activeTags, localMacro, allPoints]);
  

  const handleResetFilters = () => {
    setLocalMacro(null);
    setTags([]);
    setMacro(null);
    setActiveFiltersCount(0);

    if (onClearFilters) {
      onClearFilters();
    }

    onClose();
  };

  const handleApply = () => {
    const macroToUse = localMacro || macro;
    const selectedTags = activeTags[macroToUse] || {};
    const allSelected = Object.values(selectedTags).flat();

    setMacro(macroToUse);
    setTags(allSelected);
    setActiveFiltersCount(allSelected.length + (macroToUse ? 1 : 0));

    if (onApplyFilters) {
      onApplyFilters(macroToUse, allSelected);
    }

    onClose();
  };

  const selectedMacroFilters = localMacro ? filterOptions[localMacro] : null;
  const hasFiltersSelected =
    selectedMacroFilters &&
    Object.values(activeTags[localMacro] || {}).flat().length > 0;

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
            <button className="sheet-close-icon" onClick={onClose}>
              <IoClose size={24} />
            </button>

            <div className="points-scrollable-content">
              {selectedMacroFilters?.Category && (
                <>
                  <h3 className="macro-title">{localMacro}</h3>

                  <div className="filter-section">
                    <div className="checkbox-list">
                      {selectedMacroFilters.Category.map((tag) => (
                        <label key={tag} className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={
                              activeTags[localMacro]?.['Category']?.includes(tag) || false
                            }
                            onChange={() => handleTagToggle('Category', tag)}
                          />
                          {tag}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="bottom-actions sticky-actions" style={{ marginBottom: '100px' }}>
              {(localMacro || hasFiltersSelected) && (
                <button className="reset-btn" onClick={handleResetFilters}>
                  Clear all
                </button>
              )}
              {/* <button className="apply-btn" onClick={handleApply}>
                Show results
              </button> */}
              <button className="apply-btn" onClick={handleApply}>
  {filteredCount > 0 ? `Show results (${filteredCount})` : 'Show results'}
</button>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
