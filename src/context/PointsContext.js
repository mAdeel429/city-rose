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
//   const R = 6371;
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//     Math.cos(lat2 * (Math.PI / 180)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
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
//         const body = {
//           page: currentPage,
//           limit,
//           device_id: deviceId,
//           device_type: deviceType,
//           macro_id: macroId,
//         };

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
//       const rawPoints = await fetchPointsByCategory(macroId);

//       const mappedPoints = rawPoints.map((point) => {
//         let distanceKm = null;

//         if (!isNaN(userLat) && !isNaN(userLon) && point.lat && point.lng) {
//           distanceKm = calculateDistance(userLat, userLon, point.lat, point.lng);
//         }

//         const enrichedPoint = {
//           id: point.id,
//           title: point.name || 'Unknown',
//           distance: distanceKm ? `${distanceKm.toFixed(1)} KM` : 'N/A',
//           distanceValue: distanceKm ?? Infinity,
//           image: point.photos?.[0]?.url || null,
//           fullItem: point,
//         };

//         allNearbyCandidates.push(enrichedPoint);
//         return enrichedPoint;
//       });

//       result[key] = mappedPoints;
//     }

//     const sortedNearby = allNearbyCandidates
//       .filter((point) => point.distanceValue !== Infinity)
//       .sort((a, b) => a.distanceValue - b.distanceValue)
//       .slice(0, 10);

//     result['nearby'] = sortedNearby;

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
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Google reverse geocoding
const getShortAddressFromLatLng = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM`
    );
    const data = await res.json();

    if (data.status === "OK" && data.results.length > 0) {
      for (let result of data.results) {
        const components = result.address_components;
        const neighborhood = components.find(c => c.types.includes("neighborhood"));
        const sublocality = components.find(c => c.types.includes("sublocality"));
        const route = components.find(c => c.types.includes("route"));
        const city = components.find(c => c.types.includes("locality"));

        const name = neighborhood?.long_name ||
          sublocality?.long_name ||
          route?.long_name ||
          city?.long_name;

        if (name) return name;
      }
      return data.results[0].formatted_address.split(",")[0];
    } else {
      return "Unknown";
    }
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return "Unknown";
  }
};

export const PointsProvider = ({ children }) => {
  const [categorizedData, setCategorizedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchAllCategories = async () => {
    setIsLoading(true);
    const result = {};

    // Try to get user location
    let userLat = parseFloat(localStorage.getItem('user_lat'));
    let userLon = parseFloat(localStorage.getItem('user_lon'));

    let locationAllowed = true;

    // Fallback to Florence center if no location
    if (isNaN(userLat) || isNaN(userLon)) {
      userLat = 43.769871; // Florence center
      userLon = 11.255575;
      locationAllowed = false;
    }

    let allNearbyCandidates = [];

    for (const [key, macroId] of Object.entries(categoryMap)) {
      const rawPoints = await fetchPointsByCategory(macroId);

      const mappedPoints = await Promise.all(
        rawPoints.map(async (point) => {
          let distanceKm = null;
          if (point.lat && point.lng) {
            distanceKm = calculateDistance(userLat, userLon, point.lat, point.lng);
          }

          let label;
          if (locationAllowed) {
            // If location is allowed → show distance in all categories
            label = distanceKm ? `${distanceKm.toFixed(1)} KM` : "Unknown";
          } else {
            // If location not allowed → short address for categories
            label = await getShortAddressFromLatLng(point.lat, point.lng);
          }

          const enrichedPoint = {
            id: point.id,
            title: point.name || "Unknown",
            distance: label,
            distanceValue: distanceKm ?? Infinity,
            image: point.photos?.[0]?.url || null,
            fullItem: point,
          };

          allNearbyCandidates.push(enrichedPoint);
          return enrichedPoint;
        })
      );

      result[key] = mappedPoints;
    }

    // Create Nearby list sorted by actual distance
    const sortedNearby = allNearbyCandidates
      .filter(p => p.distanceValue !== Infinity)
      .sort((a, b) => a.distanceValue - b.distanceValue)
      .slice(0, 10)
      .map(p => ({
        ...p,
        distance: `${p.distanceValue.toFixed(1)} KM`
      }));

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
// };

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//     Math.cos(lat2 * (Math.PI / 180)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };


// const getShortAddressFromLatLng = async (lat, lng) => {
//   try {
//     const res = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAvJVIP2hU3dlLigoB7dmhWoutpwJ12wDM`
//     );
//     const data = await res.json();

//     if (data.status === "OK" && data.results.length > 0) {
//       let addressName = null;

//       for (let result of data.results) {
//         const components = result.address_components;

//         const neighborhood = components.find(c => c.types.includes("neighborhood"));
//         const sublocality = components.find(c => c.types.includes("sublocality"));
//         const route = components.find(c => c.types.includes("route"));
//         const city = components.find(c => c.types.includes("locality"));

//         addressName = neighborhood?.long_name ||
//                       sublocality?.long_name ||
//                       route?.long_name ||
//                       city?.long_name;

//         if (addressName) break;
//       }

//       return addressName || data.results[0].formatted_address.split(",")[0];
//     } else {
//       console.warn("Google Geocoding failed:", data.status);
//       return "Unknown";
//     }
//   } catch (error) {
//     console.error("Reverse geocoding error:", error);
//     return "Unknown";
//   }
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
//         const body = {
//           page: currentPage,
//           limit,
//           device_id: deviceId,
//           device_type: deviceType,
//           macro_id: macroId,
//         };

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
//       const rawPoints = await fetchPointsByCategory(macroId);

//       const mappedPoints = await Promise.all(
//         rawPoints.map(async (point) => {
//           let distanceKm = null;

//           if (!isNaN(userLat) && !isNaN(userLon) && point.lat && point.lng) {
//             distanceKm = calculateDistance(userLat, userLon, point.lat, point.lng);
//           }

//           let distanceLabel;
//           if (distanceKm) {
//             distanceLabel = `${distanceKm.toFixed(1)} KM`;
//           } else if (point.lat && point.lng) {
//             distanceLabel = await getShortAddressFromLatLng(point.lat, point.lng);
//           } else {
//             distanceLabel = "Unknown";
//           }

//           const enrichedPoint = {
//             id: point.id,
//             title: point.name || "Unknown",
//             distance: distanceLabel,
//             distanceValue: distanceKm ?? Infinity,
//             image: point.photos?.[0]?.url || null,
//             fullItem: point,
//           };

//           allNearbyCandidates.push(enrichedPoint);
//           return enrichedPoint;
//         })
//       );

//       result[key] = mappedPoints;
//     }

//     const sortedNearby = allNearbyCandidates
//       .filter((point) => point.distanceValue !== Infinity)
//       .sort((a, b) => a.distanceValue - b.distanceValue)
//       .slice(0, 10);

//     result['nearby'] = sortedNearby;

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
