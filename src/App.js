// import React from 'react';
// import AnimatedLayout from './Routes/AnimatedRoutes';
// import BottomBar from './components/BottomBar';
// import { FavoritesProvider } from './data/FavoritesContext';
// import './App.css';

// export default function App() {
//   return (
//     <>
//     <FavoritesProvider>
//       <AnimatedLayout />
//       <BottomBar />
//       </FavoritesProvider>
//     </>
//   );
// }


import React, { useState } from 'react';
import AnimatedLayout from './Routes/AnimatedRoutes';
import BottomBar from './components/BottomBar';
import { FavoritesProvider } from './data/FavoritesContext';
import './App.css';

export default function App() {
  const [bottomSheetState, setBottomSheetState] = useState('collapsed');

  return (
    <FavoritesProvider>
      <AnimatedLayout
        bottomSheetState={bottomSheetState}
        setBottomSheetState={setBottomSheetState}
      />
      <BottomBar visible={bottomSheetState !== 'peek'} />
    </FavoritesProvider>
  );
}
