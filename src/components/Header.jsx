// import React, { useEffect, useState } from 'react';
// import { FiMenu } from 'react-icons/fi';
// import './Header.css';
// import searchIcon from '../assets/CityRose Logo Condiviso (2).png';
// import locationIcon from '../assets/icon__2_-removebg-preview.png';

// export default function Header({ setIsMenuOpen, pullHeight, isPulling, onLocationClick, selectedCity, searchQuery, setSearchQuery }) {
//   const fullText = "What tourist attractions are nearby?";
//   const [placeholder, setPlaceholder] = useState("");

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < fullText.length) {
//         const char = fullText.charAt(index);
//         setPlaceholder(prev => prev + char);
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 150);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="header-wrapper">
//       <div
//         className="header-content"
//         style={{
//           transform: `translateY(${pullHeight * 0.4}px)`,
//           transition: isPulling ? 'none' : 'transform 0.4s ease',
//         }}
//       >
//         <div className="header-top">
//           <div
//             className="location"
//             onClick={onLocationClick}
//             style={{ cursor: 'pointer' }}
//           >
//             <span>Find attractions in</span>
//             <strong>
//               <img src={locationIcon} alt="Location" className="location-icon-img" />{" "}
//               {selectedCity?.name || 'Florence'}
//             </strong>
//           </div>

//           <FiMenu className="menu-icon" onClick={() => setIsMenuOpen(true)} />
//         </div>
//         <div className="search-bar">
//           <img src={searchIcon} alt="Search" className="search-icon-img" />
//           <input
//             type="text"
//             placeholder={placeholder}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import './Header.css';
import searchIcon from '../assets/CityRose Logo Condiviso (2).png';
import locationIcon from '../assets/icon__2_-removebg-preview.png';
import defaultHeader from '../assets/header.gif';

export default function Header({
  setIsMenuOpen,
  pullHeight,
  isPulling,
  onLocationClick,
  selectedCity,
  searchQuery,
  setSearchQuery
}) {
   const fullText = "What tourist attractions are nearby?";
  const [placeholder, setPlaceholder] = useState("");

    useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const char = fullText.charAt(index);
        setPlaceholder(prev => prev + char);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);


  const token = localStorage.getItem('token');
  let backgroundUrl = defaultHeader;

  if (selectedCity?.photo?.url && typeof selectedCity.photo.url === 'string') {
    try {
      if (selectedCity.photo.url.startsWith('http')) {
        const url = new URL(selectedCity.photo.url);
        if (token) url.searchParams.append('token', token);
        backgroundUrl = url.toString();
      } else {
        backgroundUrl = selectedCity.photo.url;
      }
    } catch (err) {
      console.error('Invalid city image URL:', err);
    }
  }

  return (
    <div
      className="header-wrapper"
      style={{
        backgroundImage: `url("${backgroundUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="header-content"
        style={{
          transform: `translateY(${pullHeight * 0.4}px)`,
          transition: isPulling ? 'none' : 'transform 0.4s ease',
        }}
      >
        <div className="header-top">
          <div
            className="location"
            onClick={onLocationClick}
            style={{ cursor: 'pointer' }}
          >
            <span>Find attractions in</span>
            <strong>
              <img src={locationIcon} alt="Location" className="location-icon-img" />{" "}
              {selectedCity?.name || 'Florence'}
            </strong>
          </div>
          <FiMenu className="menu-icon" onClick={() => setIsMenuOpen(true)} />
        </div>
        <div className="search-bar">
          <img src={searchIcon} alt="Search" className="search-icon-img" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}


