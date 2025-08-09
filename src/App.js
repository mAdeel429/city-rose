import React, { useEffect, useState } from 'react';
import AnimatedLayout from './Routes/AnimatedRoutes';
import BottomBar from './components/BottomBar';
import { FavoritesProvider } from './data/FavoritesContext';
import './App.css';
import { fetchHomeData } from './data/mockPoints';

export default function App() {
  const [bottomSheetState, setBottomSheetState] = useState('collapsed');
  const [bottomBarVisible, setBottomBarVisible] = useState(true);
  const [isCitySheetOpen, setIsCitySheetOpen] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const deviceId = localStorage.getItem('device_id');

      if (!token || !deviceId) {
        console.error('🔴 Missing token or device ID');
        return;
      }

      try {
        const response = await fetch(
          'https://interstellar.cityrose.app/api/v1/auth/user',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'cityrose-device-uuid': deviceId,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ User profile fetched in App.js:', data);

        if (data.user) {
          localStorage.setItem('user_info', JSON.stringify(data.user));
          localStorage.setItem('user_id', data.user.id?.toString() || '');
        }
      } catch (err) {
        console.error('❌ Error fetching user profile:', err.message);
      }
    };

    fetchUserProfile();
  }, []);
  
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

    applyTheme(matchDark);
    matchDark.addEventListener('change', applyTheme);

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
