// import React, { useState } from 'react';
// import AnimatedLayout from './Routes/AnimatedRoutes';
// import BottomBar from './components/BottomBar';
// import { FavoritesProvider } from './data/FavoritesContext';
// import './App.css';

// export default function App() {

//   return (
//     <FavoritesProvider>
//       <AnimatedLayout
//       />
//       <BottomBar/>
//     </FavoritesProvider>
//   );
// }



import React, { useEffect, useState } from 'react';
import AnimatedLayout from './Routes/AnimatedRoutes';
import BottomBar from './components/BottomBar';
import { FavoritesProvider } from './data/FavoritesContext';
import './App.css';

export default function App() {
  const [bottomSheetState, setBottomSheetState] = useState('collapsed');
  const [bottomBarVisible, setBottomBarVisible] = useState(true);

  useEffect(() => {
    const matchDark = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (e) => {
      const isDark = e.matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    applyTheme(matchDark); // Initial load
    matchDark.addEventListener('change', applyTheme); // Theme changes

    return () => {
      matchDark.removeEventListener('change', applyTheme);
    };
  }, []);

  return (
    <FavoritesProvider>
      <AnimatedLayout
        bottomSheetState={bottomSheetState}
        setBottomSheetState={setBottomSheetState}
        setBottomBarVisible={setBottomBarVisible}
      />
      <BottomBar visible={bottomBarVisible} />
    </FavoritesProvider>
  );
}
