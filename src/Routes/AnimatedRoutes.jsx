// import React, { lazy, Suspense } from 'react';
// import { useLocation, Routes, Route } from 'react-router-dom';
// import { useTransition, animated } from '@react-spring/web';

// const HomePage = lazy(() => import('../pages/HomePage'));
// const EditProfile = lazy(() => import('../pages/EditProfile'));

// export default function AnimatedRoutes() {
//   const location = useLocation();

//   const transitions = useTransition(location, {
//     from: { opacity: 0, transform: 'translateX(100%)' },
//     enter: { opacity: 1, transform: 'translateX(0%)' },
//     leave: { opacity: 0, transform: 'translateX(-100%)' },
//     config: { duration: 400 },
//   });

//   return (
//     <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
//       {transitions((style, loc) => (
//         <animated.div
//           style={{
//             ...style,
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             backgroundColor: '#fff',
//           }}
//         >
//           <Suspense fallback={<div style={{ height: '100vh', backgroundColor: '#fff' }} />}>
//             <Routes location={loc}>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/home" element={<HomePage />} />
//               <Route path="/editProfile" element={<EditProfile />} />
//             </Routes>
//           </Suspense>
//         </animated.div>
//       ))}
//     </div>
//   );
// }


import React, { lazy, Suspense } from 'react';
import { useLocation, useNavigationType, Routes, Route } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';

const HomePage = lazy(() => import('../pages/HomePage'));
const EditProfile = lazy(() => import('../pages/EditProfile'));
const Insights = lazy(() => import('../pages/Insights'));
const Settings = lazy(() => import('../pages/Settings'));
const CardDetailScreen = lazy(() => import('../components/CardDetailScreen'));
const NearMe = lazy(() => import('../pages/NearMe'));
const Offers = lazy(() => import('../pages/Offers'));
const AroundYou = lazy(() => import('../pages/AroundYou'));
const CategoryDetails = lazy(() => import('../pages/CategoryDetails'));

export default function AnimatedRoutes() {
  const location = useLocation();
  const navigationType = useNavigationType();

  const isBack = navigationType === 'POP';

  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: isBack ? 'translateX(-100%)' : 'translateX(100%)',
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)',
    },
    leave: {
      opacity: 0,
      transform: isBack ? 'translateX(100%)' : 'translateX(-100%)',
    },
    config: { duration: 300 },
  });

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', height: '100vh' }}>
      {transitions((style, loc) => (
        <animated.div
          key={loc.key}
          style={{
            ...style,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
          }}
        >
          <Suspense fallback={<div style={{ backgroundColor: '#fff', height: '100vh' }} />}>
            <Routes location={loc}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route
                path="/details"
                element={<CardDetailScreen key={location.key}/>}
              />
              <Route path="/near-me" element={<NearMe />} />
              <Route path="/category/:category" element={<CategoryDetails />} />
            </Routes>
          </Suspense>
        </animated.div>
      ))}
    </div>
  );
}
