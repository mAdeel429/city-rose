// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaUser , FaChartBar, FaCog, FaSignOutAlt} from 'react-icons/fa';
// import './PointList.css';
// import {Link} from 'react-router-dom'

// export default function BottomSheet({ show, onClose }) {
//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           className="bottom-sheet-backdrop"
//           onClick={onClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bottom-sheet"
//             onClick={(e) => e.stopPropagation()}
//             initial={{ y: '100%' }}
//             animate={{ y: 0 }}
//             exit={{ y: '100%' }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//           >
//             <div className="handle-bar" />

//             <div className="profile-section">
//               <div className="profile-icon">P</div>
//               <div className="profile-name">Paolo</div>
//             </div>

//             <div className="sheet-options">
//             <Link to='/editProfile' style={{textDecoration: 'none'}}>
//               <div className="option">
//                 <FaUser className="option-icon" />
//                 <span>Edit Profile</span>                
//               </div>
//               </Link>
//               <div className="option">
//                 <FaChartBar className="option-icon" />
//                 <span>Insights</span>
//               </div>
//               <div className="option">
//                 <FaCog className="option-icon" />
//                 <span>Settings</span>
//               </div>
//               <hr className="divider" />
//               <div className="option logout">
//                 <FaSignOutAlt className="option-icon" />
//                 <span>Logout</span>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './PointList.css';
import { Link } from 'react-router-dom';

export default function BottomSheet({ show, onClose }) {
  const [dragY, setDragY] = useState(0);

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      onClose(); // Dragged down enough to close
    } else {
      setDragY(0); // Snap back
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

            <div className="profile-section">
              <div className="profile-icon">P</div>
              <div className="profile-name">Paolo</div>
            </div>

            <div className="sheet-options">
              <Link to='/editProfile' style={{ textDecoration: 'none' }}>
                <div className="option">
                  <FaUser className="option-icon" />
                  <span>Edit Profile</span>
                </div>
              </Link>
              <Link to='/insights' style={{ textDecoration: 'none' }}>
              <div className="option">
                <FaChartBar className="option-icon" />
                <span>Insights</span>
              </div>
              </Link>
              <Link to='/settings' style={{ textDecoration: 'none' }}>
              <div className="option">
                <FaCog className="option-icon" />
                <span>Settings</span>
              </div>
              </Link>
              <hr className="divider" />
              <div className="option logout">
                <FaSignOutAlt className="option-icon" />
                <span>Logout</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
