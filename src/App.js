import React, { useEffect, useState } from 'react';
import AnimatedLayout from './Routes/AnimatedRoutes';
import BottomBar from './components/BottomBar';
import { FavoritesProvider } from './data/FavoritesContext';
import './App.css';
import { fetchMacros } from './data/fetchMacros';

export default function App() {
  const [bottomSheetState, setBottomSheetState] = useState('collapsed');
  const [bottomBarVisible, setBottomBarVisible] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMacros();
      console.log('📦 Macros in React Component:', data);
    };

    loadData();
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
      />
      <BottomBar visible={bottomBarVisible} />
    </FavoritesProvider>
  );
}
