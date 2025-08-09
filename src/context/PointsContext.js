// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axiosInstance from '../data/axiosInstance';

// const PointsContext = createContext();

// const categoryMap = {
//   mustSee: 33,
//   fineDining: 42,
//   drinks: 44,
//   gelato: 36,
//   vegan: 31,
//   spa: 43,
//   artisan: 41,
//   perfumery: 40,
//   panini: 39,
//   michelin: 35,
//   Abbigliamento: 45,
//   pizza: 37,
// };

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//     Math.cos(lat2 * (Math.PI / 180)) *
//     Math.sin(dLon / 2) *
//     Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export const PointsProvider = ({ children }) => {
//   const [categorizedData, setCategorizedData] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchPointsByCategory = async (macroId, userLat, userLon) => {
//     try {
//       const deviceId = localStorage.getItem('device_id');
//       const deviceType = 'web';

//       if (!deviceId) {
//         console.warn('⚠️ Device ID not found in localStorage');
//         return [];
//       }

//       let currentPage = 1;
//       const limit = 25;
//       let allPoints = [];
//       let keepFetching = true;

//       while (keepFetching) {
//         const body = {
//           page: currentPage,
//           limit,
//           device_id: deviceId,
//           device_type: deviceType,
//           macro_id: macroId,
//         };

//         if (!isNaN(userLat) && !isNaN(userLon)) {
//           body.geo = {
//             lat: userLat,
//             lng: userLon,
//             radius: 1500, // meters = 1.5 KM
//           };
//         }

//         const res = await axiosInstance.post('/point/list', body);
//         const data = res.data.data || [];
//         allPoints = [...allPoints, ...data];

//         if (data.length < limit) {
//           keepFetching = false;
//         } else {
//           currentPage++;
//         }
//       }

//       return allPoints;
//     } catch (error) {
//       console.error(`❌ Error fetching points for macro_id ${macroId}:`, error?.response?.data || error.message || error);
//       return [];
//     }
//   };
//   const fetchAllCategories = async () => {
//     setIsLoading(true);
//     const result = {};
  
//     const userLat = parseFloat(localStorage.getItem('user_lat'));
//     const userLon = parseFloat(localStorage.getItem('user_lon'));

//     let allNearbyCandidates = [];
  
//     for (const [key, macroId] of Object.entries(categoryMap)) {
//       const rawPoints = await fetchPointsByCategory(macroId, userLat, userLon);
  
//       const mappedPoints = rawPoints.map((point) => {
//         let distanceKm = null;
  
//         if (!isNaN(userLat) && !isNaN(userLon) && point.lat && point.lng) {
//           distanceKm = calculateDistance(userLat, userLon, point.lat, point.lng);
//         }
  
//         const enrichedPoint = {
//           id: point.id,
//           title: point.name || 'Unknown',
//           distance: distanceKm ? `${distanceKm.toFixed(1)} KM` : 'N/A',
//           distanceValue: distanceKm ?? Infinity, // for sorting
//           image: point.photos?.[0]?.url || null,
//           fullItem: point,
//         };
  
//         // Push into a pool of all points to pick nearest from
//         allNearbyCandidates.push(enrichedPoint);
  
//         return enrichedPoint;
//       });
  
//       result[key] = mappedPoints;
//     }
  
//     // ✅ Sort all points by distance (nearest first)
//     const sortedNearby = allNearbyCandidates
//       .filter((point) => point.distanceValue !== Infinity)
//       .sort((a, b) => a.distanceValue - b.distanceValue)
//       .slice(0, 10); // show only top 10 closest points
  
//     // ✅ Set nearest ones under "nearby"
//     result['nearby'] = sortedNearby;
  
//     console.log('✅ categorizedData:', result);
//     setCategorizedData(result);
//     setIsLoading(false);
//   };
  

//   useEffect(() => {
//     fetchAllCategories();
//   }, []);

//   return (
//     <PointsContext.Provider value={{ categorizedData, isLoading }}>
//       {children}
//     </PointsContext.Provider>
//   );
// };

// export const usePoints = () => useContext(PointsContext);



import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../data/axiosInstance';

const PointsContext = createContext();

