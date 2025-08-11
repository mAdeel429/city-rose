// import React, { useRef, useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Header from '../components/Header';
// import AttractionRow from '../components/AttractionRow';
// import BottomSheet from '../components/BottomSheet';
// import CityBottomSheet from '../components/CityBottomSheet';
// import SecondCard from '../components/SecondCard';
// import UpcomingEventCard from '../cards/UpcomingEventCard';
// import BottomBar from '../components/BottomBar';
// import { usePoints } from '../context/PointsContext';
// import './HomePage.css';

// export default function HomePage({
//   setIsCitySheetOpen,
//   isCitySheetOpen,
//   setSelectedCity,
//   selectedCity = {},
// }) {
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const scrollRef = useRef(null);
//   const [pullHeight, setPullHeight] = useState(0);
//   const [isPulling, setIsPulling] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const hasElasticTriggered = useRef(false);

//   const { isLoading, categorizedData } = usePoints();

//   useEffect(() => {
//     if (location.state?.showBottomSheet) {
//       setIsCitySheetOpen(true);
//     }
//   }, [location.state, setIsCitySheetOpen]);

//   useEffect(() => {
//     const scrollArea = scrollRef.current;
//     if (!scrollArea) return;

//     let startY = 0, startX = 0;
//     let pulling = false;
//     let isHorizontalSwipe = false;
//     let isDirectionLocked = false;
//     const directionThreshold = 10;
//     let lastScrollTop = scrollArea.scrollTop;

//     const headerElement = scrollArea.querySelector('.elastic-header');

//     const triggerElastic = () => {
//       if (hasElasticTriggered.current) return;
//       hasElasticTriggered.current = true;
//       setPullHeight(40);
//       setTimeout(() => {
//         setPullHeight(0);
//         hasElasticTriggered.current = false;
//       }, 300);
//     };

//     const onTouchStart = (e) => {
//       if (headerElement?.contains(e.target)) return;
//       if (scrollArea.scrollTop === 0) {
//         startY = e.touches[0].clientY;
//         startX = e.touches[0].clientX;
//         pulling = true;
//         isDirectionLocked = false;
//         isHorizontalSwipe = false;
//         setIsPulling(true);
//       }
//     };

//     const onTouchMove = (e) => {
//       if (!pulling) return;
//       const currentY = e.touches[0].clientY;
//       const currentX = e.touches[0].clientX;
//       const diffY = currentY - startY;
//       const diffX = currentX - startX;

//       if (!isDirectionLocked) {
//         if (Math.abs(diffX) > directionThreshold || Math.abs(diffY) > directionThreshold) {
//           isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
//           isDirectionLocked = true;
//         } else return;
//       }

//       if (isHorizontalSwipe) return;

//       if (diffY > 0) {
//         e.preventDefault();
//         const pull = Math.min(diffY, 100);
//         setPullHeight(pull);
//       }
//     };

//     const onTouchEnd = () => {
//       if (pullHeight > 10 && !isHorizontalSwipe) {
//         triggerElastic();
//       }
//       pulling = false;
//       isHorizontalSwipe = false;
//       isDirectionLocked = false;
//       setIsPulling(false);
//       setPullHeight(0);
//     };

//     const onScroll = () => {
//       const currentScrollTop = scrollArea.scrollTop;
//       if (lastScrollTop > 20 && currentScrollTop === 0 && !isPulling) {
//         triggerElastic();
//       }
//       lastScrollTop = currentScrollTop;
//     };

//     scrollArea.addEventListener('touchstart', onTouchStart, { passive: false });
//     scrollArea.addEventListener('touchmove', onTouchMove, { passive: false });
//     scrollArea.addEventListener('touchend', onTouchEnd);
//     scrollArea.addEventListener('scroll', onScroll);

//     return () => {
//       scrollArea.removeEventListener('touchstart', onTouchStart);
//       scrollArea.removeEventListener('touchmove', onTouchMove);
//       scrollArea.removeEventListener('touchend', onTouchEnd);
//       scrollArea.removeEventListener('scroll', onScroll);
//     };
//   }, [isPulling]);

//   const orderedCategories = [
//     'nearby',        // First
//     'mustSee',
//     'gelato',
//     'pizza',
//     'vegan',
//     'panini',
//     'michelin',
//     'perfumery',
//     'artisan',
//     'spa',
//     'drinks',
//     'clothing',
//     'fineDining',
//   ];


//   const titles = {
//     nearby: 'Nearby Attractions',
//     mustSee: 'Must See',
//     pizza: 'Pizza a Firenze',
//     gelato: 'Best Gelato',
//     vegan: 'Vegan Spots',
//     panini: 'Panini e Street Food',
//     michelin: 'Michelin Starred Restaurants',
//     perfumery: 'Profumerie',
//     artisan: 'Artigianato Fiorentino',
//     spa: 'Spa',
//     drinks: 'Aperitivo & Drinks',
//     clothing: 'Abbigliamento',
//     fineDining: 'Fine Dining',
//   };

