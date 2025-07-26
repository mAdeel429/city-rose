// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import styles from './MapCard.module.css'

// const containerStyle = {
//   width: '100%',
//   height: '200px',
//   borderRadius: '10px',
//   overflow: 'hidden',
// };

// export default function MapCard({ lat = 43.7780, lng = 11.2486 }) {
//   const handleClick = () => {
//     const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
//     window.open(mapsUrl, '_blank');
//   };

//   return (
//     <div className={styles.mapCard} onClick={handleClick}>
//       <div className={styles.mapLabel}>Map</div>
//       <LoadScript googleMapsApiKey="AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={{ lat, lng }}
//           zoom={15}
//           options={{
//             disableDefaultUI: true,
//           }}
//         >
//           <Marker position={{ lat, lng }} />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// }


import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import styles from './MapCard.module.css';

const containerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '10px',
  overflow: 'hidden',
};

export default function MapCard({ lat = 43.7780, lng = 11.2486 }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM', // same key used globally
  });

  const handleClick = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  if (!isLoaded || !window.google?.maps) {
    return <div style={{ height: '200px', textAlign: 'center', paddingTop: '80px' }}>Loading Map...</div>;
  }

  return (
    <div className={styles.mapCard} onClick={handleClick}>
      <div className={styles.mapLabel}>Map</div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={15}
        options={{ disableDefaultUI: true }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
}

