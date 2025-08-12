// import React, { useState, useRef, useEffect } from 'react';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import './NearMe.css';
// import FilterBottomSheet from '../components/PointsBottomSheet';
// import CardSlider from '../components/CardSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSliders } from '@fortawesome/free-solid-svg-icons';
// import {
//   GiKnifeFork,
//   GiShoppingBag,
//   GiMountainCave,
//   GiMartini,
//   GiWeightLiftingUp,
// } from 'react-icons/gi';

// import foodIcon from '../assets/restaurant.png';
// import fashionIcon from '../assets/fashionIcon.png';
// import nightlifeIcon from '../assets/bar-pin.png';
// import educationIcon from '../assets/restaurant.png';
// import defaultIcon from '../assets/defaultIcon.png';

// import { usePoints } from '../context/PointsContext';

// const macroIcons = {
//   Food: foodIcon,
//   Tours: defaultIcon,
//   Fashion: fashionIcon,
//   Nightlife: nightlifeIcon,
//   Education: educationIcon,
// };

// const macroButton = {
//   'Food & Drink': <GiKnifeFork size={24} />,
//   Shopping: <GiShoppingBag size={24} />,
//   'Culture & Sights': <GiMountainCave size={24} />,
//   'Activity & Wellness': <GiWeightLiftingUp size={24} />,
//   Nightlife: <GiMartini size={24} />,
// };

// const containerStyle = {
//   width: '100%',
//   height: 'calc(100vh - 30px)',
// };

// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//     Math.cos((lat2 * Math.PI) / 180) *
//     Math.sin(dLon / 2) *
//     Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// function getNearestPoint(userLocation, points) {
//   if (!userLocation || !points.length) return null;

//   let nearest = points[0];
//   let minDist = getDistanceFromLatLonInKm(
//     userLocation.lat,
//     userLocation.lng,
//     nearest.lat,
//     nearest.lng
//   );

//   for (let i = 1; i < points.length; i++) {
//     const dist = getDistanceFromLatLonInKm(
//       userLocation.lat,
//       userLocation.lng,
//       points[i].lat,
//       points[i].lng
//     );
//     if (dist < minDist) {
//       minDist = dist;
//       nearest = points[i];
//     }
//   }

//   return nearest;
// }


// const snazzyMapStyle = [
//   {
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#1d2c4d"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#8ec3b9"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1a3646"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.country",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#4b6878"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#64779e"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.province",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#4b6878"
//       }
//     ]
//   },
//   {
//     "featureType": "landscape.man_made",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#334e87"
//       }
//     ]
//   },
//   {
//     "featureType": "landscape.natural",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#023e58"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#283d6a"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#6f9ba5"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1d2c4d"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#023e58"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#3C7680"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#304a7d"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#98a5be"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1d2c4d"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#2c6675"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#255763"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#b0d5ce"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#023e58"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#98a5be"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1d2c4d"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.line",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#283d6a"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.station",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#3a4762"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#0e1626"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#4e6d70"
//       }
//     ]
//   }
// ]

// export default function NearMe() {
//   const { categorizedData, isLoading } = usePoints();
//   const [points, setPoints] = useState([]);
//   const [macro, setMacro] = useState(null);
//   const [tags, setTags] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [activeMarker, setActiveMarker] = useState(null);
//   const [showCardSheet, setShowCardSheet] = useState(false);
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);
//   const [userLocation, setUserLocation] = useState(null);
//   const [mapInteracted, setMapInteracted] = useState(false);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   const mapRef = useRef(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM',
//   });

//   useEffect(() => {
//     if (!isLoading) {
//       const flat = Object.values(categorizedData)
//         .flat()
//         .map((item) => {
//           const full = item.fullItem || {};
//           return {
//             id: full.id,
//             lat: parseFloat(full.lat),
//             lng: parseFloat(full.lng),
//             name: full.name || full.title || 'Untitled',
//             images: full.photos?.map((p) => p.url) || [],
//             tags: full.macros?.map((m) => m.name) || [],
//             openingHours: full.opening_hours || '',
//             distance: item.distance || '',
//             macro: (full.macros?.[0]?.name || '').trim(),
//             category: full.macros?.map((m) => m.name).filter(Boolean) || [],
//             type: full.type,
//             cuisine: full.cuisine,
//             price: full.price,
//             genre: full.genre,
//           };
//         })
//         .filter((p) => p.lat && p.lng);

//       setPoints(flat);
//     }
//   }, [categorizedData, isLoading]);

