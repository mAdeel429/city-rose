// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaTag, FaHeart, FaUser } from 'react-icons/fa';
// import styles from './PointList.module.css';
// import CenterIcon from '../assets/new.png';
// import NearMeIcon from '../assets/icon 1.png';

// const BottomBar = ({ visible = true }) => {
//   const location = useLocation();
//   return (
//     <div
//       className={`${styles.bottomTabs} ${!visible ? styles.hidden : ''}`}
//     >
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
//       <Link to="/add-to-favorite" className={styles.tabItem}>
//         <FaHeart
//           style={{
//             color: 'black',
//             opacity: location.pathname === '/add-to-favorite' ? 1 : 0.4,
//           }}
//         />
//       </Link>
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
import CenterIcon from '../assets/CityRose Logo Condiviso (2).png';
import NearMeIcon from '../assets/icon 1.png';

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
            width: '22px',
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
            // height: '40px'
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
