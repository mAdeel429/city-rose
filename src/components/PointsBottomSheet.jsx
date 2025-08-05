import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PointsBottomSheet.css';
import { IoClose } from 'react-icons/io5';
import {
  Utensils,
  ShoppingBag,
  Landmark,
  Martini,
  Flower
} from 'lucide-react';


export const filterOptions = {
  'Food & Drink': {
    Category: ['Cafe', 'Restaurant', 'Street Food', 'Lounge Bar'],
    Type: ['Ice Cream Shop', 'Pizzeria', 'Casual Dinning', 'Pub', 'Shushi', 'Sandwich'],
    Cuisine: ['Italian', 'Asian', 'Indian', 'American'],
    Price: ['$', '$$', '$$$'],
    Tags: ['Popular', 'New', 'Family Friendly', 'Romantic'],
  },
  Shopping: {
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
  Nightlife: {
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

// const macroIcons = {
//   'Food & Drink': <FaUtensils size={18} />,
//   Shopping: <FaShoppingBag size={18} />,
//   'Culture & Sights': <FaLandmark size={18} />,
//   Nightlife: <FaGlassCheers size={18} />,
//   'Activity & Wellness': <FaSpa size={18} />,
// };

const macroIcons = {
  'Food & Drink': <Utensils size={18} />,
  Shopping: <ShoppingBag size={18} />,
  'Culture & Sights': <Landmark size={18} />,
  Nightlife: <Martini  size={18} />,
  'Activity & Wellness': <Flower size={18} />,
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

      for (const section in flattenedSelectedTags) {
        const selectedValues = flattenedSelectedTags[section];
        if (selectedValues.length === 0) continue;

        const pointValue = point[section.toLowerCase()];
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
    if (onClearFilters) onClearFilters();
    onClose();
  };

  const handleApply = () => {
    const macroToUse = localMacro || macro;
    const selectedTags = activeTags[macroToUse] || {};
    const allSelected = Object.values(selectedTags).flat();

    setMacro(macroToUse);
    setTags(allSelected);
    setActiveFiltersCount(allSelected.length + (macroToUse ? 1 : 0));
    if (onApplyFilters) onApplyFilters(macroToUse, allSelected);
    onClose();
  };

  const selectedMacroFilters = localMacro ? filterOptions[localMacro] : null;

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
            {localMacro && (
              <div className="sticky-header macro-heading">
                <span className="macro-icon">{macroIcons[localMacro]}</span>
                <span className="macro-title-text">{localMacro}</span>
              </div>
            )}


            <div className="points-scrollable-content">
              <div className="macro-bubble-wrapper">
                {Object.keys(filterOptions).map((macroKey) => (
                  <button
                    key={macroKey}
                    className={`macro-bubble ${localMacro === macroKey ? 'selected' : ''}`}
                    onClick={() => handleMacroSelect(macroKey)}
                  >
                    <span className="macro-bubble-icon">{macroIcons[macroKey]}</span>
                    <span>{macroKey}</span>
                  </button>
                ))}
              </div>

              {localMacro && (
                <>
                  {Object.entries(selectedMacroFilters).map(([section, tags]) => (
                    <div key={section} className="filter-section">
                      <h4 className="section-title">{section}</h4>
                      <div className="checkbox-list">
                        {tags.map((tag) => (
                          <label
                            key={tag}
                            className={`checkbox-option pill-only ${activeTags[localMacro]?.[section]?.includes(tag) ? 'selected' : ''
                              }`}
                            onClick={() => handleTagToggle(section, tag)}
                          >
                            {tag}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="bottom-actions sticky-actions" style={{ marginBottom: '100px' }}>
              {(localMacro || Object.values(activeTags[localMacro] || {}).flat().length > 0) && (
                <button className="reset-btn" onClick={handleResetFilters}>
                  Clear all
                </button>
              )}
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
