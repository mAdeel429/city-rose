// import React, { useState } from 'react';
// import {
//   MapContainer,
//   TileLayer,
//   ZoomControl,
//   Marker,
//   Popup,
// } from 'react-leaflet';
// import { motion } from 'framer-motion';
// import 'leaflet/dist/leaflet.css';
// import './NearMe.css';
// import mockPoints from '../data/mockPoints';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

// import L from 'leaflet';
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// L.Marker.prototype.options.icon = L.icon({
//   iconUrl: markerIconPng,
//   shadowUrl: markerShadowPng,
//   iconAnchor: [12, 41],
// });

// export default function NearMe() {
//   const [points] = useState(mockPoints);
//   const [selectedType, setSelectedType] = useState("All");
//   const [showTypeDropdown, setShowTypeDropdown] = useState(false);

//   const filteredPoints =
//     selectedType === "All"
//       ? points
//       : points.filter((point) => point.type === selectedType);

//   const types = ["All", ...new Set(points.map((point) => point.type))];

//   return (
//     <div className="nearme-container">
//       {/* Top Buttons */}
//       <motion.div
//         className="top-buttons"
//         initial={{ y: -50 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <button className="top-btn">Points</button>
//         <button
//           className="top-btn"
//           onClick={() => setShowTypeDropdown((prev) => !prev)}
//         >
//           Type
//         </button>
//       </motion.div>

//       {showTypeDropdown && (
//         <div className="type-dropdown">
//           {types.map((type) => (
//             <button
//               key={type}
//               className={`dropdown-item ${selectedType === type ? 'active' : ''}`}
//               onClick={() => {
//                 setSelectedType(type);
//                 setShowTypeDropdown(false);
//               }}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       )}

//       <MapContainer
//         center={[28.6448, 77.216721]}
//         zoom={16}
//         scrollWheelZoom={true}
//         className="map"
//         zoomControl={false}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="© OpenStreetMap contributors"
//         />
//         <ZoomControl position="topright" />

//         {filteredPoints.map((point) => (
//           <Marker key={point.id} position={[point.lat, point.lng]}>
//             <Popup>
//               <div className="popup-card">
//                 <div style={{ position: 'relative' }}>
//                   <Swiper
//                     modules={[Navigation]}
//                     navigation={{
//                       nextEl: `.next-btn-${point.id}`,
//                       prevEl: `.prev-btn-${point.id}`,
//                     }}
//                     spaceBetween={10}
//                     slidesPerView={1}
//                   >
//                     {point.images.map((imgUrl, index) => (
//                       <SwiperSlide key={index}>
//                         <img
//                           src={imgUrl}
//                           alt={`${point.name}-${index}`}
//                           className="popup-img"
//                         />
//                       </SwiperSlide>
//                     ))}
//                   </Swiper>

//                   <button className={`swiper-btn prev-btn-${point.id}`}>‹</button>
//                   <button className={`swiper-btn next-btn-${point.id}`}>›</button>
//                 </div>

//                 <div className="popup-info">
//                   <strong className="popup-title">{point.name}</strong>
//                   <p className="popup-distance">{point.distance}</p>
//                   <p className="popup-desc">{point.description}</p>
//                   <p className="popup-hours">
//                     <strong>Hours:</strong> {point.openingHours}
//                   </p>
//                 </div>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }



import React, { useState } from 'react';
import {
    MapContainer,
    TileLayer,
    ZoomControl,
    Marker,
    Popup,
} from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import './NearMe.css';
import mockPoints from '../data/mockPoints';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import FilterBottomSheet from '../components/NearMeBottomSheet';
import PointsBottomSheet from '../components/PointsBottomSheet';


L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconAnchor: [12, 41],
});

export default function NearMe() {
    const [points] = useState(mockPoints);
    const [selectedType, setSelectedType] = useState("All");
    const [showFilterSheet, setShowFilterSheet] = useState(false);
    const [showPointsSheet, setShowPointsSheet] = useState(false);

    const filteredPoints =
        selectedType === "All"
            ? points
            : points.filter((point) => point.type === selectedType);

    const types = ["All", ...new Set(points.map((point) => point.type))];

    return (
        <div className="nearme-container">
            {/* Top Buttons */}
            <motion.div
                className="top-buttons"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button className="top-btn" onClick={() => setShowPointsSheet(true)}>Points</button>
                <button className="top-btn" onClick={() => setShowFilterSheet(true)}>
                    Type
                </button>
            </motion.div>

            {/* Filter Bottom Sheet */}
            <FilterBottomSheet
                show={showFilterSheet}
                onClose={() => setShowFilterSheet(false)}
                types={types}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <PointsBottomSheet
                show={showPointsSheet}
                onClose={() => setShowPointsSheet(false)}
                points={filteredPoints}
            />


            <MapContainer
                center={[28.6448, 77.216721]}
                zoom={16}
                scrollWheelZoom={true}
                className="map"
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                />
                <ZoomControl position="topright" />

                {filteredPoints.map((point) => (
                    <Marker key={point.id} position={[point.lat, point.lng]}>
                        <Popup>
                            <div className="popup-card">
                                <div style={{ position: 'relative' }}>
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation={{
                                            nextEl: `.next-btn-${point.id}`,
                                            prevEl: `.prev-btn-${point.id}`,
                                        }}
                                        spaceBetween={10}
                                        slidesPerView={1}
                                    >
                                        {point.images.map((imgUrl, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={imgUrl}
                                                    alt={`${point.name}-${index}`}
                                                    className="popup-img"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <button className={`swiper-btn prev-btn-${point.id}`}>‹</button>
                                    <button className={`swiper-btn next-btn-${point.id}`}>›</button>
                                </div>

                                <div className="popup-info">
                                    <strong className="popup-title">{point.name}</strong>
                                    <p className="popup-distance">{point.distance}</p>
                                    <p className="popup-desc">{point.description}</p>
                                    <p className="popup-hours">
                                        <strong>Hours:</strong> {point.openingHours}
                                    </p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