//   useEffect(() => {
//     if (!isLoaded) return;

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const location = {
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         };
//         setUserLocation(location);

//         if (mapRef.current) {
//           mapRef.current.setCenter(location);
//           mapRef.current.setZoom(14);
//         }

//         const nearest = getNearestPoint(location, points);
//         if (nearest) {
//           setActiveMarker(nearest.id);
//           setShowCardSheet(true);
//           setTimeout(() => {
//             const card = document.getElementById(`card-${nearest.id}`);
//             if (card) {
//               card.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             }
//           }, 500);
//         }
//       },
//       (err) => {
//         console.error('Geolocation error:', err);
//         const fallback = { lat: 59.9139, lng: 10.7522 };
//         setUserLocation(fallback);
//         mapRef.current?.setCenter(fallback);
//         mapRef.current?.setZoom(12);
//       },
//       { enableHighAccuracy: true }
//     );
//   }, [isLoaded, points]);

//   const filteredPoints = points.filter((p) => {
//     const macroMatch =
//       !macro ||
//       (Array.isArray(p.category)
//         ? p.category.some(
//             (c) =>
//               typeof c === 'string' &&
//               c.toLowerCase().trim() === macro.toLowerCase().trim()
//           )
//         : typeof p.category === 'string' &&
//           p.category.toLowerCase().trim() === macro.toLowerCase().trim());

//     const combinedTagsRaw = [
//       ...(Array.isArray(p.tags) ? p.tags : []),
//       ...(Array.isArray(p.category) ? p.category : [p.category]),
//       p.type,
//       p.cuisine,
//       p.price,
//       ...(Array.isArray(p.genre) ? p.genre : [p.genre]),
//     ];

//     const combinedTags = combinedTagsRaw
//       .map((t) => {
//         if (typeof t === 'string') return t.toLowerCase();
//         if (typeof t === 'number') return t.toString().toLowerCase();
//         return null;
//       })
//       .filter(Boolean);

//     const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

//     const tagMatch =
//       tags.length === 0 ||
//       tags.some((tag) => combinedTags.includes(tag.toLowerCase()));

//     const proximityMatch =
//       !userLocation || mapInteracted
//         ? true
//         : getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, p.lat, p.lng) <= 1;

//     return macroMatch && tagMatch && searchMatch && proximityMatch;
//   });

//   useEffect(() => {
//     if (
//       mapLoaded &&
//       mapRef.current &&
//       window.google?.maps?.LatLngBounds &&
//       filteredPoints.length > 0 &&
//       !mapInteracted
//     ) {
//       const bounds = new window.google.maps.LatLngBounds();
//       filteredPoints.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
//       mapRef.current.fitBounds(bounds, {
//         padding: { top: 250, bottom: 50, left: 100, right: 100 },
//       });
//     }
//   }, [filteredPoints, mapLoaded, mapInteracted]);

//   const handleFilterApply = (macroKey, selectedTags) => {
//     setMacro(macroKey);
//     setTags(selectedTags);
//     setActiveFiltersCount((macroKey ? 1 : 0) + selectedTags.length);

//     const matches = points.filter((p) => {
//       const macroMatch =
//         !macroKey ||
//         (Array.isArray(p.category)
//           ? p.category.some(
//               (c) =>
//                 typeof c === 'string' &&
//                 c.toLowerCase().trim() === macroKey.toLowerCase().trim()
//             )
//           : typeof p.category === 'string' &&
//             p.category.toLowerCase().trim() === macroKey.toLowerCase().trim());

//       const combinedTagsRaw = [
//         ...(Array.isArray(p.tags) ? p.tags : []),
//         ...(Array.isArray(p.category) ? p.category : [p.category]),
//         p.type,
//         p.cuisine,
//         p.price,
//         ...(Array.isArray(p.genre) ? p.genre : [p.genre]),
//       ];

//       const combinedTags = combinedTagsRaw
//         .map((t) => {
//           if (typeof t === 'string') return t.toLowerCase();
//           if (typeof t === 'number') return t.toString().toLowerCase();
//           return null;
//         })
//         .filter(Boolean);

//       const tagMatch =
//         selectedTags.length === 0 ||
//         selectedTags.some((tag) => combinedTags.includes(tag.toLowerCase()));

//       return macroMatch && tagMatch;
//     });

//     if (matches.length === 0) {
//       alert('No matching places found.');
//       setMacro(null);
//       setTags([]);
//       setActiveFiltersCount(0);
//       setShowFilterSheet(true); 
//       setShowCardSheet(true);    
//       setActiveMarker(null);  

