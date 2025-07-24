// import React, { useState, useRef, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import './NearMe.css';
// import mockPoints from '../data/mockPoints';
// import FilterBottomSheet from '../components/PointsBottomSheet';
// import CardSlider from '../components/CardSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSliders } from '@fortawesome/free-solid-svg-icons';
// import customMarkerIcon from '../assets/pointer.png';

// const containerStyle = {
//   width: '100%',
//   height: 'calc(100vh - 100px)',
// };

// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// export default function NearMe() {
//   const [points] = useState(mockPoints);
//   const [macro, setMacro] = useState(null);
//   const [tags, setTags] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [activeMarker, setActiveMarker] = useState(null);
//   const [showCardSheet, setShowCardSheet] = useState(false);
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);
//   const [userLocation, setUserLocation] = useState(null);

//   const mapRef = useRef(null);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const location = {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           };
//           setUserLocation(location);

//           // Set default zoom and center like Google Maps
//           if (mapRef.current) {
//             mapRef.current.setCenter(location);
//             mapRef.current.setZoom(16); // Moderate zoom level
//           }
//         },
//         (err) => console.error('Geolocation error:', err),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, [mapLoaded]);

//   const filteredPoints = points.filter((p) => {
//     const macroMatch = !macro || p.macro === macro;
//     const tagMatch = tags.length === 0 || tags.some(tag => p.tags.includes(tag));
//     const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const proximityMatch = userLocation
//       ? getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, p.lat, p.lng) <= 5
//       : true;

//     return macroMatch && tagMatch && searchMatch && proximityMatch;
//   });

//   useEffect(() => {
//     if (mapLoaded && mapRef.current && window.google?.maps?.LatLngBounds) {
//       if (filteredPoints.length > 0) {
//         const bounds = new window.google.maps.LatLngBounds();
//         filteredPoints.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
//         mapRef.current.fitBounds(bounds, {
//           padding: { top: 250, bottom: 50, left: 100, right: 100 },
//         });
//       }
//     }
//   }, [filteredPoints, mapLoaded]);

//   return (
//     <div className="nearme-container">
//       <div className="nearme-header">
//         <input
//           type="text"
//           placeholder="Search places..."
//           className="search-input"
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <div className="filter-btn-wrapper" onClick={() => setShowFilterSheet(true)}>
//           <button className="filter-btn">
//             <FontAwesomeIcon icon={faSliders} />
//           </button>
//           {activeFiltersCount > 0 && (
//             <span className="filter-badge">{activeFiltersCount}</span>
//           )}
//         </div>
//       </div>

//       <CardSlider
//         show={showCardSheet}
//         points={filteredPoints}
//         activeMarker={activeMarker}
//         setShowCardSheet={setShowCardSheet}
//       />

//       <FilterBottomSheet
//         show={showFilterSheet}
//         onClose={() => setShowFilterSheet(false)}
//         setMacro={setMacro}
//         setTags={setTags}
//         setActiveFiltersCount={setActiveFiltersCount}
//       />

//       <LoadScript googleMapsApiKey={'AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM'}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           onLoad={(map) => {
//             mapRef.current = map;
//             setMapLoaded(true);
//           }}
//           options={{
//             mapTypeControl: false,
//             zoomControl: false,
//             streetViewControl: false,
//             fullscreenControl: false,
//           }}
//           zoom={16} // Set default zoom level
//           center={userLocation || { lat: 0, lng: 0 }} // Temporary center before GPS loads
//         >
//           {userLocation && (
//             <Marker
//               position={userLocation}
//               icon={{
//                 path: window.google.maps.SymbolPath.CIRCLE,
//                 scale: 8,
//                 fillColor: '#4285F4',
//                 fillOpacity: 1,
//                 strokeWeight: 2,
//                 strokeColor: 'white',
//               }}
//             />
//           )}

