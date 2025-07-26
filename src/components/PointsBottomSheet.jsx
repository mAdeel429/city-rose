import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PointsBottomSheet.css';
import { IoClose } from 'react-icons/io5';
import { GiKnifeFork, GiMusicalNotes, GiPathDistance } from 'react-icons/gi';

const macroOptions = {
  Food: { title: "Food", icon: <GiKnifeFork /> },
  Nightlife: { title: "Nightlife", icon: <GiMusicalNotes /> },
  Tours: { title: "Tours", icon: <GiPathDistance /> },
};

const sectionData = {
  Food: ["Indian", "Chinese", "Vegan", "Macrobiotic"],
  Nightlife: ["Clubs", "Bars", "Live Music", "Lounge"],
  Tours: ["City Tour", "Historical", "Boat Ride", "Adventure"],
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
  const [expandedSections, setExpandedSections] = useState({});

  const hasActiveFilters = !!localMacro || activeTags.length > 0;

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  const handleTagToggle = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleResetFilters = () => {
    setLocalMacro(null);
    setActiveTags([]);
    setMacro(null);
    setTags([]);
    setActiveFiltersCount(0);
    onClose();
  };

  const handleApply = () => {
    setMacro(localMacro);
    setTags(activeTags);
    const count = [localMacro, ...activeTags].filter(Boolean).length;
    setActiveFiltersCount(count);
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
            <button className="sheet-close-icon" onClick={onClose}>
              <IoClose size={24} />
            </button>

            {/* Scrollable Content */}
            <div className="points-scrollable-content">
              <div className="macro-section">
                <p className="macro-title">Filter by Category</p>
                <div className="macro-options">
                  {Object.keys(macroOptions).map((macro) => (
                    <div
                      key={macro}
                      className={`macro-btn ${localMacro === macro ? 'selected' : ''}`}
                      onClick={() => setLocalMacro(macro)}
                    >
                      {macroOptions[macro].icon}
                      <span>{macroOptions[macro].title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="accessibility-section">
                {Object.entries(sectionData).map(([section, tags]) => (
                  <div className="filter-section" key={section}>
                    <div className="section-header" onClick={() => toggleSection(section)}>
                      <h4>{section}</h4>
                      <span style={{ fontSize: '20px' }}>
                        {expandedSections[section] ? '−' : '+'}
                      </span>
                    </div>
                    {expandedSections[section] && (
                      <div className="checkbox-list">
                        {tags.map((item) => (
                          <label key={item} className="checkbox-option">
                            <input
                              type="checkbox"
                              checked={activeTags.includes(item)}
                              onChange={() => handleTagToggle(item)}
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Buttons */}
            <div className="bottom-actions sticky-actions" style={{marginBottom: '80px'}}>
              {hasActiveFilters && (
                <button className="reset-btn" onClick={handleResetFilters}>
                  Clear all
                </button>
              )}
              <button className="apply-btn" onClick={handleApply}>
                Show results
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
