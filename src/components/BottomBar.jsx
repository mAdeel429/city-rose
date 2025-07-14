import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaTag, FaPlay, FaHeart, FaUser } from 'react-icons/fa';
import './PointList.css';

const BottomBar = () => {
  return (
    <div className="bottom-tabs">
      <Link to="/home" className="tab-item">
        <FaMapMarkerAlt />
      </Link>
      <Link to="/explore" className="tab-item">
        <FaTag />
      </Link>
      <Link to="/favorites" className="tab-item" style={{ fontSize: '24px', color: 'black' }}>
  <FaPlay />
</Link>
      <Link to="/profile" className="tab-item">
        <FaUser />
      </Link>
      <Link to="/profile" className="tab-item">
        <FaHeart />
      </Link>
    </div>
  );
};

export default BottomBar;


// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaUserEdit, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import './PointList.css';

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
//               <div className="option">
//                 <FaUserEdit className="option-icon" />
//                 <span>Edit Profile</span>
//               </div>
//               <div className="option">
//                 <FaChartBar className="option-icon" />
//                 <span>Insights</span>
//               </div>
//               <div className="option">
//                 <FaCog className="option-icon" />
//                 <span>Settings</span>
//               </div>
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
