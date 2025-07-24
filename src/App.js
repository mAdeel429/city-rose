import React from 'react';
import AnimatedLayout from './Routes/AnimatedRoutes';
import BottomBar from './components/BottomBar';
import { FavoritesProvider } from './data/FavoritesContext';
import './App.css';

export default function App() {
  return (
    <>
    <FavoritesProvider>
      <AnimatedLayout />
      <BottomBar />
      </FavoritesProvider>
    </>
  );
}
