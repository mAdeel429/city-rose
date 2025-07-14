import React, { useEffect, useState } from 'react';
import './Header.css';
import { FiMenu, FiMapPin, FiSearch } from 'react-icons/fi';

export default function Header({ setIsMenuOpen }) {
  const fullText = "What tourist attractions are nearby?";
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(prev => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-container">
      <div className="header-overlay">
        <div className="header-top">
          <div className="location">
            <span>Find attractions in</span>
            <strong>
              <FiMapPin className="location-icon" /> Florence
            </strong>
          </div>
          <FiMenu className="menu-icon" onClick={() => setIsMenuOpen(true)} />
        </div>

        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder={placeholder} />
        </div>
      </div>
    </div>
  );
}
