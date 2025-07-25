// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaTag, FaHeart } from 'react-icons/fa';
// import styles from './PointList.module.css';
// import CenterIcon from '../assets/new.png';
// import NearMeIcon from '../assets/icon 1.png';
// import folderMap from '../assets/folder map new.png';

// const BottomBar = () => {
//   const location = useLocation();

//   return (
//     <div className={styles.bottomTabs}>
//       <Link to="/near-me" className={styles.tabItem}>
//         <img
//           src={NearMeIcon}
//           alt="Near Me Icon"
//           className={styles.tabIcon}
//           style={{
//             height: '30px',
//             width: '22px',
//             opacity: location.pathname === '/near-me' ? 1 : 0.4,
//           }}
//         />
//       </Link>
//       <Link to="/offers" className={styles.tabItem}>
//         <FaTag
//           style={{
//             transform: 'rotate(90deg)',
//             color: 'black',
//             opacity: location.pathname === '/offers' ? 1 : 0.4,
//           }}
//         />
//       </Link>
//       <Link to="/" className={`${styles.tabItem} ${styles.centerTab}`}>
//         {location.pathname === '/' ? (
//           <img
//             src={CenterIcon}
//             alt="Center Icon Active"
//             className={styles.centerIcon}
//           />
//         ) : (
//           <img
//             src={CenterIcon}
//             alt="Center Icon Inactive"
//             className={styles.centerIcon}
//             style={{ opacity: 0.4 }}
//           />
//         )}

//       </Link>
//       <Link to="/around-you" className={styles.tabItem}>
//         <img
//           src={folderMap}
//           alt="Profile Icon"
//           className={styles.tabIcon}
//           style={{
//             height: '26px',
//             width: '26px',
//             opacity: location.pathname === '/around-you' ? 1 : 0.4,
//           }}
//         />
//       </Link>

//       <Link to="/add-to-favorite" className={styles.tabItem}>
//         <FaHeart
//           style={{
//             color: 'black',
//             opacity: location.pathname === '/add-to-favorite' ? 1 : 0.4,
//           }}
//         />

//       </Link>
//     </div>
//   );
// };

// export default BottomBar;



import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTag, FaHeart, FaUser } from 'react-icons/fa'; // 👈 Add FaUser
import styles from './PointList.module.css';
import CenterIcon from '../assets/new.png';
import NearMeIcon from '../assets/icon 1.png';

const BottomBar = () => {
  const location = useLocation();

  return (
    <div className={styles.bottomTabs}>
      {/* 1. Near Me */}
      <Link to="/near-me" className={styles.tabItem}>
        <img
          src={NearMeIcon}
          alt="Near Me Icon"
          className={styles.tabIcon}
          style={{
            height: '30px',
            width: '22px',
            opacity: location.pathname === '/near-me' ? 1 : 0.4,
          }}
        />
      </Link>

      {/* 2. Offers */}
      <Link to="/offers" className={styles.tabItem}>
        <FaTag
          style={{
            transform: 'rotate(90deg)',
            color: 'black',
            opacity: location.pathname === '/offers' ? 1 : 0.4,
          }}
        />
      </Link>

      {/* 3. Home Page - FIXED */}
      <Link to="/home" className={styles.tabItem}>
        <img
          src={CenterIcon}
          alt="Center Icon"
          className={styles.centerIcon}
          style={{
            opacity: location.pathname === '/home' ? 1 : 0.4,
          }}
        />
      </Link>

      {/* 4. Favorite */}
      <Link to="/add-to-favorite" className={styles.tabItem}>
        <FaHeart
          style={{
            color: 'black',
            opacity: location.pathname === '/add-to-favorite' ? 1 : 0.4,
          }}
        />
      </Link>

      {/* 5. Profile Tab */}
      <Link to="/editProfile" className={styles.tabItem}>
        <FaUser
          style={{
            color: 'black',
            opacity: location.pathname === '/editProfile' ? 1 : 0.4,
          }}
        />
      </Link>
    </div>
  );
};

export default BottomBar;
