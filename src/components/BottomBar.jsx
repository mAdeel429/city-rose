// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaMapMarkerAlt, FaTag, FaPlay, FaHeart, FaUser } from 'react-icons/fa';
// import './PointList.css';

// const BottomBar = () => {
//   return (
//     <div className="bottom-tabs">
//       <Link to="/near-me" className="tab-item">
//         <FaMapMarkerAlt />
//       </Link>
//       <Link to="/explore" className="tab-item">
//         <FaTag />
//       </Link>
//       <Link to="/favorites" className="tab-item" style={{ fontSize: '24px', color: 'black' }}>
//   <FaPlay />
// </Link>
//       <Link to="/profile" className="tab-item">
//         <FaUser />
//       </Link>
//       <Link to="/profile" className="tab-item">
//         <FaHeart />
//       </Link>
//     </div>
//   );
// };

// export default BottomBar;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaTag, FaPlay, FaHeart, FaUser } from 'react-icons/fa';
import './PointList.css';

const BottomBar = () => {
  const location = useLocation(); // 👈 Get current route path

  return (
    <div className="bottom-tabs">
      <Link to="/near-me" className="tab-item">
        <FaMapMarkerAlt
          color={location.pathname === '/near-me' ? 'black' : '#9a98a3'}
        />
      </Link>
      <Link to="/explore" className="tab-item">
        <FaTag
          color={location.pathname === '/explore' ? 'black' : '#9a98a3'}
        />
      </Link>
      <Link to="/" className="tab-item">
        <FaPlay
          color={location.pathname === '/' ? 'black' : '#9a98a3'}
        />
      </Link>
      <Link to="/profile" className="tab-item">
        <FaUser
          color={location.pathname === '/profile' ? 'black' : '#9a98a3'}
        />
      </Link>
      <Link to="/likes" className="tab-item">
        <FaHeart
          color={location.pathname === '/likes' ? 'black' : '#9a98a3'}
        />
      </Link>
    </div>
  );
};

export default BottomBar;
