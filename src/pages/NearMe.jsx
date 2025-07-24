// import React, { useState, useRef, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { motion, AnimatePresence } from 'framer-motion';
// import './NearMe.css';
// import mockPoints from '../data/mockPoints';
// import FilterBottomSheet from '../components/PointsBottomSheet';
// import CardSlider from '../components/CardSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSliders } from '@fortawesome/free-solid-svg-icons';

// const containerStyle = {
//   width: '100%',
//   height: 'calc(100vh - 100px)',
// };

// export default function NearMe() {
//   const [points] = useState(mockPoints);
//   const [macro, setMacro] = useState(null);
//   const [tags, setTags] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [activeMarker, setActiveMarker] = useState(null);
//   const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
//   const [showCardSheet, setShowCardSheet] = useState(true);
//   const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);

//   const mapRef = useRef(null);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   const filteredPoints = points.filter((p) => {
//     const macroMatch = !macro || p.macro === macro;
//     const tagMatch = tags.length === 0 || tags.some(tag => p.tags.includes(tag));
//     const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
//     return macroMatch && tagMatch && searchMatch;
//   });

//   const selectedPoint = points.find(p => p.id === activeMarker);

//   useEffect(() => {
//     if (mapLoaded && mapRef.current && filteredPoints.length > 0 && window.google?.maps?.LatLngBounds) {
//       const bounds = new window.google.maps.LatLngBounds();
//       filteredPoints.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
//       mapRef.current.fitBounds(bounds, { padding: { top: 250, bottom: 50, left: 100, right: 100 } });
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
//           {activeFiltersCount > 0 && <span className="filter-badge">{activeFiltersCount}</span>}
//         </div>
//       </div>

//       <CardSlider
//         show={showCardSheet}
//         points={filteredPoints}
//         onCollapseChange={setIsSheetCollapsed}
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
//         >
//           {filteredPoints.map((point) => (
//             <Marker
//               key={point.id}
//               position={{ lat: point.lat, lng: point.lng }}
//               onClick={() => {
//                 setActiveMarker(point.id);
//                 setBottomSheetVisible(true);
//               }}
//             />
//           ))}
//         </GoogleMap>
//       </LoadScript>

//       <AnimatePresence>
//         {bottomSheetVisible && selectedPoint && (
//           <motion.div
//             className="card-popup"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="card-content">
//               <div className="card-image-container">
//                 <img src={selectedPoint.images[0]} className="card-img" alt="Full" />
//                 <span className="close-icon" onClick={() => setBottomSheetVisible(false)}>×</span>
//               </div>
//               <div className="card-text">
//                 <h2>{selectedPoint.name}</h2>
//                 <p style={{ margin: '4px 0px' }}>Vintage hotel · Jul 17–22</p>
//                 <p>{selectedPoint.description}</p>
//                 <p><span style={{ fontWeight: 'bold' }}>$100</span> for 5 nights</p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import './NearMe.css';
import mockPoints from '../data/mockPoints';
import FilterBottomSheet from '../components/PointsBottomSheet';
import CardSlider from '../components/CardSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

// ✅ Custom marker image import
import customMarkerIcon from '../assets/pointer.png';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 100px)',
};

export default function NearMe() {
  const [points] = useState(mockPoints);
  const [macro, setMacro] = useState(null);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [showCardSheet, setShowCardSheet] = useState(true);
  const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const filteredPoints = points.filter((p) => {
    const macroMatch = !macro || p.macro === macro;
    const tagMatch = tags.length === 0 || tags.some(tag => p.tags.includes(tag));
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return macroMatch && tagMatch && searchMatch;
  });

  const selectedPoint = points.find(p => p.id === activeMarker);

  useEffect(() => {
    if (mapLoaded && mapRef.current && filteredPoints.length > 0 && window.google?.maps?.LatLngBounds) {
      const bounds = new window.google.maps.LatLngBounds();
      filteredPoints.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
      mapRef.current.fitBounds(bounds, { padding: { top: 250, bottom: 50, left: 100, right: 100 } });
    }
  }, [filteredPoints, mapLoaded]);

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
          {activeFiltersCount > 0 && <span className="filter-badge">{activeFiltersCount}</span>}
        </div>
      </div>

      <CardSlider
        show={showCardSheet}
        points={filteredPoints}
        onCollapseChange={setIsSheetCollapsed}
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
          options={{
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          {filteredPoints.map((point) => (
            <Marker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            onClick={() => {
              setActiveMarker(point.id);
              setBottomSheetVisible(true);
            }}
            icon={mapLoaded && window.google ? {
              url: customMarkerIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            } : undefined}
          />
          
          ))}
        </GoogleMap>
      </LoadScript>

      <AnimatePresence>
        {bottomSheetVisible && selectedPoint && (
          <motion.div
            className="card-popup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="card-content">
              <div className="card-image-container">
                <img src={selectedPoint.images[0]} className="card-img" alt="Full" />
                <span className="close-icon" onClick={() => setBottomSheetVisible(false)}>×</span>
              </div>
              <div className="card-text">
                <h2>{selectedPoint.name}</h2>
                <p style={{ margin: '4px 0px' }}>Vintage hotel · Jul 17–22</p>
                <p>{selectedPoint.description}</p>
                <p><span style={{ fontWeight: 'bold' }}>$100</span> for 5 nights</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
