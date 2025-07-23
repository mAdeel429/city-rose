import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './MapCard.css';

const containerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '10px',
  overflow: 'hidden',
};

export default function MapCard({ lat = 43.7780, lng = 11.2486 }) {
  const handleClick = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="map-card" onClick={handleClick}>
      <div className="map-label">Map</div>
      <LoadScript googleMapsApiKey="AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={15}
          options={{
            disableDefaultUI: true,
          }}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