//     } else if (mapRef.current && window.google?.maps?.LatLngBounds) {
//       const bounds = new window.google.maps.LatLngBounds();
//       matches.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
//       mapRef.current.fitBounds(bounds, {
//         padding: { top: 250, bottom: 50, left: 100, right: 100 },
//       });
//     }
//   };

//   const handleClearFilters = () => {
//     setMacro(null);
//     setTags([]);
//     setSearchTerm('');
//     setActiveFiltersCount(0);
//     setMapInteracted(false);

//     if (mapRef.current && userLocation) {
//       mapRef.current.setCenter(userLocation);
//       mapRef.current.setZoom(14);
//     }
//   };

//   if (!isLoaded || !window.google?.maps) return <div>Loading map...</div>;

//   return (
//     <div id="near-me-container">
//       <div className="nearme-container">
//         <div className="nearme-header">
//           <input
//             type="text"
//             placeholder="Search places..."
//             className="search-input"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <div className="filter-btn-wrapper" onClick={() => setShowFilterSheet(true)}>
//             <button className="filter-btn">
//               <FontAwesomeIcon icon={faSliders} />
//             </button>
//             {activeFiltersCount > 0 && (
//               <span className="filter-badge">{activeFiltersCount}</span>
//             )}
//           </div>
//         </div>

//         <CardSlider
//           show={showCardSheet}
//           points={filteredPoints}
//           activeMarker={activeMarker}
//           setShowCardSheet={setShowCardSheet}
//         />

//         <FilterBottomSheet
//           show={showFilterSheet}
//           onClose={() => setShowFilterSheet(false)}
//           onClearFilters={handleClearFilters}
//           setMacro={setMacro}
//           setTags={setTags}
//           setActiveFiltersCount={setActiveFiltersCount}
//           macro={macro}
//           onApplyFilters={handleFilterApply}
//           allPoints={points}
//         />

//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           onLoad={(map) => {
//             mapRef.current = map;
//             setMapLoaded(true);
//           }}
//           onZoomChanged={() => setMapInteracted(true)}
//           onDragEnd={() => setMapInteracted(true)}
//           options={{
//             mapTypeControl: false,
//             zoomControl: false,
//             streetViewControl: false,
//             fullscreenControl: false,
//             styles: snazzyMapStyle,
//             disableDefaultUI: true,
//           }}
//           zoom={17}
//           center={userLocation || { lat: 59.9139, lng: 10.7522 }}
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

//           {filteredPoints.map((point, index) => (
//             <Marker
//               key={`${point.id}-${index}`}
//               position={{ lat: point.lat, lng: point.lng }}
//               onClick={() => {
//                 setActiveMarker(null);
//                 setShowCardSheet(false);
//                 setTimeout(() => {
//                   setActiveMarker(point.id);
//                   setShowCardSheet(true);
//                 }, 100);
//               }}
//               icon={{
//                 url: macroIcons[point.macro] || defaultIcon,
//                 scaledSize: new window.google.maps.Size(40, 40),
//               }}
//             />
//           ))}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './NearMe.css';
import FilterBottomSheet from '../components/PointsBottomSheet';
import CardSlider from '../components/CardSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import {
  GiKnifeFork,
  GiShoppingBag,
  GiMountainCave,
  GiMartini,
  GiWeightLiftingUp,
} from 'react-icons/gi';

import foodIcon from '../assets/fok.png';
import nightlifeIcon from '../assets/bar-pin.png';
import defaultIcon from '../assets/default.png';
import shopping from '../assets/shopping.png';
import wellness from '../assets/wellness.png';
import homeIcon from '../assets/home.png';
import { usePoints } from '../context/PointsContext';



const macroIcons = {
  'Food & Drink': foodIcon,
  'Tours': defaultIcon,
  'nightlife': nightlifeIcon,
  'Shopping': shopping,
  'Culture & Sights': homeIcon,
  'Activty & Wellness': wellness
};


const macroButton = {
  'Food & Drink': <GiKnifeFork size={24} />,
  Shopping: <GiShoppingBag size={24} />,
  'Culture & Sights': <GiMountainCave size={24} />,
  'Activity & Wellness': <GiWeightLiftingUp size={24} />,
  Nightlife: <GiMartini size={24} />,
};

// ---------- HELPER FUNCTIONS ----------
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

