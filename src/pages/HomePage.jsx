// import React, { useRef, useEffect, useState } from 'react';
// import Header from '../components/Header';
// import AttractionRow from '../components/AttractionRow';
// import BottomSheet from '../components/BottomSheet';
// import './HomePage.css';
// import SecondCard from '../components/SecondCard'
// import UpcomingEventCard from '../cards/UpcomingEventCard'
// import { fetchPoints } from '../data/points';

// export default function HomePage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const scrollRef = useRef(null);
//   const [pullHeight, setPullHeight] = useState(0);
//   const [isPulling, setIsPulling] = useState(false);
//   const maxElasticHeight = 100;
//   const hasElasticTriggered = useRef(false);


//   useEffect(() => {
//     const getPoints = async () => {
//       const points = await fetchPoints();
//       console.log('📍 Points data:', points);
//     };

//     getPoints();
//   }, []);

//   useEffect(() => {
//     const scrollArea = scrollRef.current;
//     let startY = 0;
//     let startX = 0;
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
//       if (headerElement && headerElement.contains(e.target)) return;

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
//         } else {
//           return;
//         }
//       }

//       if (isHorizontalSwipe) return;

//       if (diffY > 0) {
//         e.preventDefault();
//         const pull = Math.min(diffY, maxElasticHeight);
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

//   // 🧠 DATA SECTIONS

//   const mustSeeData = [
//     {
//       id: 1,
//       image: 'http://bonjourvenise.fr/wp-content/uploads/2023/05/gallerie-dellacademia-venise.jpg',
//       title: "Galleria dell'Accademia",
//       category: 'Culture & Sights',
//       distance: '1720.2',
//     },
//     {
//       id: 2,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Q95W3CoMwgGaKgSfA7hlo6-sbLIK_rWZtQ&s',
//       title: 'Cappelle Medicee',
//       category: 'Culture & Sights',
//       distance: '1720.7',
//     },
//     {
//       id: 3,
//       image: 'https://cdn.getyourguide.com/img/tour/299e73076c52bf898781974107678c9918132fde515df2972cf94002a1016b7f.jpeg/68.jpg',
//       title: 'Duomo di Santa Maria del Fiore',
//       category: 'Culture & Sights',
//       distance: '1690.5',
//     },
//     {
//       id: 4,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntCxMq8AD4M9-JD3wzRivTHDdq5qCKZxqSA&s',
//       title: 'Battistero di San Giovanni',
//       category: 'Culture & Sights',
//       distance: '1718.8',
//     },
//     {
//       id: 5,
//       image: 'https://www.arte.it/foto/600x450/e0/16250-Facciata_santa_maria_novella.jpg',
//       title: 'Basilica di Santa Maria Novella',
//       category: 'Culture & Sights',
//       distance: '1720.1',
//     },
//   ];

//   const attractionsData = [
//     {
//       id: 1,
//       image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/49/07/0a/asmana-welness-world.jpg?w=800&h=500&s=1',
//       title: 'Asmana',
//       category: 'Activity & Wellness',
//       distance: '1718.8',
//     },
//     {
//       id: 2,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s',
//       title: 'Ice Cream Cafe',
//       category: 'Food & Drink',
//       distance: '1720.1',
//     },
//     {
//       id: 3,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZeMh9HcYm16vhAkzaonM__vr2cJnJYX4DJw&s',
//       title: 'Museum Tour',
//       category: 'Culture',
//       distance: '1690.5',
//     },
//   ];

//   const michelinData = [
//     {
//       id: 1,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNmzAWAPAB-LyasY54qxcu7YYj3ZDOXfdH8Q&s',
//       title: 'Il Palagio (Four Seasons Hotel Firenze)',
//       category: 'Food & Drink',
//       distance: '1719.9',
//     },
//     {
//       id: 2,
//       image: 'https://i0.wp.com/eatweekguide.com/wp-content/uploads/2022/11/eatweekguide-1.jpg?fit=1600%2C1067&ssl=1',
//       title: 'Gucci Osteria da Massimo Bottura',
//       category: 'Food & Drink',
//       distance: '1720.2',
//     },
//     {
//       id: 3,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgoam2cakTu3yu-Br1rw0uH6rOjZwUU6EL3A&s',
//       title: 'Enoteca Pinchiorri',
//       category: 'Food & Drink',
//       distance: '1720.6',
//     },
//   ];

//   const gelatoData = [
//     {
//       id: 1,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ882_VNTWI0COo3OP97y44UyW892P4z_qHsg&s',
//       title: 'Gelateria dei Neri',
//       category: 'Food & Drink',
//       distance: '1720.3',
//     },
//     {
//       id: 2,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaSALanQJ_kVb0LUbmxxws8MOj8JfH4Ep0pA&s',
//       title: 'Vivoli',
//       category: 'Food & Drink',
//       distance: '1720.0',
//     },
//     {
//       id: 3,
//       image: 'http://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/aa/59/e8/gelateria-la-carraia.jpg?w=900&h=500&s=1',
//       title: 'Gelateria La Carraia',
//       category: 'Food & Drink',
//       distance: '1719.8',
//     },
//   ];

