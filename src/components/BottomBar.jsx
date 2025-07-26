// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaTag, FaHeart, FaUser } from 'react-icons/fa'; // 👈 Add FaUser
// import styles from './PointList.module.css';
// import CenterIcon from '../assets/new.png';
// import NearMeIcon from '../assets/icon 1.png';

// const BottomBar = ({ visible = true }) => {
//   const location = useLocation();

//   if (!visible) {
//     console.log('BottomBar hidden');
//     return null;
//   }
  
//   return (
//     <div className={styles.bottomTabs}
//     style={{
//       display: visible ? 'flex' : 'none',
//       position: 'fixed',
//       bottom: 0,
//       width: '100%',
//       zIndex: 1000,
//       background: 'white',
//       transition: 'all 0.3s ease-in-out',
//     }}>
//       {/* 1. Near Me */}
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

//       {/* 2. Offers */}
//       <Link to="/offers" className={styles.tabItem}>
//         <FaTag
//           style={{
//             transform: 'rotate(90deg)',
//             color: 'black',
//             opacity: location.pathname === '/offers' ? 1 : 0.4,
//           }}
//         />
//       </Link>

//       {/* 3. Home Page - FIXED */}
//       <Link to="/home" className={styles.tabItem}>
//         <img
//           src={CenterIcon}
//           alt="Center Icon"
//           className={styles.centerIcon}
//           style={{
//             opacity: location.pathname === '/home' ? 1 : 0.4,
//           }}
//         />
//       </Link>

//       {/* 4. Favorite */}
//       <Link to="/add-to-favorite" className={styles.tabItem}>
//         <FaHeart
//           style={{
//             color: 'black',
//             opacity: location.pathname === '/add-to-favorite' ? 1 : 0.4,
//           }}
//         />
//       </Link>

//       {/* 5. Profile Tab */}
//       <Link to="/editProfile" className={styles.tabItem}>
//         <FaUser
//           style={{
//             color: 'black',
//             opacity: location.pathname === '/editProfile' ? 1 : 0.4,
//           }}
//         />
//       </Link>
//     </div>
//   );
// };

// export default BottomBar;



import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTag, FaHeart, FaUser } from 'react-icons/fa';
import styles from './PointList.module.css';
import CenterIcon from '../assets/new.png';
import NearMeIcon from '../assets/icon 1.png';

const BottomBar = ({ visible = true }) => {
  const location = useLocation();

  // if (!visible) {
  //   console.log('BottomBar hidden');
  // }

  return (
    <div
      className={`${styles.bottomTabs} ${!visible ? styles.hidden : ''}`}
    >
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

      {/* 3. Home Page */}
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
