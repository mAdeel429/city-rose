// import React, { lazy, Suspense } from 'react';
// import {
//   useLocation,
//   useNavigationType,
//   Routes,
//   Route,
//   Navigate,
// } from 'react-router-dom';
// import { useTransition, animated } from '@react-spring/web';

// // Lazy-loaded pages
// const HomePage = lazy(() => import('../pages/HomePage'));
// const EditProfile = lazy(() => import('../pages/EditProfile'));
// const Insights = lazy(() => import('../pages/Insights'));
// const Settings = lazy(() => import('../pages/Settings'));
// const CardDetailScreen = lazy(() => import('../components/CardDetailScreen'));
// const NearMe = lazy(() => import('../pages/NearMe'));
// const Offers = lazy(() => import('../pages/Offers'));
// const CategoryDetails = lazy(() => import('../pages/CategoryDetails'));
// const AddToFavorite = lazy(() => import('../pages/AddToFavorite'));

// export default function AnimatedRoutes({setBottomBarVisible}) {
//   const location = useLocation();
//   const navigationType = useNavigationType();
//   const isBack = navigationType === 'POP';

//   const transitions = useTransition(location, {
//     from: {
//       opacity: 0,
//       transform: isBack ? 'translateX(-100%)' : 'translateX(100%)',
//     },
//     enter: {
//       opacity: 1,
//       transform: 'translateX(0%)',
//     },
//     leave: {
//       opacity: 0,
//       transform: isBack ? 'translateX(100%)' : 'translateX(-100%)',
//     },
//     config: { duration: 300 },
//   });

//   return (
//     <div style={{ position: 'relative', height: '100vh' }}>
//       {transitions((style, loc) => (
//         <animated.div
//           key={loc.key}
//           style={{
//             ...style,
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'var(--background-color)',
//           }}
//         >
//           <Suspense fallback={<div style={{ backgroundColor: 'var(--background-color)', height: '100vh' }} />}>
//             <Routes location={loc}>
//               <Route path="/" element={<Navigate to="/near-me" replace />} />
//               <Route path="/home" element={<HomePage />} />
//               <Route path="/editProfile" element={<EditProfile />} />
//               <Route path="/insights" element={<Insights />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/offers" element={<Offers />} />
//               {/* <Route path="/near-me" element={<NearMe />} /> */}
//               <Route
//                 path="/near-me"
//                 element={<NearMe setBottomBarVisible={setBottomBarVisible} />}
//               />

//               <Route
//                 path="/details"
//                 element={<CardDetailScreen key={location.key} />}
//               />
//               <Route path="/category/:category" element={<CategoryDetails />} />
//               <Route path="/add-to-favorite" element={<AddToFavorite />} />
//             </Routes>
//           </Suspense>
//         </animated.div>
//       ))}
//     </div>
//   );
// }




import React, { lazy, Suspense, useEffect } from 'react';
import {
  useLocation,
  useNavigationType,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/HomePage'));
const EditProfile = lazy(() => import('../pages/EditProfile'));
const Insights = lazy(() => import('../pages/Insights'));
const Settings = lazy(() => import('../pages/Settings'));
const CardDetailScreen = lazy(() => import('../components/CardDetailScreen'));
const NearMe = lazy(() => import('../pages/NearMe'));
const Offers = lazy(() => import('../pages/Offers'));
const CategoryDetails = lazy(() => import('../pages/CategoryDetails'));
const AddToFavorite = lazy(() => import('../pages/AddToFavorite'));
const AuthLanding = lazy(() => import('../auth/AuthLanding'));
const Login = lazy(() => import('../auth/Login'));
const Register = lazy(() => import('../auth/Register'));


export default function AnimatedRoutes({ setBottomBarVisible }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isBack = navigationType === 'POP';
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token'); // Assume token in localStorage

  useEffect(() => {
    const authRoutes = ['/auth', '/login', '/register'];
    if (authRoutes.includes(location.pathname)) {
      setBottomBarVisible(false);
    } else {
      setBottomBarVisible(true);
    }
  }, [location.pathname, setBottomBarVisible]);

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
    <div style={{ position: 'relative', height: '100vh' }}>
      {transitions((style, loc) => (
        <animated.div
          key={loc.key}
          style={{
            ...style,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--background-color)',
          }}
        >
          <Suspense fallback={<div style={{ backgroundColor: 'var(--background-color)', height: '100vh' }} />}>
            <Routes location={loc}>
              {/* Root redirect */}
              <Route path="/" element={<Navigate to={isLoggedIn ? '/near-me' : '/auth'} replace />} />

              {/* Auth route */}
              <Route path="/auth" element={<AuthLanding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              {isLoggedIn && (
                <>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/editProfile" element={<EditProfile />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/near-me" element={<NearMe setBottomBarVisible={setBottomBarVisible} />} />
                  <Route path="/details" element={<CardDetailScreen key={location.key} />} />
                  <Route path="/category/:category" element={<CategoryDetails />} />
                  <Route path="/add-to-favorite" element={<AddToFavorite />} />
                </>
              )}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </animated.div>
      ))}
    </div>
  );
}
