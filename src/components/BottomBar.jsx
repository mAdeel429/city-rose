import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTag, FaHeart, FaUser } from 'react-icons/fa';
import styles from './PointList.module.css';
import CenterIcon from '../assets/CityRose Logo Condiviso (2).png';
import NearMeIcon from '../assets/bottom bar.png';

const BottomBar = ({ visible = true }) => {
  const location = useLocation();

  const getOpacity = (path) => (location.pathname === path ? 1 : 0.4);

  return (
    <div
      className={styles.bottomTabs}
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <Link to="/near-me" className={styles.tabItem}>
        <img
          src={NearMeIcon}
          alt="Near Me Icon"
          className={styles.tabIcon}
          style={{
            height: '30px',
            width: '30px',
            opacity: getOpacity('/near-me'),
            filter: 'var(--icon-filter)',
          }}
        />
      </Link>
      <Link to="/offers" className={styles.tabItem}>
        <FaTag
          style={{
            transform: 'rotate(90deg)',
            color: 'var(--icon-color)',
            opacity: getOpacity('/offers'),
            fontSize: '26px'
          }}
        />
      </Link>
      <Link to="/home" className={styles.tabItem}>
        <img
          src={CenterIcon}
          alt="Center Icon"
          className={styles.centerIcon}
          style={{
            opacity: getOpacity('/home'),
            filter: 'var(--icon-filter)',
            height: '38px',
            width: '38px'
          }}
        />
      </Link>
      <Link to="/add-to-favorite" className={styles.tabItem}>
        <FaHeart
          style={{
            color: 'var(--icon-color)',
            opacity: getOpacity('/add-to-favorite'),
          }}
        />
      </Link>
      <Link to="/editProfile" className={styles.tabItem}>
        <FaUser
          style={{
            color: 'var(--icon-color)',
            opacity: getOpacity('/editProfile'),
          }}
        />
      </Link>
    </div>
  );
};

export default BottomBar;


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaTag, FaHeart, FaUser } from 'react-icons/fa';
// import styles from './PointList.module.css';
// import CenterIcon from '../assets/CityRose Logo Condiviso (2).png';

// const BottomBar = ({ visible = true }) => {
//   const location = useLocation();
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div
//       className={styles.bottomTabs}
//       style={{ display: visible ? 'flex' : 'none' }}
//     >
//       <Link to="/near-me" className={`${styles.tabItem} ${isActive('/near-me') ? styles.active : ''}`}>
//         <img
//           src="https://static.thenounproject.com/png/2204581-200.png"
//           alt="Near Me Icon"
//           className={styles.tabIcon}
//           style={{ opacity: isActive('/near-me') ? 1 : 0.5, height: '30px', width: '30px', }}
//         />
//         <span className={styles.tabLabel}>Around You</span>
//       </Link>

//       <Link to="/offers" className={`${styles.tabItem} ${isActive('/offers') ? styles.active : ''}`}>
//         <FaTag className={styles.tabIcon} style={{ transform: 'rotate(90deg)', opacity: isActive('/offers') ? 1 : 0.5 }} />
//         <span className={styles.tabLabel}>Offers</span>
//       </Link>

//       <Link to="/home" className={`${styles.tabItem} ${styles.centerTab} ${isActive('/home') ? styles.active : ''}`}>
//         <div className={styles.centerButton}>
//           <img
//             src={CenterIcon}
//             alt="Center Icon"
//             className={styles.centerIcon}
//             style={{ opacity: isActive('/home') ? 1 : 0.6 }}
//           />
//         </div>
//         <span className={styles.tabLabel}>Home</span>
//       </Link>

//       <Link to="/add-to-favorite" className={`${styles.tabItem} ${isActive('/add-to-favorite') ? styles.active : ''}`}>
//         <FaHeart className={styles.tabIcon} style={{ opacity: isActive('/add-to-favorite') ? 1 : 0.5 }} />
//         <span className={styles.tabLabel}>Saved</span>
//       </Link>

//       <Link to="/editProfile" className={`${styles.tabItem} ${isActive('/editProfile') ? styles.active : ''}`}>
//         <FaUser className={styles.tabIcon} style={{ opacity: isActive('/editProfile') ? 1 : 0.5 }} />
//         <span className={styles.tabLabel}>Profile</span>
//       </Link>
//     </div>
//   );
// };

// export default BottomBar;
