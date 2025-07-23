import React, { useEffect, useState } from 'react';
import { FiMenu, FiMapPin, FiSearch } from 'react-icons/fi';
import './Header.css';
import searchIcon from '../assets/new.png';

export default function Header({ setIsMenuOpen, pullHeight, isPulling }) {
  const fullText = "What tourist attractions are nearby?";
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const char = fullText.charAt(index);
        setPlaceholder(prev => {
          const newPlaceholder = prev + char;
          console.log("Index:", index, "Char:", char, "New Placeholder:", newPlaceholder);
          return newPlaceholder;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-wrapper">
      <div
        className="header-content"
        style={{
          transform: `translateY(${pullHeight * 0.4}px)`,
          transition: isPulling ? 'none' : 'transform 0.4s ease',
        }}
      >
        <div className="header-top">
          <div className="location">
            <span>Find attractions in</span>
            <strong>
              <FiMapPin className="location-icon" /> Florence
            </strong>
          </div>
          <FiMenu className="menu-icon" onClick={() => setIsMenuOpen(true)} />
        </div>

        {/* <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder={placeholder} />
        </div> */}
        <div className="search-bar">
          <img src={searchIcon} alt="Search" className="search-icon-img" />
          <input type="text" placeholder={placeholder} />
        </div>

      </div>
    </div>
  );
}
