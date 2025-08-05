import React, { useEffect, useState } from 'react';
import AnimatedLayout from './Routes/AnimatedRoutes';
import BottomBar from './components/BottomBar';
import { FavoritesProvider } from './data/FavoritesContext';
import './App.css';
import { fetchPoints } from './data/points';

export default function App() {
  const [bottomSheetState, setBottomSheetState] = useState('collapsed');
  const [bottomBarVisible, setBottomBarVisible] = useState(true);
  const [isCitySheetOpen, setIsCitySheetOpen] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  
  useEffect(() => {
    const savedCity = localStorage.getItem('selected_city');
    if (savedCity) {
      setSelectedCity(JSON.parse(savedCity));
      setIsCitySheetOpen(false);
    }
  }, []);
  
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
        setIsCitySheetOpen={setIsCitySheetOpen}
        isCitySheetOpen={isCitySheetOpen}
        setSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
      />
      <BottomBar visible={!isCitySheetOpen && bottomBarVisible} />
    </FavoritesProvider>
  );
}