//   const filterAttractions = (data) => {
//     if (!Array.isArray(data)) return [];

//     return data.filter((item) => {
//       const title =
//         item?.fullItem?.title ||
//         item?.title ||
//         item?.featured_pretty?.title;

//       if (!title) return true; // show even if no title
//       return title.toLowerCase().includes(searchQuery.toLowerCase());
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading attractions...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="full-page scrolling-container">
//       <div className="scroll-area" ref={scrollRef}>
//         <div
//           className="header-wrapper elastic-header"
//           style={{
//             height: `${220 + pullHeight}px`,
//             transition: isPulling ? 'none' : 'transform 0.2s cubic-bezier(0.33, 1.25, 0.68, 1)',
//           }}
//         >
//           <Header
//             setIsMenuOpen={setIsMenuOpen}
//             pullHeight={pullHeight}
//             isPulling={isPulling}
//             onLocationClick={() => setIsCitySheetOpen(true)}
//             selectedCity={selectedCity}
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//           />
//         </div>
//         <div className="card-container" style={{ paddingBottom: '110px' }}>
//           {orderedCategories.map((key) => {
//             const dataArray = categorizedData[key];
//             const filtered = filterAttractions(dataArray);
//             if (!filtered || filtered.length === 0) return null;

//             return (
//               <AttractionRow
//                 key={key}
//                 title={titles[key] || key}
//                 data={filtered}
//               />
//             );
//           })}
//           <SecondCard />
//           <UpcomingEventCard />
//         </div>
//       </div>
//       <BottomSheet show={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
//       <CityBottomSheet
//         show={isCitySheetOpen}
//         onClose={() => setIsCitySheetOpen(false)}
//         setSelectedCity={setSelectedCity}
//       />
//       <BottomBar visible={!isCitySheetOpen} />
//     </div>
//   );
// }




import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import AttractionRow from '../components/AttractionRow';
import BottomSheet from '../components/BottomSheet';
import CityBottomSheet from '../components/CityBottomSheet';
import SecondCard from '../components/SecondCard';
import UpcomingEventCard from '../cards/UpcomingEventCard';
import BottomBar from '../components/BottomBar';
import { usePoints } from '../context/PointsContext';
import { fetchCities } from '../data/fetchCities';
import './HomePage.css';

function calculateDistance(coord1, coord2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lon - coord1.lon);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000;
}

