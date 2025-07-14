// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import BottomBar from './components/BottomBar';
// import HomePage from './pages/HomePage';
// import EditProfile from './pages/EditProfile'
// import './App.css'

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/explore" element={<HomePage />} />
//         <Route path="/favorites" element={<HomePage />} />
//         <Route path="/profile" element={<HomePage />} />
//         <Route path="/editProfile" element={<EditProfile />} />
//       </Routes>
//       <BottomBar />
//     </>
//   );
// };

// export default App;


// import React from 'react';
// import BottomBar from './components/BottomBar';
// import AnimatedRoutes from './Routes/AnimatedRoutes';
// import './App.css';

// export default function App() {
//   return (
//     <>
//       <AnimatedRoutes />
//       <BottomBar />
//     </>
//   );
// }


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


