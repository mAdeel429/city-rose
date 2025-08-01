import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPoints } from '../data/points';

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pointsData, setPointsData] = useState([]);
  const [mustSeeData, setMustSeeData] = useState([]);
  const [michelinData, setMichelinData] = useState([]);
  const [gelatoData, setGelatoData] = useState([]);
  const [veganData, setVeganData] = useState([]);

  useEffect(() => {
    const getPoints = async () => {
      try {
        const allData = await fetchPoints();
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
          const R = 6371;
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
              Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c;
        };

        const mapPoints = (points) => {
          const userLat = parseFloat(localStorage.getItem('user_lat'));
          const userLon = parseFloat(localStorage.getItem('user_lon'));

          return points.map((point) => {
            let distanceKm = null;
            if (!isNaN(userLat) && !isNaN(userLon) && point.lat && point.lng) {
              distanceKm = calculateDistance(userLat, userLon, point.lat, point.lng);
            }

            return {
              id: point.id,
              title: point.name || 'Unknown',
              category: point.macros?.[0]?.name || 'Other',
              distance: distanceKm ? `${distanceKm.toFixed(1)} KM` : 'N/A',
              image: point.photos?.[0]?.url || null,
              fullItem: point,
            };
          });
        };

        setPointsData(mapPoints(allData.nearby));
        setMustSeeData(mapPoints(allData.mustSee));
        setMichelinData(mapPoints(allData.michelin));
        setGelatoData(mapPoints(allData.gelato));
        setVeganData(mapPoints(allData.vegan));
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load points:', err);
      }
    };

    getPoints();
  }, []);

  return (
    <PointsContext.Provider
      value={{
        isLoading,
        pointsData,
        mustSeeData,
        michelinData,
        gelatoData,
        veganData,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  return useContext(PointsContext);
}