const categoryMap = {
  mustSee: 33,
  fineDining: 42,
  drinks: 44,
  gelato: 36,
  vegan: 31,
  spa: 43,
  artisan: 41,
  perfumery: 40,
  panini: 39,
  michelin: 35,
  Abbigliamento: 45,
  pizza: 37,
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const PointsProvider = ({ children }) => {
  const [categorizedData, setCategorizedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 🟡 Fetch points for a given category — no geo filter now
  const fetchPointsByCategory = async (macroId) => {
    try {
      const deviceId = localStorage.getItem('device_id');
      const deviceType = 'web';

      if (!deviceId) {
        console.warn('⚠️ Device ID not found in localStorage');
        return [];
      }

      let currentPage = 1;
      const limit = 25;
      let allPoints = [];
      let keepFetching = true;

      while (keepFetching) {
        const body = {
          page: currentPage,
          limit,
          device_id: deviceId,
          device_type: deviceType,
          macro_id: macroId,
          // ❌ No geo filter here anymore
        };

        const res = await axiosInstance.post('/point/list', body);
        const data = res.data.data || [];
        allPoints = [...allPoints, ...data];

        if (data.length < limit) {
          keepFetching = false;
        } else {
          currentPage++;
        }
      }

      return allPoints;
    } catch (error) {
      console.error(`❌ Error fetching points for macro_id ${macroId}:`, error?.response?.data || error.message || error);
      return [];
    }
  };

  // 🔁 Fetch all categories & build nearby list based on distance
  const fetchAllCategories = async () => {
    setIsLoading(true);
    const result = {};

    const userLat = parseFloat(localStorage.getItem('user_lat'));
    const userLon = parseFloat(localStorage.getItem('user_lon'));
    let allNearbyCandidates = [];

    for (const [key, macroId] of Object.entries(categoryMap)) {
      const rawPoints = await fetchPointsByCategory(macroId);

      const mappedPoints = rawPoints.map((point) => {
        let distanceKm = null;

        if (!isNaN(userLat) && !isNaN(userLon) && point.lat && point.lng) {
          distanceKm = calculateDistance(userLat, userLon, point.lat, point.lng);
        }

        const enrichedPoint = {
          id: point.id,
          title: point.name || 'Unknown',
          distance: distanceKm ? `${distanceKm.toFixed(1)} KM` : 'N/A',
          distanceValue: distanceKm ?? Infinity, // for sorting
          image: point.photos?.[0]?.url || null,
          fullItem: point,
        };

        allNearbyCandidates.push(enrichedPoint);
        return enrichedPoint;
      });

      result[key] = mappedPoints;
    }

    const sortedNearby = allNearbyCandidates
      .filter((point) => point.distanceValue !== Infinity)
      .sort((a, b) => a.distanceValue - b.distanceValue)
      .slice(0, 10);

    result['nearby'] = sortedNearby;

    setCategorizedData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <PointsContext.Provider value={{ categorizedData, isLoading }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);



// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axiosInstance from '../data/axiosInstance';

// const PointsContext = createContext();

// const categoryMap = {
//   mustSee: 33,
//   fineDining: 42,
//   drinks: 44,
//   gelato: 36,
//   vegan: 31,
//   spa: 43,
//   artisan: 41,
//   perfumery: 40,
//   panini: 39,
//   michelin: 35,
//   Abbigliamento: 45,
//   pizza: 37,
//   // nearby: ,
// };


// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//     Math.cos(lat2 * (Math.PI / 180)) *
//     Math.sin(dLon / 2) *
//     Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export const PointsProvider = ({ children }) => {
//   const [categorizedData, setCategorizedData] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchPointsByCategory = async (macroId) => {
//     try {
//       const deviceId = localStorage.getItem('device_id');
//       const deviceType = 'web';

//       if (!deviceId) {
//         console.warn('⚠️ Device ID not found in localStorage');
//         return [];
//       }

//       let currentPage = 1;
//       const limit = 25;
//       let allPoints = [];
//       let keepFetching = true;

//       while (keepFetching) {
//         const res = await axiosInstance.post('/point/list', {
//           page: currentPage,
//           limit,
//           device_id: deviceId,
//           device_type: deviceType,
//           macro_id: macroId,
//         });

//         const data = res.data.data || [];
//         allPoints = [...allPoints, ...data];

//         if (data.length < limit) {
//           keepFetching = false;
//         } else {
//           currentPage++;
//         }
//       }

//       return allPoints;
//     } catch (error) {
//       console.error(`❌ Error fetching points for macro_id ${macroId}:`, error?.response?.data || error.message || error);
//       return [];
//     }
//   };

//   const fetchAllCategories = async () => {
//     setIsLoading(true);
//     const result = {};

//     // ✅ Get user location
//     const userLat = parseFloat(localStorage.getItem('user_lat'));
//     const userLon = parseFloat(localStorage.getItem('user_lon'));

//     for (const [key, macroId] of Object.entries(categoryMap)) {
//       const rawPoints = await fetchPointsByCategory(macroId);

//       // ✅ Map and enrich each point with distance, title, image
//       const mappedPoints = rawPoints.map((point) => {
//         let distanceKm = null;

//         if (!isNaN(userLat) && !isNaN(userLon) && point.lat && point.lng) {
//           distanceKm = calculateDistance(userLat, userLon, point.lat, point.lng);
//         }

//         return {
//           id: point.id,
//           title: point.name || 'Unknown',
//           distance: distanceKm ? `${distanceKm.toFixed(1)} KM` : 'N/A',
//           image: point.photos?.[0]?.url || null,
//           fullItem: point,
//         };
//       });

//       result[key] = mappedPoints;
//     }

//     console.log('✅ categorizedData:', result);
//     setCategorizedData(result);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchAllCategories();
//   }, []);

//   return (
//     <PointsContext.Provider value={{ categorizedData, isLoading }}>
//       {children}
//     </PointsContext.Provider>
//   );
// };

// export const usePoints = () => useContext(PointsContext);


