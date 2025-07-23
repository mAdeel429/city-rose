import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaTag, FaHeart, FaUser } from 'react-icons/fa';
import './PointList.css';
import CenterIcon from '../assets/new.png';
import NearMeIcon from '../assets/icon 1.png';
import folderMap from '../assets/folder map new.png';

const BottomBar = () => {
  const location = useLocation();

  return (
    <div className="bottom-tabs">
      <Link to="/around-you" className="tab-item">
        <img
          src={NearMeIcon}
          alt="Near Me Icon"
          className="tab-icon"
          style={{
            height: '30px',
            width: '22px',
            opacity: location.pathname === '/around-you' ? 1 : 0.4,
          }}
        />
      </Link>
      <Link to="/offers" className="tab-item">
        <FaTag
          style={{
            transform: 'rotate(90deg)',
            color: 'black',
            opacity: location.pathname === '/offers' ? 1 : 0.4,
          }}
        />
      </Link>

      <Link to="/" className="tab-item center-tab">
        {location.pathname === '/' ? (
          <img
            src={CenterIcon}
            alt="Center Icon Active"
            className="center-icon"
          />
        ) : (
          <img
            src={CenterIcon}
            alt="Center Icon Inactive"
            className="center-icon"
            style={{ opacity: 0.4 }}
          />
        )}

      </Link>
      <Link to="/near-me" className="tab-item">
        <img
          src={folderMap}
          alt="Profile Icon"
          className="tab-icon"
          style={{
            height: '26px',
            width: '26px',
            opacity: location.pathname === '/near-me' ? 1 : 0.4,
          }}
        />
      </Link>

      <Link to="/likes" className="tab-item">
        <FaHeart
          style={{
            color: 'black',
            opacity: location.pathname === '/likes' ? 1 : 0.4,
          }}
        />

      </Link>
    </div>
  );
};

export default BottomBar;
