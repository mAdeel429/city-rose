import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Offers.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FaHeart } from 'react-icons/fa';

export default function Offers() {
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [selectedType, setSelectedType] = useState('Offers');

    const types = ['Articles', 'Offers'];

    const toggleBottomSheet = () => {
        setShowBottomSheet(!showBottomSheet);
    };

    const handleClose = () => {
        setShowBottomSheet(false);
    };

    const handleSelectType = (type) => {
        setSelectedType(type);
        handleClose();
    };

    const handleDragEnd = (event, info) => {
        if (info.offset.y > 100) {
            handleClose();
        }
    };

    const renderContent = () => {
        if (selectedType === 'Offers') {
            return (
                <motion.div
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }} // allow pull only down
                    dragElastic={0.3} // elasticity
                    whileTap={{ scale: 0.98 }} // optional: slight scale on tap
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                        position: 'relative',
                        textAlign: 'center',
                        // padding: '16px',
                        background: '#fff',
                        borderRadius: '12px',
                        margin: '10px',
                    }}
                >
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly1SlyJilx_6cUbIusa6ggJQa9ykMp_3sFgD42JGi9SENuHw0N3kaXIjh319zQ0KbIY8&usqp=CAU"
                        alt="Free Extra Scoop Offer"
                        style={{ maxWidth: '100%', width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            marginRight: '10px',
                            color: 'white',
                            textAlign: 'left',
                            padding: '8px',
                            borderRadius: '8px',
                        }}
                    >
                        <p style={{ fontSize: '16px', margin: '0', fontWeight: 400 }}>
                            <span style={{ fontSize: '17px', fontWeight: 600 }}>Free Extra Scoop on Your Cone!</span><br />
                            One cone, two scoops—on us! Get a free extra scoop with your gelato cone.
                        </p>
                    </div>
                    <div className="cds-heart-icon"
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            backgroundColor: '#fff',
                            color: 'red',
                            padding: '6px',
                            borderRadius: '50%',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <FaHeart className="cds-heart-filled" style={{ fontSize: '16px' }} />
                    </div>
                </motion.div>
            );
        } else {
            return (
                <div style={{ textAlign: 'center', padding: '16px' }}>
                    <h2>No articles</h2>
                    <p>No article has been written for the chosen city.</p>
                </div>
            );
        }
    };
    
    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
            }}>
                <h1 style={{ margin: 0, fontSize: '20px' }}>{selectedType}</h1>
                <div
                    onClick={toggleBottomSheet}
                    style={{ fontSize: '24px', cursor: 'pointer' }}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>

            {renderContent()}

            <AnimatePresence>
                {showBottomSheet && (
                    <motion.div
                        className="offers-bottom-sheet-backdrop"
                        onClick={handleClose}
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
                            onDragEnd={handleDragEnd}
                            dragElastic={0.2}
                        >
                            <div className="offers-handle-bar" />
                            <div className="offers-filter-options">
                                {types.map((type) => (
                                    <div
                                        key={type}
                                        className={`offers-radio-option ${selectedType === type ? 'offers-active' : ''}`}
                                        onClick={() => handleSelectType(type)}
                                    >
                                        <div className="offers-radio-circle" />
                                        {type}
                                    </div>
                                ))}
                                <button className="offers-bottom-sheet-close-btn" onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