function getNearestPoint(userLocation, points) {
  if (!userLocation || !points.length) return null;

  let nearest = points[0];
  let minDist = getDistanceFromLatLonInKm(
    userLocation.lat,
    userLocation.lng,
    nearest.lat,
    nearest.lng
  );

  for (let i = 1; i < points.length; i++) {
    const dist = getDistanceFromLatLonInKm(
      userLocation.lat,
      userLocation.lng,
      points[i].lat,
      points[i].lng
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = points[i];
    }
  }

  return nearest;
}

const snazzyMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]


export default function NearMe() {
  const { categorizedData, isLoading } = usePoints();
  const [points, setPoints] = useState([]);
  const [macro, setMacro] = useState(null);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showCardSheet, setShowCardSheet] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [mapInteracted, setMapInteracted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [cardSliderHeight, setCardSliderHeight] = useState(160);
  const mapContainerRef = useRef(null);

  const [containerStyle, setContainerStyle] = useState({
    width: '100%',
    height: `${window.innerHeight - cardSliderHeight}px`
  });

    const handleSliderHeightChange = (height, isFinal) => {
    if (mapContainerRef.current) {
      const mapHeight = window.innerHeight - height;
      mapContainerRef.current.style.height = `${mapHeight}px`;
    }
    if (isFinal) {
      setCardSliderHeight(height);
    }
  };

  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM',
  });

  useEffect(() => {
    setContainerStyle({
      width: '100%',
      height: `${window.innerHeight - cardSliderHeight}px`
    });
  }, [cardSliderHeight]);

  useEffect(() => {
    const handleResize = () => {
      setContainerStyle({
        width: '100%',
        height: `${window.innerHeight - cardSliderHeight}px`
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardSliderHeight]);

  useEffect(() => {
    if (!isLoading) {
      const flat = Object.values(categorizedData)
        .flat()
        .map((item) => {
          const full = item.fullItem || {};
          return {
            id: full.id,
            lat: parseFloat(full.lat),
            lng: parseFloat(full.lng),
            name: full.name || full.title || 'Untitled',
            images: full.photos?.map((p) => p.url) || [],
            tags: full.macros?.map((m) => m.name) || [],
            openingHours: full.opening_hours || '',
            distance: item.distance || '',
            macro: (full.macros?.[0]?.name || '').trim(),
            category: full.macros?.map((m) => m.name).filter(Boolean) || [],
            type: full.type,
            cuisine: full.cuisine,
            price: full.price,
            genre: full.genre,
          };
        })
        .filter((p) => p.lat && p.lng);

      setPoints(flat);
    }
  }, [categorizedData, isLoading]);

  useEffect(() => {
    if (!isLoaded) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(location);

        if (mapRef.current) {
          mapRef.current.setCenter(location);
          mapRef.current.setZoom(14);
        }

        // const nearest = getNearestPoint(location, points);
        // if (nearest) {
        //   setActiveMarker(nearest.id);
        //   setShowCardSheet(true);
        //   setTimeout(() => {
        //     const card = document.getElementById(`card-${nearest.id}`);
        //     if (card) {
        //       card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        //     }
        //   }, 500);
        // }
      },
      (err) => {
        console.error('Geolocation error:', err);
        const fallback = { lat: 59.9139, lng: 10.7522 };
        setUserLocation(fallback);
        mapRef.current?.setCenter(fallback);
        mapRef.current?.setZoom(12);
      },
      { enableHighAccuracy: true }
    );
  }, [isLoaded, points]);

  // ---------- FILTER POINTS ----------
  const filteredPoints = points.filter((p) => {
    const macroMatch =
      !macro ||
      (Array.isArray(p.category)
        ? p.category.some(
          (c) =>
            typeof c === 'string' &&
            c.toLowerCase().trim() === macro.toLowerCase().trim()
        )
        : typeof p.category === 'string' &&
        p.category.toLowerCase().trim() === macro.toLowerCase().trim());

    const combinedTagsRaw = [
      ...(Array.isArray(p.tags) ? p.tags : []),
      ...(Array.isArray(p.category) ? p.category : [p.category]),
      p.type,
      p.cuisine,
      p.price,
      ...(Array.isArray(p.genre) ? p.genre : [p.genre]),
    ];

    const combinedTags = combinedTagsRaw
      .map((t) => {
        if (typeof t === 'string') return t.toLowerCase();
        if (typeof t === 'number') return t.toString().toLowerCase();
        return null;
      })
      .filter(Boolean);

    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

    const tagMatch =
      tags.length === 0 ||
      tags.some((tag) => combinedTags.includes(tag.toLowerCase()));

    const proximityMatch =
      !userLocation || mapInteracted
        ? true
        : getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, p.lat, p.lng) <= 1;

    return macroMatch && tagMatch && searchMatch && proximityMatch;
  });

  // ---------- FIT MAP TO FILTERED POINTS ----------
  useEffect(() => {
    if (
      mapLoaded &&
      mapRef.current &&
      window.google?.maps?.LatLngBounds &&
      filteredPoints.length > 0 &&
      !mapInteracted
    ) {
      const bounds = new window.google.maps.LatLngBounds();
      filteredPoints.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
      mapRef.current.fitBounds(bounds, {
        padding: { top: 250, bottom: 50, left: 100, right: 100 },
      });
    }
  }, [filteredPoints, mapLoaded, mapInteracted]);

  const handleFilterApply = (macroKey, selectedTags) => {
    setMacro(macroKey);
    setTags(selectedTags);
    setActiveFiltersCount((macroKey ? 1 : 0) + selectedTags.length);

    const matches = points.filter((p) => {
      const macroMatch =
        !macroKey ||
        (Array.isArray(p.category)
          ? p.category.some(
            (c) =>
              typeof c === 'string' &&
              c.toLowerCase().trim() === macroKey.toLowerCase().trim()
          )
          : typeof p.category === 'string' &&
          p.category.toLowerCase().trim() === macroKey.toLowerCase().trim());

      const combinedTagsRaw = [
        ...(Array.isArray(p.tags) ? p.tags : []),
        ...(Array.isArray(p.category) ? p.category : [p.category]),
        p.type,
        p.cuisine,
        p.price,
        ...(Array.isArray(p.genre) ? p.genre : [p.genre]),
      ];

      const combinedTags = combinedTagsRaw
        .map((t) => {
          if (typeof t === 'string') return t.toLowerCase();
          if (typeof t === 'number') return t.toString().toLowerCase();
          return null;
        })
        .filter(Boolean);

      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => combinedTags.includes(tag.toLowerCase()));

      return macroMatch && tagMatch;
    });

    if (matches.length === 0) {
      alert('No matching places found.');
      setMacro(null);
      setTags([]);
      setActiveFiltersCount(0);
      setShowFilterSheet(true);
      setShowCardSheet(true);
      setActiveMarker(null);

    } else if (mapRef.current && window.google?.maps?.LatLngBounds) {
      const bounds = new window.google.maps.LatLngBounds();
      matches.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
      mapRef.current.fitBounds(bounds, {
        padding: { top: 250, bottom: 50, left: 100, right: 100 },
      });
    }
  };

  const handleClearFilters = () => {
    setMacro(null);
    setTags([]);
    setSearchTerm('');
    setActiveFiltersCount(0);
    setMapInteracted(false);

    if (mapRef.current && userLocation) {
      mapRef.current.setCenter(userLocation);
      mapRef.current.setZoom(14);
    }
  };

  if (!isLoaded || !window.google?.maps) return <div>Loading map...</div>;

  return (
    <div id="near-me-container">
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

        {/* <CardSlider
          show={showCardSheet}
          points={filteredPoints}
          activeMarker={activeMarker}
          setShowCardSheet={setShowCardSheet}
          onHeightChange={setCardSliderHeight}
        /> */}

        <CardSlider
          show={showCardSheet}
          points={filteredPoints}
          activeMarker={activeMarker}
          setShowCardSheet={setShowCardSheet}
          onHeightChange={setCardSliderHeight}
        />

        <FilterBottomSheet
          show={showFilterSheet}
          onClose={() => setShowFilterSheet(false)}
          onClearFilters={handleClearFilters}
          setMacro={setMacro}
          setTags={setTags}
          setActiveFiltersCount={setActiveFiltersCount}
          macro={macro}
          onApplyFilters={handleFilterApply}
          allPoints={points}
        />

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
            styles: snazzyMapStyle,
            disableDefaultUI: true,
          }}
          zoom={17}
          center={userLocation || { lat: 59.9139, lng: 10.7522 }}
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

          {filteredPoints.map((point, index) => (
            <Marker
              key={`${point.id}-${index}`}
              position={{ lat: point.lat, lng: point.lng }}
              onClick={() => {
                setActiveMarker(null);
                setShowCardSheet(false);
                setTimeout(() => {
                  setActiveMarker(point.id);
                  setShowCardSheet(true);
                }, 100);
              }}
              icon={{
                url: macroIcons[point.macro] || defaultIcon,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
