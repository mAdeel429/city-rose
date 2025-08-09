// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaUser, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import styles from './PointList.module.css';
// import { Link } from 'react-router-dom';

// export default function BottomSheet({ show, onClose }) {
//   const [dragY, setDragY] = useState(0);
//   const [name, setName] = useState('');
//   const [initial, setInitial] = useState('U');

//   useEffect(() => {
//     const userData = localStorage.getItem('user_info');
//     if (userData) {
//       const user = JSON.parse(userData);
//       const userName = user.name || '';
//       setName(userName);

//       // First character of the first word in name
//       const firstChar = userName.trim().split(' ')[0]?.charAt(0)?.toUpperCase() || 'U';
//       setInitial(firstChar);
//     }
//   }, []);

//   const handleDragEnd = (event, info) => {
//     if (info.offset.y > 100) {
//       onClose();
//     } else {
//       setDragY(0);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = '/auth';
//   };
  

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           className={styles.bottomSheetBackdrop}
//           onClick={onClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//           className={styles.bottomSheet}
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
//             <div className={styles.handleBar}/>
//             <div className={styles.profileSection}>
//               <div className={styles.profileIcon}>{initial}</div>
//               <div className={styles.profileName}>{name}</div>
//             </div>

//             <div className={styles.sheetOptions}>
//               <Link to='/editProfile' style={{ textDecoration: 'none' }}>
//                 <div className={styles.option}>
//                   <FaUser className={styles.optionIcon}/>
//                   <span>Edit Profile</span>
//                 </div>
//               </Link>
//               <Link to='/insights' style={{ textDecoration: 'none' }}>
//               <div className={styles.option}>
//                 <FaChartBar className={styles.optionIcon}/>
//                 <span>Insights</span>
//               </div>
//               </Link>
//               <Link to='/settings' style={{ textDecoration: 'none' }}>
//               <div  className={styles.option}>
//                 <FaCog className={styles.optionIcon}/>
//                 <span>Settings</span>
//               </div>
//               </Link>
//               <hr className={styles.divider}/>
//               <div className={`${styles.option} ${styles.logout}`} onClick={handleLogout }>
//                 <FaSignOutAlt className={styles.optionIcon}/>
//                 <span>Logout</span>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './PointList.module.css';
import { Link } from 'react-router-dom';

export default function BottomSheet({ show, onClose }) {
  const [dragY, setDragY] = useState(0);
  const [name, setName] = useState('');
  const [initial, setInitial] = useState('U');
  const [hasInsightsAccess, setHasInsightsAccess] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user_info');
    if (userData) {
      const user = JSON.parse(userData);
      const userName = user.name || '';
      setName(userName);

      const firstChar =
        userName.trim().split(' ')[0]?.charAt(0)?.toUpperCase() || 'U';
      setInitial(firstChar);

      if (Array.isArray(user.point_ids) && user.point_ids.length > 0) {
        setHasInsightsAccess(true);
      }
    }
  }, []);

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/auth';
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
            <div className={styles.handleBar} />
            <div className={styles.profileSection}>
              <div className={styles.profileIcon}>{initial}</div>
              <div className={styles.profileName}>{name}</div>
            </div>

            <div className={styles.sheetOptions}>
              <Link to="/editProfile" style={{ textDecoration: 'none' }}>
                <div className={styles.option}>
                  <FaUser className={styles.optionIcon} />
                  <span>Edit Profile</span>
                </div>
              </Link>

              {/* ✅ Show Insights only if access is granted */}
              {hasInsightsAccess && (
                <Link to="/insights" style={{ textDecoration: 'none' }}>
                  <div className={styles.option}>
                    <FaChartBar className={styles.optionIcon} />
                    <span>Insights</span>
                  </div>
                </Link>
              )}

              <Link to="/settings" style={{ textDecoration: 'none' }}>
                <div className={styles.option}>
                  <FaCog className={styles.optionIcon} />
                  <span>Settings</span>
                </div>
              </Link>

              <hr className={styles.divider} />

              <div
                className={`${styles.option} ${styles.logout}`}
                onClick={handleLogout}
              >
                <FaSignOutAlt className={styles.optionIcon} />
                <span>Logout</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
