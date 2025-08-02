// import React, { useEffect, useState } from 'react';
// import './CityBottomSheet.css';
// import {fetchCities} from '../data/fetchCities'

// export default function CityBottomSheet({ show, onClose, setSelectedCity  }) {
//   const [cities, setCities] = useState([]);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const setVH = () => {
//       const vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty('--vh', `${vh}px`);
//     };
//     setVH();
//     window.addEventListener('resize', setVH);
//     return () => window.removeEventListener('resize', setVH);
//   }, []);

//   useEffect(() => {
//     const getCities = async () => {
//       try {
//         const result = await fetchCities();
//         setCities(result || []);
//       } catch (error) {
//         console.error('Failed to fetch cities:', error);
//       }
//     };
//     getCities();
//   }, [fetchCities]);

//   const buildImageUrl = (url) => {
//     if (!url) return 'https://via.placeholder.com/300x200?text=No+Image';
//     try {
//       const fullUrl = new URL(url);
//       if (token) fullUrl.searchParams.append('token', token);
//       return fullUrl.toString();
//     } catch (err) {
//       console.error('Invalid image URL:', err);
//       return 'https://via.placeholder.com/300x200?text=No+Image';
//     }
//   };

//   const handleCitySelect = (city) => {
//     setSelectedCity(city);
//     localStorage.setItem('selected_city', JSON.stringify(city));
//     onClose(); // Close the sheet
//   };

//   if (!show) return null;

//   return (
//     <div className="city-bottom-sheet-overlay" onClick={onClose}>
//       <div className="city-bottom-sheet" onClick={(e) => e.stopPropagation()}>
//         <div className="drag-handle" />
//         <button className="close-button" onClick={onClose}>&times;</button>

//         <div className="selected-city">
//           <h4>Selected city</h4>
//           {/* {cities[0] && (
//             <div className="city-card">
//               <img
//                 src={buildImageUrl(cities[0]?.photo?.url)}
//                 alt={cities[0]?.name}
//               />
//               <span>{cities[0]?.name}</span>
//             </div>
//           )} */}
//           {cities[0] && (
//   <>
//     <h4>Selected city</h4>
//     <button className="city-card" onClick={() => handleCitySelect(cities[0])}>
//       <img src={buildImageUrl(cities[0]?.photo?.url)} alt={cities[0]?.name} />
//       <span>{cities[0]?.name}</span>
//     </button>
//   </>
// )}

//         </div>

//         <h4 style={{ fontWeight: 500 }}>Choose city</h4>
//         <div className="city-options">
//           {cities.slice(1).map((city) => (
//             <button key={city.id} className="city-card" onClick={() => handleCitySelect(city)}>
//               <img
//                 src={buildImageUrl(city?.photo?.url)}
//                 alt={city.name}
//               />
//               <span>{city.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import './CityBottomSheet.css';
import { fetchCities } from '../data/fetchCities';

export default function CityBottomSheet({ show, onClose, setSelectedCity }) {
  const [cities, setCities] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await fetchCities();
        setCities(result || []);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };
    getCities();
  }, []);

  const buildImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200?text=No+Image';
    try {
      const fullUrl = new URL(url);
      if (token) fullUrl.searchParams.append('token', token);
      return fullUrl.toString();
    } catch (err) {
      console.error('Invalid image URL:', err);
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    localStorage.setItem('selected_city', JSON.stringify(city));
    onClose();
  };

  if (!show) return null;

  return (
    <div className="city-bottom-sheet-overlay" onClick={onClose}>
      <div className="city-bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* ✅ Selected City */}
        <div className="selected-city">
          <h4>Selected city</h4>
          {cities[0] && (
            <div className="city-card" onClick={() => handleCitySelect(cities[0])}>
              <img
                src={buildImageUrl(cities[0]?.photo?.url)}
                alt={cities[0]?.name}
              />
              <span>{cities[0]?.name}</span>
            </div>
          )}
        </div>

        {/* ✅ Other City Options */}
        <h4 style={{ fontWeight: 500 }}>Choose city</h4>
        <div className="city-options">
          {cities.slice(1).map((city) => (
            <button
              key={city.id}
              className="city-card"
              onClick={() => handleCitySelect(city)}
            >
              <img
                src={buildImageUrl(city?.photo?.url)}
                alt={city.name}
              />
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
