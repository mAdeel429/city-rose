import React from 'react';
import AnimatedLayout from './Routes/AnimatedRoutes';
import BottomBar from './components/BottomBar';
import './App.css';

export default function App() {
  return (
    <>
      <AnimatedLayout />
      <BottomBar />
    </>
  );
}




// import React from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import './App.css';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 24.8607,  // Karachi coordinates
//   lng: 67.0011,
// };

// export default function App() {
//   return (
//     <div>
//       <h2>My Google Map</h2>
//       <LoadScript googleMapsApiKey={'AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM'}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={12}
//         >
//           {/* You can add <Marker /> here */}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// }