//           {filteredPoints.map((point) => (
//             <Marker
//               key={point.id}
//               position={{ lat: point.lat, lng: point.lng }}
//               onClick={() => {
//                 setActiveMarker(null);
//                 setShowCardSheet(false);
//                 setTimeout(() => {
//                   setActiveMarker(point.id);
//                   setShowCardSheet(true);
//                 }, 50);
//               }}
//               icon={
//                 mapLoaded && window.google
//                   ? {
//                       url: customMarkerIcon,
//                       scaledSize: new window.google.maps.Size(40, 40),
//                     }
//                   : undefined
//               }
//             />
//           ))}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './NearMe.css';
import mockPoints from '../data/mockPoints';
import FilterBottomSheet from '../components/PointsBottomSheet';
import CardSlider from '../components/CardSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import customMarkerIcon from '../assets/pointer.png';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 100px)',
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function NearMe() {
  const [points] = useState(mockPoints);
  const [macro, setMacro] = useState(null);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showCardSheet, setShowCardSheet] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [mapInteracted, setMapInteracted] = useState(false);

  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(location);

          if (mapRef.current) {
            mapRef.current.setCenter(location);
            mapRef.current.setZoom(15);
          }
        },
        (err) => console.error('Geolocation error:', err),
        { enableHighAccuracy: true }
      );
    }
  }, [mapLoaded]);

  // Filter points based on search, filters, and location (if map not interacted)
  const filteredPoints = points.filter((p) => {
    const macroMatch = !macro || p.macro === macro;
    const tagMatch = tags.length === 0 || tags.some((tag) => p.tags.includes(tag));
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

    const proximityMatch =
      !userLocation || mapInteracted
        ? true
        : getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, p.lat, p.lng) <= 1;

    return macroMatch && tagMatch && searchMatch && proximityMatch;
  });

  // Fit bounds on initial load
  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google?.maps?.LatLngBounds) {
      if (filteredPoints.length > 0 && !mapInteracted) {
        const bounds = new window.google.maps.LatLngBounds();
        filteredPoints.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
        mapRef.current.fitBounds(bounds, {
          padding: { top: 250, bottom: 50, left: 100, right: 100 },
        });
      }
    }
  }, [filteredPoints, mapLoaded, mapInteracted]);

  return (
    <div className="nearme-container">
      <div className="nearme-header">
        <input
          type="text"
          placeholder="Search places..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-btn-wrapper" onClick={() => setShowFilterSheet(true)}>
          <button className="filter-btn">
            <FontAwesomeIcon icon={faSliders} />
          </button>
          {activeFiltersCount > 0 && (
            <span className="filter-badge">{activeFiltersCount}</span>
          )}
        </div>
      </div>

      <CardSlider
        show={showCardSheet}
        points={filteredPoints}
        activeMarker={activeMarker}
        setShowCardSheet={setShowCardSheet}
      />

      <FilterBottomSheet
        show={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        setMacro={setMacro}
        setTags={setTags}
        setActiveFiltersCount={setActiveFiltersCount}
      />

      <LoadScript googleMapsApiKey={'AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM'}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={(map) => {
            mapRef.current = map;
            setMapLoaded(true);
          }}
          onZoomChanged={() => setMapInteracted(true)}
          onDragEnd={() => setMapInteracted(true)}
          options={{
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          zoom={17}
          center={userLocation || { lat: 0, lng: 0 }}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: 'white',
              }}
            />
          )}

          {filteredPoints.map((point) => (
            <Marker
              key={point.id}
              position={{ lat: point.lat, lng: point.lng }}
              onClick={() => {
                setActiveMarker(null);
                setShowCardSheet(false);
                setTimeout(() => {
                  setActiveMarker(point.id);
                  setShowCardSheet(true);
                }, 50);
              }}
              icon={
                mapLoaded && window.google
                  ? {
                      url: customMarkerIcon,
                      scaledSize: new window.google.maps.Size(40, 40),
                    }
                  : undefined
              }
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