//   const veganData = [
//     {
//       id: 1,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfH_kmiyroTpqHI5_fFcHbSvdQfKgXKKHndw&s',
//       title: 'Universo Vegano',
//       category: 'Food & Drink',
//       distance: '1719.5',
//     },
//     {
//       id: 2,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZgKfO-UC2QHzJttGbD_0eD80wZdqJ4DXOgg&s',
//       title: 'Brac Bookstore & Cafe',
//       category: 'Vegan Friendly',
//       distance: '1720.0',
//     },
//     {
//       id: 3,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnT8TfV1bB7lCNOyeoxt5ECFKFkl-SwF81NQ&s',
//       title: 'Il Vegetariano',
//       category: 'Vegan & Vegetarian',
//       distance: '1720.4',
//     },
//   ];


//   return (
//     <div className="full-page scrolling-container">
//       <div className="scroll-area" ref={scrollRef}>
//         <div
//           className="header-wrapper elastic-header"
//           style={{
//             height: `${220 + pullHeight}px`,
//             transition: isPulling ? 'none' : 'height 0.4s cubic-bezier(0.25, 1.5, 0.5, 1)',
//           }}
//         >
//           <Header
//             setIsMenuOpen={setIsMenuOpen}
//             pullHeight={pullHeight}
//             isPulling={isPulling}
//           />
//         </div>

//         <div className="card-container" style={{ paddingBottom: '110px' }}>
//           <AttractionRow title="Popular Attractions" data={attractionsData} />
//           <SecondCard />
//           <AttractionRow title="Must-see" data={mustSeeData} />
//           <AttractionRow title="Michelin Starred Restaurants" data={michelinData} />
//           <AttractionRow title="Best Gelato in Town" data={gelatoData} />
//           <AttractionRow title="Vegan Spots" data={veganData} />
//           <UpcomingEventCard />
//         </div>
//       </div>

//       <BottomSheet show={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
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
import './HomePage.css';

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
  const hasElasticTriggered = useRef(false);

  const { isLoading, categorizedData } = usePoints();

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
  }, [isPulling]);

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
    return data.filter((item) => {
      const title =
        item?.fullItem?.title ||
        item?.title ||
        item?.featured_pretty?.title ||
        '';
      const hideHome = item?.fullItem?.hide_home ?? true;

      return (
        hideHome &&
        title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  // if (isLoading) {
  //   return <div className="loading">Loading attractions...</div>;
  // }

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

        <div className="card-container" style={{ paddingBottom: '110px' }}>
          {Object.entries(categorizedData).map(([key, dataArray]) => {
            const filtered = filterAttractions(dataArray);
            if (filtered.length === 0) return null;

            return (
              <AttractionRow
                key={key}
                title={titles[key] || key}
                data={filtered}
              />
            );
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
      />
      <BottomBar visible={!isCitySheetOpen} />
    </div>
  );
}




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

//   const {
//     pointsData,
//     mustSeeData,
//     michelinData,
//     gelatoData,
//     veganData,
//     isLoading,
//   } = usePoints();

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

//   // 🔍 Filter logic based on search
//   const filterAttractions = (data) => {
//     return data.filter((item) => {
//       const title =
//         item?.fullItem?.title ||
//         item?.title ||
//         item?.featured_pretty?.title ||
//         '';
//       const hideHome = item?.fullItem?.hide_home ?? true;

//       return (
//         hideHome &&
//         title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });
//   };

//   const filteredNearby = filterAttractions(pointsData);
//   const filteredMustSee = filterAttractions(mustSeeData);
//   const filteredMichelin = filterAttractions(michelinData);
//   const filteredGelato = filterAttractions(gelatoData);
//   const filteredVegan = filterAttractions(veganData);

//   if (isLoading) {
//     return <div className="loading">Loading attractions...</div>;
//   }

//   return (
//     <div className="full-page scrolling-container">
//       <div className="scroll-area" ref={scrollRef}>
//         <div
//            className="header-wrapper elastic-header"
//            style={{
//              height: `${220 + pullHeight}px`,
//              transition: isPulling ? 'none' : 'transform 0.2s cubic-bezier(0.33, 1.25, 0.68, 1)',
//            }}
//          >
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
//           {filteredNearby.length > 0 ? (
//             <AttractionRow title="Nearby Attractions" data={filteredNearby} />
//           ) : (
//             <div className="no-results">
//               No attractions found for "{searchQuery}"
//             </div>
//           )}

//           {filteredMustSee.length > 0 && (
//             <AttractionRow title="Must-see" data={filteredMustSee} />
//           )}
//           {filteredMichelin.length > 0 && (
//             <AttractionRow
//               title="Michelin Starred Restaurants"
//               data={filteredMichelin}
//             />
//           )}
//           {filteredGelato.length > 0 && (
//             <AttractionRow title="Best Gelato in Town" data={filteredGelato} />
//           )}
//           {filteredVegan.length > 0 && (
//             <AttractionRow title="Vegan Spots" data={filteredVegan} />
//           )}

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
