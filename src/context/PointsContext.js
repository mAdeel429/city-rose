// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { fetchPoints } from '../data/points';

// const PointsContext = createContext();

// export function PointsProvider({ children }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [pointsData, setPointsData] = useState([]);
//   const [mustSeeData, setMustSeeData] = useState([]);
//   const [michelinData, setMichelinData] = useState([]);
//   const [gelatoData, setGelatoData] = useState([]);
//   const [veganData, setVeganData] = useState([]);

//   useEffect(() => {
//     const getPoints = async () => {
//       try {
//         const allData = await fetchPoints();
//         const calculateDistance = (lat1, lon1, lat2, lon2) => {
//           const R = 6371;
//           const dLat = (lat2 - lat1) * (Math.PI / 180);
//           const dLon = (lon2 - lon1) * (Math.PI / 180);
//           const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat1 * (Math.PI / 180)) *
//               Math.cos(lat2 * (Math.PI / 180)) *
//               Math.sin(dLon / 2) *
//               Math.sin(dLon / 2);
//           const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//           return R * c;
//         };

//         const mapPoints = (points) => {
//           const userLat = parseFloat(localStorage.getItem('user_lat'));
//           const userLon = parseFloat(localStorage.getItem('user_lon'));

//           return points.map((point) => {
//             let distanceKm = null;
//             if (!isNaN(userLat) && !isNaN(userLon) && point.lat && point.lng) {
//               distanceKm = calculateDistance(userLat, userLon, point.lat, point.lng);
//             }

//             return {
//               id: point.id,
//               title: point.name || 'Unknown',
//               category: point.macros?.[0]?.name || 'Other',
//               distance: distanceKm ? `${distanceKm.toFixed(1)} KM` : 'N/A',
//               image: point.photos?.[0]?.url || null,
//               fullItem: point,
//             };
//           });
//         };

//         setPointsData(mapPoints(allData.nearby));
//         setMustSeeData(mapPoints(allData.mustSee));
//         setMichelinData(mapPoints(allData.michelin));
//         setGelatoData(mapPoints(allData.gelato));
//         setVeganData(mapPoints(allData.vegan));
//         setIsLoading(false);
//       } catch (err) {
//         console.error('Failed to load points:', err);
//       }
//     };

//     getPoints();
//   }, []);

//   return (
//     <PointsContext.Provider
//       value={{
//         isLoading,
//         pointsData,
//         mustSeeData,
//         michelinData,
//         gelatoData,
//         veganData,
//       }}
//     >
//       {children}
//     </PointsContext.Provider>
//   );
// }

// export function usePoints() {
//   return useContext(PointsContext);
// }




import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPoints } from '../data/points';

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categorizedData, setCategorizedData] = useState({});

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

        const userLat = parseFloat(localStorage.getItem('user_lat'));
        const userLon = parseFloat(localStorage.getItem('user_lon'));

        const mapPoint = (point) => {
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
        };

        const mapped = allData.map(mapPoint);

        const getCategory = (item, keywords) => {
          const text = `${item?.title || ''} ${item?.fullItem?.description || ''}`.toLowerCase();
          return keywords.some((k) => text.includes(k));
        };

        const usedIds = new Set();

        const pick = (condition, max = 10) => {
          const matched = mapped.filter(
            (item) => condition(item) && !usedIds.has(item.id)
          );
          const result = matched.slice(0, max);
          result.forEach((item) => usedIds.add(item.id));
          return result;
        };

        const data = {
          nearby: mapped.slice(0, 12),

          mustSee: pick((item) =>
            getCategory(item, [
              'monumento', 'attrazione', 'cattedrale', 'duomo', 'museo', 'galleria',
              'vista panoramica', 'landmark', 'da vedere', 'imperdibile'
            ]) &&
            !getCategory(item, ['badiani'])
          ),

          gelato: pick((item) =>
            getCategory(item, ['gelato', 'gelateria', 'crema', 'badiani', 'buontalenti', 'artigianale'])
          ),

          pizza: pick((item) =>
            getCategory(item, ['pizza', 'pizzeria', 'margherita', 'napoletana', 'forno a legna'])
          ),

          vegan: pick((item) => getCategory(item, ['vegan', 'plant-based', 'vegetarian'])),

          panini: pick((item) =>
            getCategory(item, ['panini', 'panino', 'street food', 'tramezzino', 'focaccia', 'sandwich'])
          ),
        
          perfumery: pick((item) =>
            getCategory(item, ['profumeria', 'fragranza', 'profumo', 'essenza', 'colonia'])
          ),
        
          artisan: pick((item) =>
            getCategory(item, [
              'artigianato', 'artigiano', 'cuoio', 'ceramica', 'fatto a mano',
              'laboratorio', 'scultura', 'oro', 'artigianale', 'botteg'
            ]) && !getCategory(item, ['ristorante', 'ditta', 'strega', 'bentoro', 'ghinelli', 'sorbetteria','pizzeria', 'gelato', 'food', 'drink'])
          ),
            spa: pick((item) =>
            getCategory(item, ['spa', 'wellness', 'massage', 'thermal bath', 'relaxation', 'hammam', 'facial']) &&
            !getCategory(item, ['restaurant', 'club', 'tour', 'firenze', 'shopping', 'dining', 'pizza', 'food', 'hotel', 'bar', 'drink'])
          ),  
        
          drinks: pick((item) =>
            getCategory(item, ['aperitivo', 'cocktail', 'bevande', 'vino', 'spritz', 'bar']) &&
            !getCategory(item, ['barroccino'])
          ),
        
          michelin: pick((item) =>
            getCategory(item, ['michelin', 'gourmet', 'stellato', 'alta cucina'])
          ),
        
          clothing: pick((item) =>
            getCategory(item, ['abbigliamento', 'moda', 'boutique', 'vestiti', 'shopping', 'ginori', 'pinti', 'sartoria']) &&
            !getCategory(item, ['gelato', 'ristorante', 'cibo'])
          ),
        
          fineDining: pick((item) =>
            getCategory(item, ['ristorante elegante', 'alta cucina', 'fine dining', 'cena esclusiva'])
          ),
        };
        

        setCategorizedData(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load points:', err);
      }
    };

    getPoints();
  }, []);

  return (
    <PointsContext.Provider value={{ isLoading, categorizedData }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  return useContext(PointsContext);
}