export default function HomePage({
  setIsCitySheetOpen,
  isCitySheetOpen,
  setSelectedCity,
  selectedCity = {},
}) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const [pullHeight, setPullHeight] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [closestCities, setClosestCities] = useState([]);
  const hasElasticTriggered = useRef(false);

  const { isLoading, categorizedData } = usePoints();

  useEffect(() => {
    const initCitySelection = async () => {
      const savedCity = localStorage.getItem('selected_city');

      if (savedCity) {
        setSelectedCity(JSON.parse(savedCity));
        return;
      }

      try {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            localStorage.setItem('user_lat', lat);
            localStorage.setItem('user_lon', lon);

            const cities = await fetchCities();
            const userCoords = { lat, lon };
            const sorted = cities
              .map((city) => ({
                ...city,
                distance: calculateDistance(userCoords, { lat: city.lat, lon: city.lng })
              }))
              .sort((a, b) => a.distance - b.distance);

            setClosestCities(sorted);
            setIsCitySheetOpen(true);
          },
          async () => {
            const cities = await fetchCities();
            const florence = cities.find((c) => c.name.toLowerCase() === 'florence') || cities[0];
            setSelectedCity(florence);
            localStorage.setItem('selected_city', JSON.stringify(florence));
          }
        );
      } catch (err) {
        console.error('Error getting location:', err);
      }
    };

    initCitySelection();
  }, [setSelectedCity, setIsCitySheetOpen]);

  useEffect(() => {
    const savedCity = localStorage.getItem('selected_city');
    if (!savedCity && location.state?.showBottomSheet) {
      setIsCitySheetOpen(true);
    }
  }, [location.state, setIsCitySheetOpen]);

  useEffect(() => {
    if (location.state?.showBottomSheet) {
      setIsCitySheetOpen(true);
    }
  }, [location.state, setIsCitySheetOpen]);

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (!scrollArea) return;

    let startY = 0, startX = 0;
    let pulling = false;
    let isHorizontalSwipe = false;
    let isDirectionLocked = false;
    const directionThreshold = 10;
    let lastScrollTop = scrollArea.scrollTop;

    const headerElement = scrollArea.querySelector('.elastic-header');

    const triggerElastic = () => {
      if (hasElasticTriggered.current) return;
      hasElasticTriggered.current = true;
      setPullHeight(40);
      setTimeout(() => {
        setPullHeight(0);
        hasElasticTriggered.current = false;
      }, 300);
    };

    const onTouchStart = (e) => {
      if (headerElement?.contains(e.target)) return;
      if (scrollArea.scrollTop === 0) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        pulling = true;
        isDirectionLocked = false;
        isHorizontalSwipe = false;
        setIsPulling(true);
      }
    };

    const onTouchMove = (e) => {
      if (!pulling) return;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const diffY = currentY - startY;
      const diffX = currentX - startX;

      if (!isDirectionLocked) {
        if (Math.abs(diffX) > directionThreshold || Math.abs(diffY) > directionThreshold) {
          isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
          isDirectionLocked = true;
        } else return;
      }

      if (isHorizontalSwipe) return;

      if (diffY > 0) {
        e.preventDefault();
        const pull = Math.min(diffY, 100);
        setPullHeight(pull);
      }
    };

    const onTouchEnd = () => {
      if (pullHeight > 10 && !isHorizontalSwipe) {
        triggerElastic();
      }
      pulling = false;
      isHorizontalSwipe = false;
      isDirectionLocked = false;
      setIsPulling(false);
      setPullHeight(0);
    };

    const onScroll = () => {
      const currentScrollTop = scrollArea.scrollTop;
      if (lastScrollTop > 20 && currentScrollTop === 0 && !isPulling) {
        triggerElastic();
      }
      lastScrollTop = currentScrollTop;
    };

    scrollArea.addEventListener('touchstart', onTouchStart, { passive: false });
    scrollArea.addEventListener('touchmove', onTouchMove, { passive: false });
    scrollArea.addEventListener('touchend', onTouchEnd);
    scrollArea.addEventListener('scroll', onScroll);

    return () => {
      scrollArea.removeEventListener('touchstart', onTouchStart);
      scrollArea.removeEventListener('touchmove', onTouchMove);
      scrollArea.removeEventListener('touchend', onTouchEnd);
      scrollArea.removeEventListener('scroll', onScroll);
    };
  }, [isPulling, pullHeight]);

  const orderedCategories = [
    'nearby', 'mustSee', 'gelato', 'pizza', 'vegan', 'panini', 'michelin',
    'perfumery', 'artisan', 'spa', 'drinks', 'clothing', 'fineDining',
  ];

  const titles = {
    nearby: 'Nearby Attractions',
    mustSee: 'Must See',
    pizza: 'Pizza a Firenze',
    gelato: 'Best Gelato',
    vegan: 'Vegan Spots',
    panini: 'Panini e Street Food',
    michelin: 'Michelin Starred Restaurants',
    perfumery: 'Profumerie',
    artisan: 'Artigianato Fiorentino',
    spa: 'Spa',
    drinks: 'Aperitivo & Drinks',
    clothing: 'Abbigliamento',
    fineDining: 'Fine Dining',
  };

  const filterAttractions = (data) => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) => {
      const title = item?.fullItem?.title || item?.title || item?.featured_pretty?.title;
      if (!title) return true;
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading attractions...</p>
      </div>
    );
  }
  return (
    <div className="full-page scrolling-container">
      <div className="scroll-area" ref={scrollRef}>
        <div
          className="header-wrapper elastic-header"
          style={{
            height: `${220 + pullHeight}px`,
            transition: isPulling ? 'none' : 'transform 0.2s cubic-bezier(0.33, 1.25, 0.68, 1)',
          }}
        >
          <Header
            setIsMenuOpen={setIsMenuOpen}
            pullHeight={pullHeight}
            isPulling={isPulling}
            onLocationClick={() => setIsCitySheetOpen(true)}
            selectedCity={selectedCity}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="card-container" style={{ paddingBottom: '110px'}}>
          {orderedCategories.map((key) => {
            const dataArray = categorizedData[key];
            const filtered = filterAttractions(dataArray);
            if (!filtered || filtered.length === 0) return null;
            return <AttractionRow key={key} title={titles[key] || key} data={filtered} />;
          })}
          <SecondCard />
          <UpcomingEventCard />
        </div>
      </div>

      <BottomSheet show={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CityBottomSheet
        show={isCitySheetOpen}
        onClose={() => setIsCitySheetOpen(false)}
        setSelectedCity={setSelectedCity}
        citiesData={closestCities.length ? closestCities : []}
      />
      <BottomBar visible={!isCitySheetOpen} />
    </div>
    );
}
