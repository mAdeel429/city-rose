import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FilterBottomSheet.css';

export default function FilterBottomSheet({ show, onClose, types, selectedType, setSelectedType }) {
    const [dragY, setDragY] = useState(0);

    const handleDragEnd = (event, info) => {
        if (info.offset.y > 100) {
            onClose();
        } else {
            setDragY(0);
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="bottom-sheet-backdrop"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bottom-sheet"
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
                        <div className="handle-bar" />
                        <div className="filter-options">
                            {types.map((type) => (
                                <div
                                    key={type}
                                    className={`radio-option ${selectedType === type ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedType(type);
                                        onClose();
                                    }}
                                >
                                    <div className="radio-circle" />
                                    {type}
                                </div>
                            ))}

                            <button className="bottom-sheet-close-btn" onClick={onClose}>
                                Close
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}