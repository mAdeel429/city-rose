import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './PointList.module.css';
import { Link } from 'react-router-dom';

export default function BottomSheet({ show, onClose }) {
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
          className={styles.bottomSheetBackdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
          className={styles.bottomSheet}
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
            <div className={styles.handleBar}/>
            <div className={styles.profileSection}>
              <div className={styles.profileIcon}>P</div>
              <div className={styles.profileName}>Paolo</div>
            </div>

            <div className={styles.sheetOptions}>
              <Link to='/editProfile' style={{ textDecoration: 'none' }}>
                <div className={styles.option}>
                  <FaUser className={styles.optionIcon}/>
                  <span>Edit Profile</span>
                </div>
              </Link>
              <Link to='/insights' style={{ textDecoration: 'none' }}>
              <div className={styles.option}>
                <FaChartBar className={styles.optionIcon}/>
                <span>Insights</span>
              </div>
              </Link>
              <Link to='/settings' style={{ textDecoration: 'none' }}>
              <div  className={styles.option}>
                <FaCog className={styles.optionIcon}/>
                <span>Settings</span>
              </div>
              </Link>
              <hr className={styles.divider}/>
              <div className={`${styles.option} ${styles.logout}`}>
                <FaSignOutAlt className={styles.optionIcon}/>
                <span>Logout</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
